// 全局状态
let currentKana = 'hiragana';
let currentMode = 'table';
let quizData = [];
let currentQuizIndex = 0;
let quizCorrectCount = 0;

// Canvas 书写相关
let canvas, ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentWritingIndex = 0;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    renderGojuonGrid();
    initCanvas();
});

// 渲染五十音表格
function renderGojuonGrid() {
    const grid = document.getElementById('gojuon-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // 按行列组织
    const rows = [];
    for (let i = 0; i <= 10; i++) {
        rows[i] = [];
    }

    GOJUON_DATA.forEach(item => {
        rows[item.row][item.column] = item;
    });

    // 渲染网格
    rows.forEach(row => {
        for (let col = 0; col < 5; col++) {
            const item = row[col];
            const cell = document.createElement('div');

            if (item) {
                cell.className = 'gojuon-cell bg-white border-2 border-blue-200 p-2 rounded-lg';
                const kana = currentKana === 'hiragana' ? item.hiragana : item.katakana;
                cell.innerHTML = `
                    <div class="text-2xl font-bold">${kana}</div>
                    <div class="text-xs text-gray-600 mt-1">${item.romaji}</div>
                `;
                cell.onclick = () => speakJapanese(kana);
            } else {
                cell.className = 'p-2';
            }

            grid.appendChild(cell);
        }
    });
}

// 切换假名类型
function switchKana(type) {
    currentKana = type;

    document.getElementById('btn-hiragana').className =
        type === 'hiragana' ? 'flex-1 px-3 py-1 rounded bg-blue-500 text-white text-sm' : 'flex-1 px-3 py-1 rounded bg-gray-200 text-sm';
    document.getElementById('btn-katakana').className =
        type === 'katakana' ? 'flex-1 px-3 py-1 rounded bg-blue-500 text-white text-sm' : 'flex-1 px-3 py-1 rounded bg-gray-200 text-sm';

    renderGojuonGrid();
}

// 切换模式
function switchMode(mode) {
    currentMode = mode;

    ['table', 'quiz', 'writing'].forEach(m => {
        const btn = document.getElementById(`btn-${m}`);
        btn.className = m === mode
            ? 'flex-1 px-3 py-2 rounded bg-blue-500 text-white text-sm'
            : 'flex-1 px-3 py-2 rounded bg-gray-200 text-sm';
    });

    ['table', 'quiz', 'writing'].forEach(m => {
        const section = document.getElementById(`mode-${m}`);
        if (section) {
            section.classList.toggle('hidden', m !== mode);
        }
    });
}

// === 测试模式 ===

function startQuiz() {
    const quizType = document.getElementById('quiz-type').value;
    const count = 10;

    // 生成随机题目
    const shuffled = [...GOJUON_DATA].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    quizData = selected.map(item => {
        let question, correctAnswer, options;

        switch(quizType) {
            case 'hiragana_to_romaji':
                question = item.hiragana;
                correctAnswer = item.romaji;
                break;
            case 'katakana_to_romaji':
                question = item.katakana;
                correctAnswer = item.romaji;
                break;
            case 'romaji_to_hiragana':
                question = item.romaji;
                correctAnswer = item.hiragana;
                break;
            case 'romaji_to_katakana':
                question = item.romaji;
                correctAnswer = item.katakana;
                break;
        }

        // 生成选项
        options = [correctAnswer];
        const otherItems = GOJUON_DATA.filter(g => {
            if (quizType.includes('romaji')) {
                return g.romaji !== item.romaji;
            } else {
                return quizType.includes('hiragana') ? g.hiragana !== item.hiragana : g.katakana !== item.katakana;
            }
        });

        const shuffledOthers = otherItems.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 3 && i < shuffledOthers.length; i++) {
            if (quizType.includes('to_romaji')) {
                options.push(shuffledOthers[i].romaji);
            } else if (quizType.includes('hiragana')) {
                options.push(shuffledOthers[i].hiragana);
            } else {
                options.push(shuffledOthers[i].katakana);
            }
        }

        options.sort(() => Math.random() - 0.5);

        return { question, correctAnswer, options };
    });

    currentQuizIndex = 0;
    quizCorrectCount = 0;
    document.getElementById('quiz-stats').classList.add('hidden');
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const container = document.getElementById('quiz-container');
    if (currentQuizIndex >= quizData.length) {
        showQuizResults();
        return;
    }

    const q = quizData[currentQuizIndex];
    container.innerHTML = `
        <div class="mb-4">
            <p class="text-center text-sm text-gray-600 mb-2">题目 ${currentQuizIndex + 1}/${quizData.length}</p>
            <p class="text-center text-3xl font-bold mb-4">${q.question}</p>
            <div class="space-y-2" id="quiz-options"></div>
        </div>
    `;

    const optionsContainer = document.getElementById('quiz-options');
    q.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option border-2 border-gray-300 p-3 rounded-lg text-center cursor-pointer font-bold';
        optionDiv.textContent = option;
        optionDiv.onclick = () => checkQuizAnswer(option, q.correctAnswer);
        optionsContainer.appendChild(optionDiv);
    });
}

