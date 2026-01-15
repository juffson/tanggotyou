// 聊天消息历史
let chatHistory = [];

// 发送消息
async function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (!message) return;

    // 清空输入框
    input.value = '';

    // 显示用户消息
    appendMessage('user', message);
    chatHistory.push({ role: 'user', content: message });

    // 显示 AI 正在输入的提示
    const aiMessageId = 'ai-msg-' + Date.now();
    appendMessage('assistant', '正在思考...', aiMessageId);

    try {
        // 发送到后端
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: chatHistory,
            }),
        });

        if (!response.ok) {
            throw new Error('API 请求失败');
        }

        // 处理流式响应
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
                    if (data.trim()) {
                        aiResponse += data;
                        // 更新消息内容
                        if (messageElement) {
                            const contentDiv = messageElement.querySelector('.ai-content');
                            if (contentDiv) {
                                contentDiv.innerHTML = marked.parse(aiResponse);
                            }
                        }
                        scrollToBottom();
                    }
                }
            }
        }

        // 保存 AI 响应到历史
        chatHistory.push({ role: 'assistant', content: aiResponse });

    } catch (error) {
        console.error('发送消息失败:', error);
        const messageElement = document.getElementById(aiMessageId);
        if (messageElement) {
            const contentDiv = messageElement.querySelector('.ai-content');
            if (contentDiv) {
                contentDiv.innerHTML = '<span class="text-red-500">抱歉，发生了错误。请稍后再试。</span>';
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
