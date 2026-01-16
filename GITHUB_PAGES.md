# 🎉 GitHub Pages 部署指南

这是纯前端版本，可以直接部署到 GitHub Pages，无需服务器！

## 特点

✅ **完全免费** - GitHub Pages 免费托管
✅ **无需服务器** - 纯静态网站
✅ **隐私安全** - API Key 只存储在你的浏览器中
✅ **即时访问** - 推送代码后几分钟即可访问

## 快速部署（3步）

### 第 1 步：推送代码到 GitHub

```bash
git add .
git commit -m "Add GitHub Pages support"
git push origin main
```

### 第 2 步：启用 GitHub Pages

**方式 A - 使用 GitHub Actions（推荐）**

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单中选择：
   - **Source**: `GitHub Actions`
5. 等待 Actions 自动部署（约 1-2 分钟）

**方式 B - 直接部署（传统方式）**

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单中选择：
   - **Branch**: `main`
   - **Folder**: `/docs`
5. 点击 **Save**（保存）

> ⚠️ 注意：项目中已包含 `docs/.nojekyll` 文件，确保 GitHub Pages 不会使用 Jekyll 构建

### 第 3 步：访问你的网站

等待 1-2 分钟后，访问：

```
https://YOUR_USERNAME.github.io/tanggotyou/
```

**将 `YOUR_USERNAME` 替换为你的 GitHub 用户名**

🎉 完成！你的日语学习网站已经上线了！

## 使用说明

### 首次访问

1. 打开网站后会弹出 API Key 设置窗口
2. 输入你的 OpenAI API Key（从 https://platform.openai.com/api-keys 获取）
3. API Key 只会存储在你的浏览器本地，不会上传到任何服务器

### 如果没有 API Key

- 点击"跳过此步骤"
- 你仍然可以使用五十音学习功能
- AI 聊天功能将不可用

### 重新设置 API Key

点击右上角的 🔑 按钮

## 功能说明

### ✅ 可用功能

- **五十音表格** - 完整的平假名和片假名，点击发音
- **练习测试** - 4 种测试模式，随机出题
- **书写练习** - Canvas 手写练习，支持触摸
- **AI 聊天** - 智能日语学习助手（需要 API Key）

### 技术实现

- 纯前端 HTML/CSS/JavaScript
- 使用浏览器的 Web Speech API 进行日语发音
- 直接从浏览器调用 OpenAI API（CORS 支持）
- API Key 使用 localStorage 本地存储

## 自定义域名（可选）

### 1. 添加 CNAME 文件

在 `docs` 目录创建 `CNAME` 文件：

```bash
echo "yourdomain.com" > docs/CNAME
git add docs/CNAME
git commit -m "Add custom domain"
git push
```

### 2. 配置 DNS

在你的域名服务商添加以下 DNS 记录：

```
类型: CNAME
名称: www（或 @）
值: YOUR_USERNAME.github.io
```

### 3. 在 GitHub 设置中配置

1. Settings → Pages
2. Custom domain 输入: `yourdomain.com`
3. 勾选 "Enforce HTTPS"

## 更新网站

只需推送代码即可自动更新：

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Pages 会在几分钟内自动重新部署。

## 优势对比

| 特性 | GitHub Pages | 服务器部署 |
|------|-------------|-----------|
| 费用 | 完全免费 | 需付费 |
| 部署速度 | 1-2 分钟 | 5-10 分钟 |
| 维护成本 | 零维护 | 需要维护 |
| HTTPS | 自动配置 | 需手动配置 |
| CDN | 自带全球 CDN | 可能需要额外配置 |
| 扩展性 | 适合静态站 | 可运行任何代码 |

## 注意事项

### API Key 安全

- ✅ API Key 只存储在用户浏览器中
- ✅ 不会上传到 GitHub 或任何服务器
- ✅ 使用 localStorage，关闭浏览器后仍保留
- ⚠️ 建议为此应用创建专用的 API Key
- ⚠️ 设置 OpenAI 使用限额，防止意外高额费用

### 浏览器兼容性

需要支持以下特性：
- ES6+ JavaScript
- Fetch API
- Web Speech API（发音功能）
- Canvas API（书写功能）
- localStorage

推荐使用：
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 故障排查

### 404 错误

- 确认 GitHub Pages 已启用
- 检查分支和文件夹设置是否正确（main 分支，/docs 文件夹）
- 等待 1-2 分钟让 GitHub 完成部署

### API Key 无效

- 检查 API Key 是否正确（应以 `sk-` 开头）
- 确认 API Key 未过期
- 检查 OpenAI 账户是否有余额

### 发音不工作

- 确认浏览器支持 Web Speech API
- Chrome 和 Edge 支持最好
- 检查浏览器是否允许网站使用音频

### CORS 错误

- OpenAI API 支持浏览器直接调用
- 确认使用的是官方 API 地址
- 检查网络连接

## 进阶配置

### 自定义样式

编辑 `docs/index.html` 中的 `<style>` 标签

### 修改 AI 系统提示

编辑 `docs/js/config.js` 中的 `SYSTEM_PROMPT`

### 添加更多假名

编辑 `docs/js/gojuon-data.js`

## 与服务器版本对比

| 功能 | GitHub Pages 版 | 服务器版 |
|------|----------------|---------|
| 五十音表格 | ✅ | ✅ |
| 练习测试 | ✅ | ✅ |
| 书写练习 | ✅ | ✅ |
| AI 聊天 | ✅（需用户 API Key）| ✅（服务器 API Key）|
| 部署成本 | 免费 | 需付费 |
| API Key 安全 | 用户自己的 | 服务器管理 |
| 适用场景 | 个人使用 | 多用户/商业 |

## 总结

✅ **推荐使用 GitHub Pages** 如果：
- 个人学习使用
- 不想管理服务器
- 希望完全免费
- 可以接受用户自己输入 API Key

❌ **使用服务器部署** 如果：
- 多用户使用
- 不想让用户输入 API Key
- 需要更多后端功能
- 需要数据持久化

---

**问题反馈**: [GitHub Issues](https://github.com/YOUR_USERNAME/tanggotyou/issues)
