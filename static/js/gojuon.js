// 全局状态
let gojuonData = [];
let currentKana = 'hiragana';
let currentMode = 'table';
let currentType = 'seion'; // 清音、浊音、半浊音、拗音
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
document.addEventListener('DOMContentLoaded', async () => {
    await loadGojuonData();
    renderGojuonGrid();
    initCanvas();
});

// 加载五十音数据
async function loadGojuonData() {
    try {
        const response = await fetch('/api/gojuon/data');
        gojuonData = await response.json();
    } catch (error) {
        console.error('加载五十音数据失败:', error);
    }
}

// 渲染五十音表格
function renderGojuonGrid() {
    const grid = document.getElementById('gojuon-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // 过滤当前类型的数据
    const dataToRender = gojuonData.filter(item => item.type === currentType);

    // 按行列组织
    const rows = [];
    const maxRow = Math.max(...dataToRender.map(item => item.row), 0);
    for (let i = 0; i <= maxRow; i++) {
        rows[i] = [];
    }

    dataToRender.forEach(item => {
        if (!rows[item.row]) rows[item.row] = [];
        rows[item.row][item.column] = item;
    });

    // 确定列数：拗音是3列，其他是5列
    const cols = currentType === 'youon' ? 3 : 5;
    grid.className = currentType === 'youon'
        ? 'grid grid-cols-3 gap-3 text-center'
        : 'grid grid-cols-5 gap-3 text-center';

    // 渲染网格
    rows.forEach(row => {
        for (let col = 0; col < cols; col++) {
            const item = row[col];
            const cell = document.createElement('div');

            if (item) {
                cell.className = 'gojuon-cell bg-white border-2 border-blue-200 p-3 rounded-lg';
                const kana = currentKana === 'hiragana' ? item.hiragana : item.katakana;
                cell.innerHTML = `
                    <div class="text-2xl font-bold">${kana}</div>
                    <div class="text-xs text-gray-600 mt-1">${item.romaji}</div>
                `;
                cell.onclick = () => speakJapanese(kana);
            } else {
                cell.className = 'p-3';
            }

            grid.appendChild(cell);
        }
    });
}

// 切换假名类型
function switchKana(type) {
    currentKana = type;

    // 更新按钮样式
    document.getElementById('btn-hiragana').className =
        type === 'hiragana' ? 'flex-1 px-3 py-1 rounded bg-blue-500 text-white text-sm' : 'flex-1 px-3 py-1 rounded bg-gray-200 text-sm';
    document.getElementById('btn-katakana').className =
        type === 'katakana' ? 'flex-1 px-3 py-1 rounded bg-blue-500 text-white text-sm' : 'flex-1 px-3 py-1 rounded bg-gray-200 text-sm';

    renderGojuonGrid();
}

// 切换类型（清音/浊音/半浊音/拗音）
function switchType(type) {
    currentType = type;

    ['seion', 'dakuon', 'handakuon', 'youon'].forEach(t => {
        const btn = document.getElementById(`btn-${t}`);
        if (btn) {
            btn.className = t === type
                ? 'flex-1 px-3 py-1 rounded bg-blue-500 text-white text-xs'
                : 'flex-1 px-3 py-1 rounded bg-gray-200 text-xs';
        }
    });

    renderGojuonGrid();
}

// 切换模式
function switchMode(mode) {
    currentMode = mode;

    // 更新按钮样式
    ['table', 'quiz', 'writing'].forEach(m => {
        const btn = document.getElementById(`btn-${m}`);
        btn.className = m === mode
            ? 'flex-1 px-3 py-2 rounded bg-blue-500 text-white'
            : 'flex-1 px-3 py-2 rounded bg-gray-200';
    });

    // 显示/隐藏对应模式
    ['table', 'quiz', 'writing'].forEach(m => {
        const section = document.getElementById(`mode-${m}`);
        if (section) {
            section.classList.toggle('hidden', m !== mode);
        }
    });
}

// === 测试模式 ===

// 开始测试
async function startQuiz() {
    const quizType = document.getElementById('quiz-type').value;

    try {
        const response = await fetch(`/api/gojuon/quiz?count=10&quiz_type=${quizType}`);
        quizData = await response.json();
        currentQuizIndex = 0;
        quizCorrectCount = 0;

        document.getElementById('quiz-stats').classList.add('hidden');
        renderQuizQuestion();
    } catch (error) {
        console.error('加载测试失败:', error);
    }
}

// 渲染当前题目
function renderQuizQuestion() {
    const container = document.getElementById('quiz-container');
    if (currentQuizIndex >= quizData.length) {
        showQuizResults();
        return;
    }

    const question = quizData[currentQuizIndex];
    container.innerHTML = `
        <div class="mb-4">
            <p class="text-center text-sm text-gray-600 mb-2">题目 ${currentQuizIndex + 1}/${quizData.length}</p>
            <p class="text-center text-3xl font-bold mb-4">${question.question}</p>
            <div class="space-y-2" id="quiz-options"></div>
        </div>
    `;

    const optionsContainer = document.getElementById('quiz-options');
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option border-2 border-gray-300 p-3 rounded-lg text-center cursor-pointer font-bold';
        optionDiv.textContent = option;
        optionDiv.onclick = () => checkQuizAnswer(option, question.correct_answer);
        optionsContainer.appendChild(optionDiv);
    });
}

// 检查答案
function checkQuizAnswer(userAnswer, correctAnswer) {
    const options = document.querySelectorAll('.quiz-option');

    options.forEach(option => {
        option.onclick = null; // 禁用点击
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

// 显示测试结果
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

// 初始化 Canvas
function initCanvas() {
    canvas = document.getElementById('canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    // 鼠标事件
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // 触摸事件
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
    if (gojuonData.length === 0) return;

    const item = gojuonData[currentWritingIndex % gojuonData.length];
    const kana = currentKana === 'hiragana' ? item.hiragana : item.katakana;

    document.getElementById('writing-char').textContent = kana;
    document.getElementById('writing-romaji').textContent = item.romaji;

    // 更新田字格示范
    const tianzigeDemoEl = document.getElementById('tianzige-demo');
    if (tianzigeDemoEl) {
        tianzigeDemoEl.textContent = kana;
    }
}

function nextWritingChar() {
    clearCanvas();
    currentWritingIndex++;
    updateWritingChar();
}
