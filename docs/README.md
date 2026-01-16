# 日语学习网站 - GitHub Pages 版本

这是纯前端版本，可直接在 GitHub Pages 上运行，无需服务器。

## 在线访问

如果此项目已部署到 GitHub Pages，你可以直接访问：

**https://YOUR_USERNAME.github.io/tanggotyou/**

## 本地预览

你也可以在本地打开 `index.html` 文件进行预览（需要一个本地 Web 服务器，直接打开文件可能会有 CORS 限制）。

### 使用 Python 启动本地服务器

```bash
# Python 3
python3 -m http.server 8000

# 或 Python 2
python -m SimpleHTTPServer 8000

# 然后访问 http://localhost:8000
```

### 使用 Node.js 启动本地服务器

```bash
npx http-server -p 8000

# 然后访问 http://localhost:8000
```

## 功能特点

- ✅ 五十音图（平假名 + 片假名）
- ✅ 点击发音（Web Speech API）
- ✅ 练习测试（4 种模式）
- ✅ 书写练习（Canvas）
- ✅ AI 聊天助手（需用户输入 API Key）

## 技术实现

- 纯前端 HTML/CSS/JavaScript
- 无需后端服务器
- 直接调用 OpenAI API
- API Key 存储在浏览器本地（localStorage）

## 部署到 GitHub Pages

详见主项目的 [GITHUB_PAGES.md](../GITHUB_PAGES.md)

## 与服务器版本的区别

| 特性 | GitHub Pages 版 | 服务器版 |
|------|----------------|---------|
| 部署 | GitHub Pages | 需要服务器 |
| API Key | 用户输入 | 服务器管理 |
| 费用 | 完全免费 | 可能需付费 |
| 维护 | 零维护 | 需要维护 |

---

返回主项目：[README](../README.md)
