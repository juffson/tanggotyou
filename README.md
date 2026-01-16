# 日语学习网站

使用 Rust + Axum + HTMX 构建的日语学习网站，集成 AI 聊天助手和五十音学习工具。

[![Build Status](https://github.com/YOUR_USERNAME/tanggotyou/workflows/Build%20and%20Test/badge.svg)](https://github.com/YOUR_USERNAME/tanggotyou/actions)
[![Docker](https://img.shields.io/docker/v/YOUR_USERNAME/tanggotyou?label=docker)](https://hub.docker.com/r/YOUR_USERNAME/tanggotyou)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 功能特点

- **AI 日语学习助手**: 基于 OpenAI GPT 的智能对话，随时解答日语学习问题
- **五十音图**: 完整的平假名和片假名表格，点击发音
- **练习测试**: 多种模式的五十音测试（看假名选罗马音、看罗马音写假名等）
- **书写练习**: Canvas 画布支持手写练习，支持触摸和鼠标
- **流式响应**: AI 回复采用流式传输，体验流畅

## 技术栈

- **后端**: Rust + Axum
- **前端**: HTMX + 原生 JavaScript + Tailwind CSS
- **AI**: OpenAI API
- **模板**: Askama
- **语音**: Web Speech API

## 快速开始

### 🎉 GitHub Pages 部署（最简单，完全免费）

**无需服务器，无需 Docker，3 步上线！**

```bash
# 1. 推送代码
git push origin main

# 2. 启用 GitHub Pages
# 在仓库 Settings → Pages → Source 选择 main 分支和 /docs 文件夹

# 3. 访问网站
# https://YOUR_USERNAME.github.io/tanggotyou/
```

用户在浏览器中输入自己的 OpenAI API Key，完全隐私安全！

> 📖 详细指南：[GITHUB_PAGES.md](GITHUB_PAGES.md)

---

### 🚀 云平台一键部署（需服务器）

适合不想让用户输入 API Key 的场景：

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/tanggotyou)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

> 📖 详细部署指南：[DEPLOYMENT.md](DEPLOYMENT.md) | [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

---

### 方法 1: Docker 部署（本地）

最简单的方式，无需安装 Rust 环境：

```bash
# 1. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，添加你的 OpenAI API Key

# 2. 使用 docker-compose 启动
docker-compose up -d

# 3. 查看日志
docker-compose logs -f

# 4. 访问网站
# 打开浏览器访问 http://localhost:3000
```

停止服务：
```bash
docker-compose down
```

### 方法 2: 本地运行

需要安装 Rust 1.75+ 环境：

```bash
# 1. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，添加你的 OpenAI API Key

# 2. 构建并运行
cargo build --release
cargo run --release

# 3. 访问网站
# 打开浏览器访问 http://localhost:3000
```

### 环境变量配置

编辑 `.env` 文件：

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
RUST_LOG=tanggotyou=info
```

## 项目结构

```
tanggotyou/
├── src/
│   ├── main.rs              # 主入口
│   ├── routes/              # 路由处理
│   ├── services/            # OpenAI 服务
│   └── models/              # 五十音数据模型
├── templates/               # HTML 模板
│   └── index.html
├── static/
│   ├── js/                  # JavaScript 文件
│   └── css/                 # 样式文件
├── Cargo.toml               # 项目配置
├── Dockerfile               # Docker 镜像构建
├── docker-compose.yml       # Docker Compose 配置
└── .env                     # 环境变量
```

## API 端点

- `GET /` - 主页
- `POST /api/chat` - AI 聊天（SSE 流式响应）
- `GET /api/gojuon/data` - 获取所有五十音数据
- `GET /api/gojuon/seion` - 获取清音数据
- `GET /api/gojuon/quiz` - 生成练习题
- `POST /api/gojuon/check` - 检查答案

## 使用说明

### AI 聊天

在左侧聊天框输入你的问题，AI 助手会帮助你学习日语。例如：
- "教我日语的问候语"
- "は和が有什么区别？"
- "帮我练习简单的日常对话"

### 五十音练习

1. **表格模式**: 点击假名听发音，切换平假名/片假名
2. **测试模式**: 选择测试类型，开始10题随机测试
3. **书写模式**: 在画布上练习手写假名

## 开发

```bash
# 开发模式运行
cargo run

# 运行测试
cargo test

# 代码格式化
cargo fmt

# Docker 构建
docker build -t tanggotyou .

# 查看 Docker 日志
docker-compose logs -f tanggotyou
```

## 部署

### Docker 生产部署

```bash
# 构建镜像
docker build -t tanggotyou:latest .

# 运行容器
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=your-key \
  -e OPENAI_MODEL=gpt-4o-mini \
  --name tanggotyou \
  tanggotyou:latest
```

### 云平台部署

支持部署到以下平台：
- Railway
- Render
- Fly.io
- AWS ECS
- Google Cloud Run
- Azure Container Apps

只需将 Dockerfile 推送到对应平台，配置环境变量即可。

## 许可证

MIT