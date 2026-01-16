// API Key 管理
let apiKey = null;

// 页面加载时检查是否已保存 API Key
window.addEventListener('DOMContentLoaded', () => {
    apiKey = localStorage.getItem('openai_api_key');
    if (apiKey) {
        hideApiKeyModal();
    } else {
        showApiKeyModal();
    }
});

function showApiKeyModal() {
    document.getElementById('api-key-modal').classList.remove('hidden');
    document.getElementById('api-key-modal').style.display = 'flex';
}

function hideApiKeyModal() {
    document.getElementById('api-key-modal').classList.add('hidden');
    document.getElementById('api-key-modal').style.display = 'none';
}

function saveApiKey() {
    const input = document.getElementById('api-key-input');
    const key = input.value.trim();

    if (!key) {
        alert('请输入 API Key');
        return;
    }

    if (!key.startsWith('sk-')) {
        alert('API Key 格式不正确，应该以 sk- 开头\n\n千问 API Key 获取方式：\n1. 访问 https://dashscope.console.aliyun.com/\n2. 登录后在"API-KEY管理"中创建 API Key');
        return;
    }

    localStorage.setItem('openai_api_key', key);
    apiKey = key;
    hideApiKeyModal();

    // 清空输入框
    input.value = '';

    // 显示欢迎消息
    appendMessage('assistant', '✅ API Key 已保存！现在你可以开始使用 AI 聊天功能了。');
}

function skipApiKey() {
    hideApiKeyModal();
    appendMessage('assistant', 'ℹ️ 你跳过了 API Key 设置。AI 聊天功能将不可用，但你仍然可以使用五十音练习功能。如需使用 AI 聊天，请点击右上角的 🔑 按钮设置 API Key。');
}

function getApiKey() {
    return apiKey || localStorage.getItem('openai_api_key');
}
