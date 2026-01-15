use anyhow::Result;
use futures::Stream;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::pin::Pin;
use tokio_stream::StreamExt;

const SYSTEM_PROMPT: &str = r#"你是一个专业的日语学习助手。你的任务是：
1. 帮助用户学习日语，包括语法、词汇、发音等
2. 用中文解释，但要包含日语例句和罗马音标注
3. 鼓励用户使用右侧的五十音 widget 练习基础假名
4. 根据用户水平调整教学难度，从五十音开始循序渐进
5. 可以进行日语对话练习，并纠正用户的错误
6. 解释要简洁清晰，多用例句和实际场景

例如，当用户询问问候语时，你应该这样回答：
日语：こんにちは (konnichiwa)
中文：你好（白天的问候语）
使用场景：上午10点到傍晚6点左右使用

保持友好、耐心，像一位经验丰富的日语老师。"#;

#[derive(Debug, Serialize)]
struct ChatRequest {
    model: String,
    messages: Vec<Message>,
    stream: bool,
    temperature: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Deserialize)]
struct ChatResponse {
    choices: Vec<Choice>,
}

#[derive(Debug, Deserialize)]
struct Choice {
    delta: Delta,
    finish_reason: Option<String>,
}

#[derive(Debug, Deserialize)]
struct Delta {
    content: Option<String>,
}

pub struct OpenAIService {
    client: Client,
    api_key: String,
    api_base: String,
    model: String,
}

impl OpenAIService {
    pub fn new(api_key: String) -> Self {
        let api_base = std::env::var("OPENAI_API_BASE")
            .unwrap_or_else(|_| "https://api.openai.com/v1".to_string());
        let model = std::env::var("OPENAI_MODEL")
            .unwrap_or_else(|_| "gpt-4o-mini".to_string());

        Self {
            client: Client::new(),
            api_key,
            api_base,
            model,
        }
    }

    pub async fn chat_stream(
        &self,
        messages: Vec<Message>,
    ) -> Result<Pin<Box<dyn Stream<Item = Result<String>> + Send>>> {
        let mut full_messages = vec![Message {
            role: "system".to_string(),
            content: SYSTEM_PROMPT.to_string(),
        }];
        full_messages.extend(messages);

        let request = ChatRequest {
            model: self.model.clone(),
            messages: full_messages,
            stream: true,
            temperature: 0.7,
        };

        let response = self
            .client
            .post(format!("{}/chat/completions", self.api_base))
            .header("Authorization", format!("Bearer {}", self.api_key))
            .json(&request)
            .send()
            .await?;

        if !response.status().is_success() {
            let error_text = response.text().await?;
            anyhow::bail!("OpenAI API error: {}", error_text);
        }

        let stream = response.bytes_stream();

        let text_stream = stream.map(|chunk| {
            let chunk = chunk?;
            let text = String::from_utf8_lossy(&chunk);

            let mut contents = Vec::new();
            for line in text.lines() {
                if line.starts_with("data: ") {
                    let data = &line[6..];
                    if data == "[DONE]" {
                        break;
                    }

                    if let Ok(response) = serde_json::from_str::<ChatResponse>(data) {
                        if let Some(choice) = response.choices.first() {
                            if let Some(content) = &choice.delta.content {
                                contents.push(content.clone());
                            }
                        }
                    }
                }
            }

            Ok(contents.join(""))
        });

        Ok(Box::pin(text_stream))
    }

    pub async fn chat(&self, messages: Vec<Message>) -> Result<String> {
        let mut stream = self.chat_stream(messages).await?;
        let mut full_response = String::new();

        while let Some(chunk) = stream.next().await {
            let chunk = chunk?;
            full_response.push_str(&chunk);
        }

        Ok(full_response)
    }
}
