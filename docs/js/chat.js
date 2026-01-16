// 聊天消息历史
let chatHistory = [];

// 发送消息
async function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (!message) return;

    const currentApiKey = getApiKey();
    if (!currentApiKey) {
        alert('请先设置 OpenAI API Key。点击右上角的 🔑 按钮。');
        showApiKeyModal();
        return;
    }

    input.value = '';
    appendMessage('user', message);
    chatHistory.push({ role: 'user', content: message });

    const aiMessageId = 'ai-msg-' + Date.now();
    appendMessage('assistant', '正在思考...', aiMessageId);

    try {
        const response = await fetch(`${CONFIG.OPENAI_API_BASE}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentApiKey}`
            },
            body: JSON.stringify({
                model: CONFIG.OPENAI_MODEL,
                messages: [
                    { role: 'system', content: CONFIG.SYSTEM_PROMPT },
                    ...chatHistory
                ],
                stream: true,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API 请求失败');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiResponse = '';
        let messageElement = document.getElementById(aiMessageId);

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices?.[0]?.delta?.content;
                        if (content) {
                            aiResponse += content;
                            if (messageElement) {
                                const contentDiv = messageElement.querySelector('.ai-content');
                                if (contentDiv) {
                                    contentDiv.innerHTML = marked.parse(aiResponse);
                                }
                            }
                            scrollToBottom();
                        }
                    } catch (e) {
                        // 忽略解析错误
                    }
                }
            }
        }

        chatHistory.push({ role: 'assistant', content: aiResponse });

    } catch (error) {
        console.error('发送消息失败:', error);
        const messageElement = document.getElementById(aiMessageId);
        if (messageElement) {
            const contentDiv = messageElement.querySelector('.ai-content');
            if (contentDiv) {
                contentDiv.innerHTML = `<span class="text-red-500">❌ 错误: ${error.message}</span><br><small class="text-gray-500">请检查你的 API Key 是否正确，或者是否有足够的余额。</small>`;
            }
        }
    }
}

// 添加消息到聊天界面
function appendMessage(role, content, id = null) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');

    if (id) {
        messageDiv.id = id;
    }

    if (role === 'user') {
        messageDiv.className = 'message-user p-4 mb-3 max-w-[80%] ml-auto';
        messageDiv.innerHTML = `
            <p class="font-bold mb-2 text-right">你</p>
            <div class="prose">${escapeHtml(content)}</div>
        `;
    } else {
        messageDiv.className = 'message-ai p-4 mb-3 max-w-[80%]';
        messageDiv.innerHTML = `
            <p class="font-bold mb-2">AI 助手</p>
            <div class="prose ai-content">${marked.parse(content)}</div>
        `;
    }

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// 滚动到底部
function scrollToBottom() {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
