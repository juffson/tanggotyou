use axum::{extract::Query, http::StatusCode, response::IntoResponse, Json};
use serde::Deserialize;

use crate::models::gojuon::{self, QuizType};

pub async fn get_gojuon_data() -> impl IntoResponse {
    let data = gojuon::get_all_gojuon();
    Json(data)
}

pub async fn get_seion_data() -> impl IntoResponse {
    let data = gojuon::get_seion_only();
    Json(data)
}

#[derive(Debug, Deserialize)]
pub struct QuizParams {
    #[serde(default = "default_count")]
    count: usize,
    #[serde(default = "default_quiz_type")]
    quiz_type: String,
}

fn default_count() -> usize {
    10
}

fn default_quiz_type() -> String {
    "hiragana_to_romaji".to_string()
}

pub async fn generate_quiz(Query(params): Query<QuizParams>) -> impl IntoResponse {
    let quiz_type = match params.quiz_type.as_str() {
        "hiragana_to_romaji" => QuizType::HiraganaToRomaji,
        "katakana_to_romaji" => QuizType::KatakanaToRomaji,
        "romaji_to_hiragana" => QuizType::RomajiToHiragana,
        "romaji_to_katakana" => QuizType::RomajiToKatakana,
        _ => QuizType::HiraganaToRomaji,
    };

    let count = params.count.min(20).max(1);
    let quiz = gojuon::generate_quiz(count, quiz_type);

    Json(quiz)
}

#[derive(Debug, Deserialize)]
pub struct CheckAnswerRequest {
    pub question: String,
    pub user_answer: String,
    pub correct_answer: String,
}

#[derive(serde::Serialize)]
pub struct CheckAnswerResponse {
    pub correct: bool,
    pub correct_answer: String,
}

pub async fn check_answer(
    Json(payload): Json<CheckAnswerRequest>,
) -> Result<Json<CheckAnswerResponse>, StatusCode> {
    let correct = payload.user_answer.trim() == payload.correct_answer.trim();

    Ok(Json(CheckAnswerResponse {
        correct,
        correct_answer: payload.correct_answer,
    }))
}
