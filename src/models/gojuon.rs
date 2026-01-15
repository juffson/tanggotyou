use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Gojuon {
    pub hiragana: &'static str,
    pub katakana: &'static str,
    pub romaji: &'static str,
    pub row: usize,    // 行（あ行=0, か行=1, ...）
    pub column: usize, // 列（a=0, i=1, u=2, e=3, o=4）
    #[serde(rename = "type")]
    pub char_type: CharType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum CharType {
    Seion,    // 清音
    Dakuon,   // 浊音
    Handakuon, // 半浊音
    Youon,    // 拗音
}

impl Gojuon {
    pub const fn new(
        hiragana: &'static str,
        katakana: &'static str,
        romaji: &'static str,
        row: usize,
        column: usize,
        char_type: CharType,
    ) -> Self {
        Self {
            hiragana,
            katakana,
            romaji,
            row,
            column,
            char_type,
        }
    }
}

// 完整的五十音表数据
pub const GOJUON_TABLE: &[Gojuon] = &[
    // あ行 (a-row)
    Gojuon::new("あ", "ア", "a", 0, 0, CharType::Seion),
    Gojuon::new("い", "イ", "i", 0, 1, CharType::Seion),
    Gojuon::new("う", "ウ", "u", 0, 2, CharType::Seion),
    Gojuon::new("え", "エ", "e", 0, 3, CharType::Seion),
    Gojuon::new("お", "オ", "o", 0, 4, CharType::Seion),

    // か行 (ka-row)
    Gojuon::new("か", "カ", "ka", 1, 0, CharType::Seion),
    Gojuon::new("き", "キ", "ki", 1, 1, CharType::Seion),
    Gojuon::new("く", "ク", "ku", 1, 2, CharType::Seion),
    Gojuon::new("け", "ケ", "ke", 1, 3, CharType::Seion),
    Gojuon::new("こ", "コ", "ko", 1, 4, CharType::Seion),

    // さ行 (sa-row)
    Gojuon::new("さ", "サ", "sa", 2, 0, CharType::Seion),
    Gojuon::new("し", "シ", "shi", 2, 1, CharType::Seion),
    Gojuon::new("す", "ス", "su", 2, 2, CharType::Seion),
    Gojuon::new("せ", "セ", "se", 2, 3, CharType::Seion),
    Gojuon::new("そ", "ソ", "so", 2, 4, CharType::Seion),

    // た行 (ta-row)
    Gojuon::new("た", "タ", "ta", 3, 0, CharType::Seion),
    Gojuon::new("ち", "チ", "chi", 3, 1, CharType::Seion),
    Gojuon::new("つ", "ツ", "tsu", 3, 2, CharType::Seion),
    Gojuon::new("て", "テ", "te", 3, 3, CharType::Seion),
    Gojuon::new("と", "ト", "to", 3, 4, CharType::Seion),

    // な行 (na-row)
    Gojuon::new("な", "ナ", "na", 4, 0, CharType::Seion),
    Gojuon::new("に", "ニ", "ni", 4, 1, CharType::Seion),
    Gojuon::new("ぬ", "ヌ", "nu", 4, 2, CharType::Seion),
    Gojuon::new("ね", "ネ", "ne", 4, 3, CharType::Seion),
    Gojuon::new("の", "ノ", "no", 4, 4, CharType::Seion),

    // は行 (ha-row)
    Gojuon::new("は", "ハ", "ha", 5, 0, CharType::Seion),
    Gojuon::new("ひ", "ヒ", "hi", 5, 1, CharType::Seion),
    Gojuon::new("ふ", "フ", "fu", 5, 2, CharType::Seion),
    Gojuon::new("へ", "ヘ", "he", 5, 3, CharType::Seion),
    Gojuon::new("ほ", "ホ", "ho", 5, 4, CharType::Seion),

    // ま行 (ma-row)
    Gojuon::new("ま", "マ", "ma", 6, 0, CharType::Seion),
    Gojuon::new("み", "ミ", "mi", 6, 1, CharType::Seion),
    Gojuon::new("む", "ム", "mu", 6, 2, CharType::Seion),
    Gojuon::new("め", "メ", "me", 6, 3, CharType::Seion),
    Gojuon::new("も", "モ", "mo", 6, 4, CharType::Seion),

    // や行 (ya-row)
    Gojuon::new("や", "ヤ", "ya", 7, 0, CharType::Seion),
    Gojuon::new("ゆ", "ユ", "yu", 7, 2, CharType::Seion),
    Gojuon::new("よ", "ヨ", "yo", 7, 4, CharType::Seion),

    // ら行 (ra-row)
    Gojuon::new("ら", "ラ", "ra", 8, 0, CharType::Seion),
    Gojuon::new("り", "リ", "ri", 8, 1, CharType::Seion),
    Gojuon::new("る", "ル", "ru", 8, 2, CharType::Seion),
    Gojuon::new("れ", "レ", "re", 8, 3, CharType::Seion),
    Gojuon::new("ろ", "ロ", "ro", 8, 4, CharType::Seion),

    // わ行 (wa-row)
    Gojuon::new("わ", "ワ", "wa", 9, 0, CharType::Seion),
    Gojuon::new("を", "ヲ", "wo", 9, 4, CharType::Seion),

    // ん (n)
    Gojuon::new("ん", "ン", "n", 10, 0, CharType::Seion),

    // 浊音 - が行
    Gojuon::new("が", "ガ", "ga", 1, 0, CharType::Dakuon),
    Gojuon::new("ぎ", "ギ", "gi", 1, 1, CharType::Dakuon),
    Gojuon::new("ぐ", "グ", "gu", 1, 2, CharType::Dakuon),
    Gojuon::new("げ", "ゲ", "ge", 1, 3, CharType::Dakuon),
    Gojuon::new("ご", "ゴ", "go", 1, 4, CharType::Dakuon),

    // 浊音 - ざ行
    Gojuon::new("ざ", "ザ", "za", 2, 0, CharType::Dakuon),
    Gojuon::new("じ", "ジ", "ji", 2, 1, CharType::Dakuon),
    Gojuon::new("ず", "ズ", "zu", 2, 2, CharType::Dakuon),
    Gojuon::new("ぜ", "ゼ", "ze", 2, 3, CharType::Dakuon),
    Gojuon::new("ぞ", "ゾ", "zo", 2, 4, CharType::Dakuon),

    // 浊音 - だ行
    Gojuon::new("だ", "ダ", "da", 3, 0, CharType::Dakuon),
    Gojuon::new("ぢ", "ヂ", "ji", 3, 1, CharType::Dakuon),
    Gojuon::new("づ", "ヅ", "zu", 3, 2, CharType::Dakuon),
    Gojuon::new("で", "デ", "de", 3, 3, CharType::Dakuon),
    Gojuon::new("ど", "ド", "do", 3, 4, CharType::Dakuon),

    // 浊音 - ば行
    Gojuon::new("ば", "バ", "ba", 5, 0, CharType::Dakuon),
    Gojuon::new("び", "ビ", "bi", 5, 1, CharType::Dakuon),
    Gojuon::new("ぶ", "ブ", "bu", 5, 2, CharType::Dakuon),
    Gojuon::new("べ", "ベ", "be", 5, 3, CharType::Dakuon),
    Gojuon::new("ぼ", "ボ", "bo", 5, 4, CharType::Dakuon),

    // 半浊音 - ぱ行
    Gojuon::new("ぱ", "パ", "pa", 5, 0, CharType::Handakuon),
    Gojuon::new("ぴ", "ピ", "pi", 5, 1, CharType::Handakuon),
    Gojuon::new("ぷ", "プ", "pu", 5, 2, CharType::Handakuon),
    Gojuon::new("ぺ", "ペ", "pe", 5, 3, CharType::Handakuon),
    Gojuon::new("ぽ", "ポ", "po", 5, 4, CharType::Handakuon),
];

#[derive(Debug, Serialize, Deserialize)]
pub struct QuizQuestion {
    pub question: String,
    pub options: Vec<String>,
    pub correct_answer: String,
    pub quiz_type: QuizType,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum QuizType {
    HiraganaToRomaji,
    KatakanaToRomaji,
    RomajiToHiragana,
    RomajiToKatakana,
}

pub fn get_all_gojuon() -> Vec<Gojuon> {
    GOJUON_TABLE.to_vec()
}

pub fn get_seion_only() -> Vec<Gojuon> {
    GOJUON_TABLE
        .iter()
        .filter(|g| matches!(g.char_type, CharType::Seion))
        .cloned()
        .collect()
}

pub fn generate_quiz(count: usize, quiz_type: QuizType) -> Vec<QuizQuestion> {
    use rand::seq::SliceRandom;
    use rand::thread_rng;

    let mut rng = thread_rng();
    let seion: Vec<_> = get_seion_only();
    let selected: Vec<_> = seion.choose_multiple(&mut rng, count).collect();

    selected
        .iter()
        .map(|&gojuon| {
            let (question, correct_answer) = match quiz_type {
                QuizType::HiraganaToRomaji => (gojuon.hiragana.to_string(), gojuon.romaji.to_string()),
                QuizType::KatakanaToRomaji => (gojuon.katakana.to_string(), gojuon.romaji.to_string()),
                QuizType::RomajiToHiragana => (gojuon.romaji.to_string(), gojuon.hiragana.to_string()),
                QuizType::RomajiToKatakana => (gojuon.romaji.to_string(), gojuon.katakana.to_string()),
            };

            // 生成选项（包含正确答案和3个干扰项）
            let mut options = vec![correct_answer.clone()];
            let mut other_options: Vec<_> = seion
                .iter()
                .filter(|g| g.romaji != gojuon.romaji)
                .map(|g| match quiz_type {
                    QuizType::HiraganaToRomaji | QuizType::KatakanaToRomaji => g.romaji.to_string(),
                    QuizType::RomajiToHiragana => g.hiragana.to_string(),
                    QuizType::RomajiToKatakana => g.katakana.to_string(),
                })
                .collect();

            other_options.shuffle(&mut rng);
            options.extend(other_options.into_iter().take(3));
            options.shuffle(&mut rng);

            QuizQuestion {
                question,
                options,
                correct_answer,
                quiz_type: match quiz_type {
                    QuizType::HiraganaToRomaji => QuizType::HiraganaToRomaji,
                    QuizType::KatakanaToRomaji => QuizType::KatakanaToRomaji,
                    QuizType::RomajiToHiragana => QuizType::RomajiToHiragana,
                    QuizType::RomajiToKatakana => QuizType::RomajiToKatakana,
                },
            }
        })
        .collect()
}
