#!/bin/bash

# GitHub 部署准备检查脚本

echo "🔍 GitHub 部署准备检查"
echo "=================================="
echo ""

# 检查是否在 Git 仓库中
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ 错误：不在 Git 仓库中"
    echo "   运行: git init"
    exit 1
fi
echo "✅ Git 仓库已初始化"

# 检查是否有远程仓库
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  警告：未设置 GitHub 远程仓库"
    echo "   运行: git remote add origin https://github.com/YOUR_USERNAME/tanggotyou.git"
else
    REMOTE_URL=$(git remote get-url origin)
    echo "✅ GitHub 远程仓库: $REMOTE_URL"
fi

# 检查 .env.example 文件
if [ ! -f .env.example ]; then
    echo "❌ 缺少 .env.example 文件"
    exit 1
fi
echo "✅ .env.example 文件存在"

# 检查 Dockerfile
if [ ! -f Dockerfile ]; then
    echo "❌ 缺少 Dockerfile"
    exit 1
fi
echo "✅ Dockerfile 存在"

# 检查 GitHub Actions
if [ -d .github/workflows ]; then
    WORKFLOW_COUNT=$(ls -1 .github/workflows/*.yml 2>/dev/null | wc -l)
    echo "✅ GitHub Actions 工作流: $WORKFLOW_COUNT 个"
else
    echo "⚠️  警告：没有 GitHub Actions 工作流"
fi

# 检查配置文件
echo ""
echo "📋 部署配置文件检查："
[ -f railway.json ] && echo "  ✅ Railway (railway.json)" || echo "  ⚠️  Railway 配置缺失"
[ -f render.yaml ] && echo "  ✅ Render (render.yaml)" || echo "  ⚠️  Render 配置缺失"
[ -f fly.toml ] && echo "  ✅ Fly.io (fly.toml)" || echo "  ⚠️  Fly.io 配置缺失"
[ -f docker-compose.yml ] && echo "  ✅ Docker Compose" || echo "  ⚠️  Docker Compose 配置缺失"

echo ""
echo "📝 下一步操作："
echo "=================================="
echo ""
echo "1️⃣  提交代码到 GitHub:"
echo "   git add ."
echo "   git commit -m 'Add deployment configurations'"
echo "   git push -u origin main"
echo ""
echo "2️⃣  选择部署平台:"
echo "   • Railway: 最简单，访问 https://railway.app/"
echo "   • Render:  免费750小时/月，访问 https://render.com/"
echo "   • Fly.io:  全球CDN，运行 'fly launch'"
echo ""
echo "3️⃣  配置环境变量:"
echo "   在平台设置中添加:"
echo "   OPENAI_API_KEY=你的API密钥"
echo ""
echo "4️⃣  查看详细指南:"
echo "   cat DEPLOYMENT.md"
echo ""
echo "✅ 检查完成！"