function checkQuizAnswer(userAnswer, correctAnswer) {
    const options = document.querySelectorAll('.quiz-option');

    options.forEach(option => {
        option.onclick = null;
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        } else if (option.textContent === userAnswer && userAnswer !== correctAnswer) {
            option.classList.add('incorrect');
        }
    });

    if (userAnswer === correctAnswer) {
        quizCorrectCount++;
    }

    setTimeout(() => {
        currentQuizIndex++;
        renderQuizQuestion();
    }, 1500);
}

function showQuizResults() {
    const container = document.getElementById('quiz-container');
    const percentage = Math.round((quizCorrectCount / quizData.length) * 100);

    container.innerHTML = `
        <div class="text-center p-6">
            <p class="text-5xl mb-4">${percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}</p>
            <p class="text-2xl font-bold mb-2">测试完成！</p>
            <p class="text-lg">正确率: ${percentage}%</p>
            <p class="text-sm text-gray-600 mb-4">(${quizCorrectCount}/${quizData.length})</p>
            <button onclick="startQuiz()" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                再来一次
            </button>
        </div>
    `;

    document.getElementById('quiz-score').textContent = percentage;
    document.getElementById('quiz-correct').textContent = quizCorrectCount;
    document.getElementById('quiz-total').textContent = quizData.length;
    document.getElementById('quiz-stats').classList.remove('hidden');
}

// === 书写模式 ===

function initCanvas() {
    canvas = document.getElementById('canvas');
    if (!canvas) return;

    // 响应式 Canvas 尺寸设置
    function resizeCanvas() {
        const container = canvas.parentElement;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            const size = Math.min(container.clientWidth - 32, 400);
            canvas.width = size;
            canvas.height = size;
            canvas.style.width = size + 'px';
            canvas.style.height = size + 'px';
        } else {
            canvas.width = 500;
            canvas.height = 500;
            canvas.style.width = '500px';
            canvas.style.height = '500px';
        }

        // 重新设置绘图属性（因为 canvas resize 会清空）
        ctx = canvas.getContext('2d');
        ctx.lineWidth = isMobile ? 3 : 4;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
    }

    // 初始化大小
    resizeCanvas();

    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas);

    ctx = canvas.getContext('2d');
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);

    updateWritingChar();
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    lastX = touch.clientX - rect.left;
    lastY = touch.clientY - rect.top;
    isDrawing = true;
}

function handleTouchMove(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateWritingChar() {
    const item = GOJUON_DATA[currentWritingIndex % GOJUON_DATA.length];
    const kana = currentKana === 'hiragana' ? item.hiragana : item.katakana;

    document.getElementById('writing-char').textContent = kana;
    document.getElementById('writing-romaji').textContent = item.romaji;
}

function nextWritingChar() {
    clearCanvas();
    currentWritingIndex++;
    updateWritingChar();
}
