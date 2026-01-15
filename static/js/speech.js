// 日语语音合成功能
function speakJapanese(text) {
    if (!window.speechSynthesis) {
        console.error('浏览器不支持语音合成');
        return;
    }

    // 停止当前正在播放的语音
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // 稍慢的语速，便于学习
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // 尝试选择日语语音
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(voice => voice.lang.startsWith('ja'));
    if (japaneseVoice) {
        utterance.voice = japaneseVoice;
    }

    window.speechSynthesis.speak(utterance);
}

// 确保语音列表加载完成
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}
