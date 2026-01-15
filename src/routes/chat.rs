use axum::{
    extract::State,
    http::StatusCode,
    response::{sse::Event, IntoResponse, Response, Sse},
    Json,
};
use futures::Stream;
use serde::{Deserialize, Serialize};
use std::convert::Infallible;
use std::sync::Arc;
use tokio_stream::StreamExt;

use crate::services::openai::{Message, OpenAIService};

#[derive(Clone)]
pub struct AppState {
    pub openai: Arc<OpenAIService>,
}

#[derive(Debug, Deserialize)]
pub struct ChatRequest {
    pub messages: Vec<Message>,
}

#[derive(Debug, Serialize)]
pub struct ChatResponse {
    pub message: String,
}

pub async fn chat_handler(
    State(state): State<AppState>,
    Json(payload): Json<ChatRequest>,
) -> Response {
    match state.openai.chat_stream(payload.messages).await {
        Ok(stream) => {
            let sse_stream = stream.map(|result| -> Result<Event, Infallible> {
                match result {
                    Ok(text) => Ok(Event::default().data(text)),
                    Err(e) => {
                        tracing::error!("Stream error: {}", e);
                        Ok(Event::default().data(format!("Error: {}", e)))
                    }
                }
            });

            Sse::new(sse_stream).into_response()
        }
        Err(e) => {
            tracing::error!("OpenAI API error: {}", e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(serde_json::json!({
                    "error": e.to_string()
                })),
            )
                .into_response()
        }
    }
}
