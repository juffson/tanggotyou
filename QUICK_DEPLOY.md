# 🚀 快速部署到 GitHub

3 步完成 GitHub 部署！

## 第 1 步：推送代码到 GitHub

```bash
# 如果还没有推送过
git add .
git commit -m "Add deployment configurations"
git push -u origin main

# 如果已经推送过，更新代码
git add .
git commit -m "Update deployment"
git push
```

## 第 2 步：选择部署平台并一键部署

### 选项 A: Railway（最简单，推荐新手）

1. 访问 https://railway.app/
2. 使用 GitHub 登录
3. 点击 "New Project" → "Deploy from GitHub repo"
4. 选择 `tanggotyou` 仓库
5. **添加环境变量**：
   - 点击你的服务 → Variables
   - 添加 `OPENAI_API_KEY` = 你的 OpenAI API Key
6. ✅ 完成！几分钟后访问生成的 URL

**费用**：免费 500 小时/月

---

### 选项 B: Render（免费时长更多）

1. 访问 https://render.com/
2. 使用 GitHub 登录
3. 点击 "New +" → "Web Service"
4. 连接 GitHub 并选择 `tanggotyou` 仓库
5. Render 会自动检测 `render.yaml` 配置
6. **添加环境变量**：
   - Environment → Add Environment Variable
   - `OPENAI_API_KEY` = 你的 API Key
7. 点击 "Create Web Service"
8. ✅ 完成！访问 `.onrender.com` URL

**费用**：免费 750 小时/月

---

### 选项 C: Fly.io（全球 CDN，适合国际用户）

```bash
# 1. 安装 Fly CLI
# macOS
brew install flyctl

# Linux/WSL
curl -L https://fly.io/install.sh | sh

# 2. 登录
fly auth login

# 3. 部署（项目已配置好 fly.toml）
fly launch --no-deploy

# 4. 设置 API Key
fly secrets set OPENAI_API_KEY=your-api-key-here

# 5. 部署
fly deploy

# 6. 打开应用
fly open
```

**费用**：3 个免费 VM

---

## 第 3 步：配置自动部署（可选）

### Railway 自动部署

1. 在 GitHub 仓库：Settings → Secrets and variables → Actions
2. 添加 Secret：
   - `RAILWAY_TOKEN`：在 https://railway.app/account/tokens 创建

现在推送代码会自动部署！

### Render 自动部署

1. 在 Render Dashboard：Settings → Deploy Hook
2. 复制 Deploy Hook URL
3. 在 GitHub：Settings → Secrets → Actions
4. 添加 Secret：
   - `RENDER_DEPLOY_HOOK_URL`：你的 Deploy Hook URL

---

## 🎉 部署成功！

访问平台提供的 URL，你的日语学习网站就上线了！

### 下一步

- ✅ 配置自定义域名
- ✅ 设置 HTTPS（大多数平台自动配置）
- ✅ 监控应用状态
- ✅ 查看日志

### 遇到问题？

1. 检查环境变量是否正确设置
2. 查看部署日志
3. 确认 OpenAI API Key 有效
4. 查看 [详细部署指南](DEPLOYMENT.md)

---

## 平台对比

| 平台 | 免费额度 | 部署时间 | 难度 | 推荐 |
|------|---------|---------|------|------|
| **Railway** | 500h/月 | 3-5分钟 | ⭐ 最简单 | 🏆 新手首选 |
| **Render** | 750h/月 | 5-8分钟 | ⭐⭐ 简单 | ✅ 长期运行 |
| **Fly.io** | 3个VM | 2-3分钟 | ⭐⭐⭐ 中等 | 🌍 全球部署 |

---

**需要帮助？** 提交 [GitHub Issue](https://github.com/YOUR_USERNAME/tanggotyou/issues)
