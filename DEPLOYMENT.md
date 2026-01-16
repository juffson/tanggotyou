# GitHub 部署指南

本文档介绍如何在 GitHub 上配置自动部署到各种云平台。

## 目录

1. [前置准备](#前置准备)
2. [Railway 部署](#railway-部署)
3. [Render 部署](#render-部署)
4. [Fly.io 部署](#flyio-部署)
5. [Docker Hub 部署](#docker-hub-部署)
6. [自托管部署](#自托管部署)

---

## 前置准备

### 1. 推送代码到 GitHub

```bash
# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/tanggotyou.git

# 推送代码
git branch -M main
git push -u origin main
```

### 2. 准备 OpenAI API Key

- 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
- 创建新的 API Key
- 保存到安全的地方

---

## Railway 部署

Railway 是最简单的部署方式，完全免费开始。

### 步骤 1: 在 Railway 创建项目

1. 访问 [Railway](https://railway.app/)
2. 点击 "Start a New Project"
3. 选择 "Deploy from GitHub repo"
4. 选择 `tanggotyou` 仓库

### 步骤 2: 配置环境变量

在 Railway Dashboard 中：
1. 点击你的服务
2. 进入 "Variables" 选项卡
3. 添加环境变量：
   - `OPENAI_API_KEY`: 你的 OpenAI API Key
   - `OPENAI_MODEL`: gpt-4o-mini（可选）

### 步骤 3: 部署

- Railway 会自动检测 Dockerfile 并开始构建
- 等待几分钟，部署完成
- 点击生成的 URL 访问你的应用

### （可选）设置 GitHub Actions 自动部署

在 GitHub 仓库设置中：

1. **Settings** → **Secrets and variables** → **Actions**
2. 添加 Secret：
   - `RAILWAY_TOKEN`: 在 [Railway Tokens](https://railway.app/account/tokens) 创建

现在每次推送到 main 分支都会自动部署！

---

## Render 部署

Render 提供免费的容器托管。

### 步骤 1: 连接 GitHub

1. 访问 [Render](https://render.com/)
2. 注册并登录
3. 点击 "New +" → "Web Service"
4. 连接 GitHub 并选择 `tanggotyou` 仓库

### 步骤 2: 配置服务

Render 会自动检测 `render.yaml` 配置文件。

手动配置（如果需要）：
- **Name**: tanggotyou
- **Environment**: Docker
- **Region**: Singapore（或离你最近的）
- **Branch**: main

### 步骤 3: 设置环境变量

在 Render Dashboard 中：
1. 进入你的服务
2. Environment → Add Environment Variable
3. 添加：
   - `OPENAI_API_KEY`: 你的 API Key

### 步骤 4: 部署

- 点击 "Create Web Service"
- 等待构建完成
- 访问提供的 `.onrender.com` URL

### （可选）设置 GitHub Actions

在 Render Dashboard：
1. Settings → Deploy Hook
2. 复制 Deploy Hook URL

在 GitHub：
1. Settings → Secrets → Actions
2. 添加 Secret：
   - `RENDER_DEPLOY_HOOK_URL`: 你的 Deploy Hook URL

---

## Fly.io 部署

Fly.io 提供全球边缘部署，性能优异。

### 步骤 1: 安装 Fly CLI

```bash
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
iwr https://fly.io/install.ps1 -useb | iex
```

### 步骤 2: 登录和初始化

```bash
# 登录
fly auth login

# 在项目目录中启动（已有 fly.toml）
fly launch --no-deploy

# 设置环境变量
fly secrets set OPENAI_API_KEY=your-api-key-here
```

### 步骤 3: 部署

```bash
# 部署应用
fly deploy

# 查看状态
fly status

# 查看日志
fly logs

# 打开应用
fly open
```

### 更新应用

```bash
git add .
git commit -m "Update"
git push
fly deploy
```

---

## Docker Hub 部署

将镜像推送到 Docker Hub，方便在任何地方部署。

### 步骤 1: 创建 Docker Hub 账号

1. 访问 [Docker Hub](https://hub.docker.com/)
2. 注册账号
3. 创建 Access Token：
   - Account Settings → Security → New Access Token

### 步骤 2: 配置 GitHub Secrets

在 GitHub 仓库：
1. Settings → Secrets → Actions
2. 添加：
   - `DOCKERHUB_USERNAME`: 你的 Docker Hub 用户名
   - `DOCKERHUB_TOKEN`: 你的 Access Token

### 步骤 3: 推送代码

```bash
git add .
git commit -m "Enable Docker Hub deployment"
git push
```

GitHub Actions 会自动构建并推送镜像到 Docker Hub。

### 步骤 4: 在服务器上运行

```bash
# 拉取镜像
docker pull YOUR_USERNAME/tanggotyou:latest

# 运行
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=your-key \
  --name tanggotyou \
  YOUR_USERNAME/tanggotyou:latest
```

---

## 自托管部署

在自己的 VPS 或服务器上部署。

### 方式 1: Docker Compose

```bash
# 1. 克隆仓库
git clone https://github.com/YOUR_USERNAME/tanggotyou.git
cd tanggotyou

# 2. 配置环境变量
cp .env.example .env
nano .env  # 编辑添加 API Key

# 3. 启动
docker-compose up -d

# 4. 查看日志
docker-compose logs -f
```

### 方式 2: 直接构建

```bash
# 1. 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. 克隆和构建
git clone https://github.com/YOUR_USERNAME/tanggotyou.git
cd tanggotyou
cargo build --release

# 3. 配置环境变量
cp .env.example .env
nano .env

# 4. 运行
./target/release/tanggotyou
```

### 配置 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 配置 systemd 服务

```ini
[Unit]
Description=Tanggotyou Japanese Learning App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/tanggotyou
Environment=OPENAI_API_KEY=your-key
ExecStart=/path/to/tanggotyou/target/release/tanggotyou
Restart=always

[Install]
WantedBy=multi-user.target
```

启动服务：
```bash
sudo systemctl enable tanggotyou
sudo systemctl start tanggotyou
sudo systemctl status tanggotyou
```

---

## 环境变量说明

所有平台都需要以下环境变量：

| 变量 | 说明 | 默认值 | 必需 |
|------|------|--------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | - | ✅ 是 |
| `OPENAI_API_BASE` | API 基础 URL | `https://api.openai.com/v1` | ❌ 否 |
| `OPENAI_MODEL` | 使用的模型 | `gpt-4o-mini` | ❌ 否 |
| `RUST_LOG` | 日志级别 | `tanggotyou=info` | ❌ 否 |

---

## 故障排查

### 构建失败

1. 检查 Rust 版本是否 >= 1.75
2. 确保 Dockerfile 路径正确
3. 查看构建日志

### 运行时错误

1. 确认 `OPENAI_API_KEY` 已正确设置
2. 检查 API Key 是否有效
3. 查看应用日志

### 端口问题

- 确保应用监听 `0.0.0.0:3000`
- 检查防火墙设置
- 确认端口映射正确

### OpenAI API 错误

1. 检查 API Key 余额
2. 确认模型名称正确
3. 查看 API 使用限制

---

## 推荐平台对比

| 平台 | 免费额度 | 部署速度 | 难度 | 推荐场景 |
|------|---------|---------|------|---------|
| **Railway** | 500小时/月 | ⚡️ 最快 | 🟢 最简单 | 🏆 新手推荐 |
| **Render** | 750小时/月 | ⚡️ 快 | 🟢 简单 | 长期运行 |
| **Fly.io** | 3个VM免费 | ⚡️ 快 | 🟡 中等 | 全球部署 |
| **Docker Hub** | 无限公开镜像 | - | 🟡 中等 | 灵活部署 |
| **自托管** | 按服务器计费 | 🐌 慢 | 🔴 复杂 | 完全控制 |

---

## 下一步

- ✅ 选择一个平台开始部署
- ✅ 配置自定义域名
- ✅ 设置 HTTPS
- ✅ 配置监控和日志
- ✅ 优化性能和成本

有问题？提交 [GitHub Issue](https://github.com/YOUR_USERNAME/tanggotyou/issues)！
