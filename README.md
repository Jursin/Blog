# Blog
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
![Astro](https://img.shields.io/badge/Astro-5.12.8-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个现代化、功能丰富的静态博客模板，基于 [Astro](https://astro.build) & [Mizuki](https://github.com/matsuzaka-yuki/mizuki) 构建，具有先进的功能和精美的设计。

### 🔧 组件配置系统重构
- **统一配置架构：** 全新的模块化组件配置体系，支持动态组件管理和顺序配置
- **配置驱动的组件加载：** 重构 SideBar 组件，实现完全基于配置的组件加载机制
- **统一控制开关：** 移除音乐播放器和公告组件的独立 enable 开关，统一由 sidebarLayoutConfig 控制
- **响应式布局适配：** 组件支持响应式布局，可根据设备类型自动调整显示

### 📐 布局系统优化
- **侧边栏位置动态调整：** 支持左右侧边栏切换，布局自动适配
- **文章目录智能定位：** 当侧边栏在右侧时，文章导航自动移至左侧，提供更好的阅读体验
- **网格布局改进：** 优化 CSS Grid 布局，解决容器宽度异常问题

### 🎛️ 配置文件格式规范
- **标准化配置格式：** 创建统一的组件配置文件格式规范
- **类型安全：** 完善的 TypeScript 类型定义，确保配置的类型安全
- **可扩展性：** 支持自定义组件类型和配置选项

### 🧹 代码优化
- **测试文件清理：** 移除未使用的测试配置和依赖，减少项目体积
- **代码结构优化：** 改进组件架构，提升代码可维护性
- **性能提升：** 优化组件加载逻辑，提升页面渲染性能

---

## ✨ 功能特性

### 🎨 设计与界面
- [x] 基于 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建
- [x] 使用 [Swup](https://swup.js.org/) 实现流畅的动画和页面过渡
- [x] 明暗主题切换，支持系统偏好检测
- [x] 可自定义主题色彩和动态横幅轮播
- [x] 全屏背景图片，支持轮播、透明度和模糊效果
- [x] 全设备响应式设计
- [x] 使用 JetBrains Mono 字体的优美排版

### 🔍 内容与搜索
- [x] 基于 [Pagefind](https://pagefind.app/) 的高级搜索功能
- [x] [增强的 Markdown 功能](#-markdown-扩展语法)，支持语法高亮
- [x] 交互式目录，支持自动滚动
- [x] RSS 订阅生成
- [x] 阅读时间估算
- [x] 文章分类和标签系统

### 🌐 国际化支持
- [x] **多语言支持**，实时翻译功能
- [x] **自动语言检测**，基于用户偏好
- [x] **客户端翻译**，由 Edge Translate 驱动
- [x] 支持 10+ 种语言（中文、英文等）

### 📱 特色页面
- [x] **追番页面** - 追踪动画观看进度和评分
- [x] **友链页面** - 精美卡片展示朋友网站
- [x] **日记页面** - 分享生活瞬间，类似社交媒体
- [x] **归档页面** - 有序的文章时间线视图
- [x] **关于页面** - 可自定义的个人介绍

### 🛠 技术特性
- [x] **增强代码块**，基于 [Expressive Code](https://expressive-code.com/)
- [x] **数学公式支持**，KaTeX 渲染
- [x] **图片优化**，PhotoSwipe 画廊集成
- [x] **SEO 优化**，包含站点地图和元标签
- [x] **性能优化**，懒加载和缓存机制
- [x] **评论系统**，支持 Twikoo 集成

## ⚡ 命令

| 命令                       | 操作                                    |
|:---------------------------|:---------------------------------------|
| `pnpm install`             | 安装依赖                               |
| `pnpm dev`                 | 在 `localhost:4321` 启动本地开发服务器 |
| `pnpm build`               | 构建生产站点到 `./dist/`               |
| `pnpm preview`             | 在部署前本地预览构建                   |
| `pnpm check`               | 运行 Astro 错误检查                    |
| `pnpm format`              | 使用 Biome 格式化代码                  |
| `pnpm lint`                | 检查并修复代码问题                     |
| `pnpm new-post <文件名>`   | 创建新博客文章                         |
| `pnpm astro ...`           | 运行 Astro CLI 命令                    |

### 📱 特色页面配置

- **追番页面：** 在 `src/pages/anime.astro` 中编辑动画列表
- **友链页面：** 在 `src/content/spec/friends.md` 中编辑朋友数据
- **日记页面：** 在 `src/pages/diary.astro` 中编辑动态
- **关于页面：** 在 `src/content/spec/about.md` 中编辑内容

## ✏️ 贡献

我们欢迎贡献！请随时提交问题和拉取请求。

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开拉取请求

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 基于原始 [Fuwari](https://github.com/saicaca/fuwari) 模板
- 使用 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建
- 灵感来源于 [Yukina](https://github.com/WhitePaper233/yukina) - 一个美丽优雅的博客模板
- 翻译功能由 [translate](https://gitee.com/mail_osc/translate) 提供支持 - AI i18n 自动HTML翻译解决方案
- 图标来自 [Iconify](https://iconify.design/)

### 特别感谢

- **[Yukina](https://github.com/WhitePaper233/yukina)** - 感谢提供设计灵感和创意，帮助塑造了这个项目。Yukina 是一个优雅的博客模板，展现了出色的设计原则和用户体验。
- **[translate](https://gitee.com/mail_osc/translate)** - 感谢提供创新的AI驱动i18n解决方案，仅需两行JavaScript代码即可实现HTML自动翻译。这个开源工具让多语言支持变得极其简单高效。