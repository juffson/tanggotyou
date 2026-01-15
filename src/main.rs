mod models;
mod routes;
mod services;

use axum::{
    response::{Html, IntoResponse, Response},
    routing::{get, post},
    Router,
};
use askama::Template;
use std::sync::Arc;
use tower_http::{
    cors::CorsLayer,
    services::ServeDir,
    trace::{DefaultMakeSpan, TraceLayer},
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use routes::chat::{self, AppState};
use routes::gojuon;
use services::openai::OpenAIService;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "tanggotyou=debug,tower_http=debug,axum=trace".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let openai_api_key = std::env::var("OPENAI_API_KEY")
        .expect("OPENAI_API_KEY must be set in .env file");

    let openai_service = OpenAIService::new(openai_api_key);

    let state = AppState {
        openai: Arc::new(openai_service),
    };

    let app = Router::new()
        .route("/", get(index_handler))
        .route("/api/chat", post(chat::chat_handler))
        .route("/api/gojuon/data", get(gojuon::get_gojuon_data))
        .route("/api/gojuon/seion", get(gojuon::get_seion_data))
        .route("/api/gojuon/quiz", get(gojuon::generate_quiz))
        .route("/api/gojuon/check", post(gojuon::check_answer))
        .nest_service("/static", ServeDir::new("static"))
        .layer(CorsLayer::permissive())
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::default().include_headers(true)),
        )
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    tracing::info!("listening on {}", listener.local_addr().unwrap());
    tracing::info!("Visit http://localhost:3000 to start learning Japanese!");

    axum::serve(listener, app).await.unwrap();
}

async fn index_handler() -> Response {
    let template = IndexTemplate {};
    match template.render() {
        Ok(html) => Html(html).into_response(),
        Err(err) => {
            tracing::error!("Template error: {}", err);
            (
                axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Template error"
            ).into_response()
        }
    }
}

#[derive(Template)]
#[template(path = "index.html")]
struct IndexTemplate {}
