// 五十音数据 - 清音
const SEION_DATA = [
    // あ行
    { hiragana: 'あ', katakana: 'ア', romaji: 'a', row: 0, column: 0, type: 'seion' },
    { hiragana: 'い', katakana: 'イ', romaji: 'i', row: 0, column: 1, type: 'seion' },
    { hiragana: 'う', katakana: 'ウ', romaji: 'u', row: 0, column: 2, type: 'seion' },
    { hiragana: 'え', katakana: 'エ', romaji: 'e', row: 0, column: 3, type: 'seion' },
    { hiragana: 'お', katakana: 'オ', romaji: 'o', row: 0, column: 4, type: 'seion' },

    // か行
    { hiragana: 'か', katakana: 'カ', romaji: 'ka', row: 1, column: 0, type: 'seion' },
    { hiragana: 'き', katakana: 'キ', romaji: 'ki', row: 1, column: 1, type: 'seion' },
    { hiragana: 'く', katakana: 'ク', romaji: 'ku', row: 1, column: 2, type: 'seion' },
    { hiragana: 'け', katakana: 'ケ', romaji: 'ke', row: 1, column: 3, type: 'seion' },
    { hiragana: 'こ', katakana: 'コ', romaji: 'ko', row: 1, column: 4, type: 'seion' },

    // さ行
    { hiragana: 'さ', katakana: 'サ', romaji: 'sa', row: 2, column: 0, type: 'seion' },
    { hiragana: 'し', katakana: 'シ', romaji: 'shi', row: 2, column: 1, type: 'seion' },
    { hiragana: 'す', katakana: 'ス', romaji: 'su', row: 2, column: 2, type: 'seion' },
    { hiragana: 'せ', katakana: 'セ', romaji: 'se', row: 2, column: 3, type: 'seion' },
    { hiragana: 'そ', katakana: 'ソ', romaji: 'so', row: 2, column: 4, type: 'seion' },

    // た行
    { hiragana: 'た', katakana: 'タ', romaji: 'ta', row: 3, column: 0, type: 'seion' },
    { hiragana: 'ち', katakana: 'チ', romaji: 'chi', row: 3, column: 1, type: 'seion' },
    { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', row: 3, column: 2, type: 'seion' },
    { hiragana: 'て', katakana: 'テ', romaji: 'te', row: 3, column: 3, type: 'seion' },
    { hiragana: 'と', katakana: 'ト', romaji: 'to', row: 3, column: 4, type: 'seion' },

    // な行
    { hiragana: 'な', katakana: 'ナ', romaji: 'na', row: 4, column: 0, type: 'seion' },
    { hiragana: 'に', katakana: 'ニ', romaji: 'ni', row: 4, column: 1, type: 'seion' },
    { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', row: 4, column: 2, type: 'seion' },
    { hiragana: 'ね', katakana: 'ネ', romaji: 'ne', row: 4, column: 3, type: 'seion' },
    { hiragana: 'の', katakana: 'ノ', romaji: 'no', row: 4, column: 4, type: 'seion' },

    // は行
    { hiragana: 'は', katakana: 'ハ', romaji: 'ha', row: 5, column: 0, type: 'seion' },
    { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', row: 5, column: 1, type: 'seion' },
    { hiragana: 'ふ', katakana: 'フ', romaji: 'fu', row: 5, column: 2, type: 'seion' },
    { hiragana: 'へ', katakana: 'ヘ', romaji: 'he', row: 5, column: 3, type: 'seion' },
    { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', row: 5, column: 4, type: 'seion' },

    // ま行
    { hiragana: 'ま', katakana: 'マ', romaji: 'ma', row: 6, column: 0, type: 'seion' },
    { hiragana: 'み', katakana: 'ミ', romaji: 'mi', row: 6, column: 1, type: 'seion' },
    { hiragana: 'む', katakana: 'ム', romaji: 'mu', row: 6, column: 2, type: 'seion' },
    { hiragana: 'め', katakana: 'メ', romaji: 'me', row: 6, column: 3, type: 'seion' },
    { hiragana: 'も', katakana: 'モ', romaji: 'mo', row: 6, column: 4, type: 'seion' },

    // や行
    { hiragana: 'や', katakana: 'ヤ', romaji: 'ya', row: 7, column: 0, type: 'seion' },
    { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', row: 7, column: 2, type: 'seion' },
    { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', row: 7, column: 4, type: 'seion' },

    // ら行
    { hiragana: 'ら', katakana: 'ラ', romaji: 'ra', row: 8, column: 0, type: 'seion' },
    { hiragana: 'り', katakana: 'リ', romaji: 'ri', row: 8, column: 1, type: 'seion' },
    { hiragana: 'る', katakana: 'ル', romaji: 'ru', row: 8, column: 2, type: 'seion' },
    { hiragana: 'れ', katakana: 'レ', romaji: 're', row: 8, column: 3, type: 'seion' },
    { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', row: 8, column: 4, type: 'seion' },

    // わ行
    { hiragana: 'わ', katakana: 'ワ', romaji: 'wa', row: 9, column: 0, type: 'seion' },
    { hiragana: 'を', katakana: 'ヲ', romaji: 'wo', row: 9, column: 4, type: 'seion' },

    // ん
    { hiragana: 'ん', katakana: 'ン', romaji: 'n', row: 10, column: 0, type: 'seion' }
];

// 浊音
const DAKUON_DATA = [
    // が行
    { hiragana: 'が', katakana: 'ガ', romaji: 'ga', row: 0, column: 0, type: 'dakuon' },
    { hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', row: 0, column: 1, type: 'dakuon' },
    { hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', row: 0, column: 2, type: 'dakuon' },
    { hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', row: 0, column: 3, type: 'dakuon' },
    { hiragana: 'ご', katakana: 'ゴ', romaji: 'go', row: 0, column: 4, type: 'dakuon' },

    // ざ行
    { hiragana: 'ざ', katakana: 'ザ', romaji: 'za', row: 1, column: 0, type: 'dakuon' },
    { hiragana: 'じ', katakana: 'ジ', romaji: 'ji', row: 1, column: 1, type: 'dakuon' },
    { hiragana: 'ず', katakana: 'ズ', romaji: 'zu', row: 1, column: 2, type: 'dakuon' },
    { hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', row: 1, column: 3, type: 'dakuon' },
    { hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', row: 1, column: 4, type: 'dakuon' },

    // だ行
    { hiragana: 'だ', katakana: 'ダ', romaji: 'da', row: 2, column: 0, type: 'dakuon' },
    { hiragana: 'ぢ', katakana: 'ヂ', romaji: 'di', row: 2, column: 1, type: 'dakuon' },
    { hiragana: 'づ', katakana: 'ヅ', romaji: 'du', row: 2, column: 2, type: 'dakuon' },
    { hiragana: 'で', katakana: 'デ', romaji: 'de', row: 2, column: 3, type: 'dakuon' },
    { hiragana: 'ど', katakana: 'ド', romaji: 'do', row: 2, column: 4, type: 'dakuon' },

    // ば行
    { hiragana: 'ば', katakana: 'バ', romaji: 'ba', row: 3, column: 0, type: 'dakuon' },
    { hiragana: 'び', katakana: 'ビ', romaji: 'bi', row: 3, column: 1, type: 'dakuon' },
    { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', row: 3, column: 2, type: 'dakuon' },
    { hiragana: 'べ', katakana: 'ベ', romaji: 'be', row: 3, column: 3, type: 'dakuon' },
    { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', row: 3, column: 4, type: 'dakuon' }
];

// 半浊音
const HANDAKUON_DATA = [
    // ぱ行
    { hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', row: 0, column: 0, type: 'handakuon' },
    { hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', row: 0, column: 1, type: 'handakuon' },
    { hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', row: 0, column: 2, type: 'handakuon' },
    { hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', row: 0, column: 3, type: 'handakuon' },
    { hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', row: 0, column: 4, type: 'handakuon' }
];

// 拗音 - きゃ きゅ きょ等
const YOON_DATA = [
    // きゃ行
    { hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', row: 0, column: 0, type: 'youon' },
    { hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', row: 0, column: 1, type: 'youon' },
    { hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', row: 0, column: 2, type: 'youon' },

    // しゃ行
    { hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', row: 1, column: 0, type: 'youon' },
    { hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', row: 1, column: 1, type: 'youon' },
    { hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', row: 1, column: 2, type: 'youon' },

    // ちゃ行
    { hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', row: 2, column: 0, type: 'youon' },
    { hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', row: 2, column: 1, type: 'youon' },
    { hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', row: 2, column: 2, type: 'youon' },

    // にゃ行
    { hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', row: 3, column: 0, type: 'youon' },
    { hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', row: 3, column: 1, type: 'youon' },
    { hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', row: 3, column: 2, type: 'youon' },

    // ひゃ行
    { hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', row: 4, column: 0, type: 'youon' },
    { hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', row: 4, column: 1, type: 'youon' },
    { hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', row: 4, column: 2, type: 'youon' },

    // みゃ行
    { hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', row: 5, column: 0, type: 'youon' },
    { hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', row: 5, column: 1, type: 'youon' },
    { hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', row: 5, column: 2, type: 'youon' },

    // りゃ行
    { hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', row: 6, column: 0, type: 'youon' },
    { hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', row: 6, column: 1, type: 'youon' },
    { hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', row: 6, column: 2, type: 'youon' },

    // ぎゃ行 (浊音拗音)
    { hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', row: 7, column: 0, type: 'youon' },
    { hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', row: 7, column: 1, type: 'youon' },
    { hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', row: 7, column: 2, type: 'youon' },

    // じゃ行
    { hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', row: 8, column: 0, type: 'youon' },
    { hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', row: 8, column: 1, type: 'youon' },
    { hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', row: 8, column: 2, type: 'youon' },

    // びゃ行
    { hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya', row: 9, column: 0, type: 'youon' },
    { hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu', row: 9, column: 1, type: 'youon' },
    { hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo', row: 9, column: 2, type: 'youon' },

    // ぴゃ行 (半浊音拗音)
    { hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', row: 10, column: 0, type: 'youon' },
    { hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', row: 10, column: 1, type: 'youon' },
    { hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', row: 10, column: 2, type: 'youon' }
];

// 合并所有数据
const GOJUON_DATA = [...SEION_DATA, ...DAKUON_DATA, ...HANDAKUON_DATA, ...YOON_DATA];
