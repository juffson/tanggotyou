#!/bin/bash

# 日语学习网站 - Docker 快速启动脚本

set -e

echo "🇯🇵 日语学习网站 Docker 启动脚本"
echo "=================================="

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "⚠️  .env 文件不存在，正在创建..."
    cp .env.example .env
    echo "✅ 已创建 .env 文件"
    echo "❗️ 请编辑 .env 文件，添加你的 OPENAI_API_KEY"
    echo "   然后重新运行此脚本"
    exit 1
fi

# 检查 OPENAI_API_KEY
if grep -q "your-openai-api-key-here" .env; then
    echo "❗️ 请先在 .env 文件中设置 OPENAI_API_KEY"
    exit 1
fi

echo "📦 构建 Docker 镜像..."
docker-compose build

echo "🚀 启动服务..."
docker-compose up -d

echo ""
echo "✅ 服务启动成功！"
echo ""
echo "📊 查看日志："
echo "   docker-compose logs -f"
echo ""
echo "🌐 访问网站："
echo "   http://localhost:3000"
echo ""
echo "⏹️  停止服务："
echo "   docker-compose down"
echo ""

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 3

# 检查服务状态
if docker-compose ps | grep -q "Up"; then
    echo "✅ 服务运行中"
    docker-compose logs --tail=10
else
    echo "❌ 服务启动失败，请查看日志："
    docker-compose logs
    exit 1
fi
