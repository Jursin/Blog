# Blog

使用 [VitePress](https://vitepress.dev/) 构建生成的博客网站。

## 安装

```sh
pnpm i
```

## 使用

```sh
# 启动开发服务
pnpm dev
# 构建生产包
pnpm build
# 本地预览生产服务
pnpm preview
```

## 扩展功能

在 VitePress 基础上，本项目扩展了如下功能。

### Markdown 语法扩展

| 扩展 | 语法 | 说明 |
|------|------|------|
| 马克笔 | `==text==` / `==text{.class}==` | 高亮标记，支持 info/note 等主题色 |
| 隐秘文本 | `!!text!!` | 鼠标悬浮才可见 |
| 上/下标 | `^text^` / `~text~` | 上/下角标 |
| 任务列表 | `- [ ] task` | GFM 任务列表 |
| 额外容器 | `::: note` / `::: important` / `::: caution` | VitePress 未内置的三种容器 |
| 数学公式 | `$...$` / `$$...$$` | LaTeX 数学方程 |
| 代码块图标 | 代码组自动匹配语言图标 | 基于 `vitepress-plugin-group-icons` |
| 代码块中词高亮 | `// [!code word:xxx]` | 基于 Shiki transformer |

### 自定义页面

| 路由 | 组件 | 功能 |
|------|------|------|
| `/` | `Home.vue` | 侧边栏（统计/分类/标签）+ 文章列表  |
| `/archives` | `Archives.vue` | 按年份归档 |
| `/skills` | `Skills.vue` | 技术栈、开发工具、项目展示 |
| `/games` | `Games.vue` | Steam 游戏展示 |
| `/anime` | `Anime.vue` | 追番列表 |
| `/song-list` | `SongList.vue` | 歌单展示 |
| `/friends` | `Friends.vue` | 友链卡片网格 |

### 布局插槽

- **面包屑导航** (`Breadcrumb.vue`) — 注入 `doc-before`，根据目录结构自动生成
- **版权信息** (`Copyright.vue`) — 注入 `doc-footer-before`，支持 CC0 ~ CC-BY-NC-ND 七种协议，支持原创/转载声明，完整的前置声明配置
- **上下页** (`PrevNext.vue`) — 注入 `doc-after`，按创建时间顺序导航，覆盖默认的基于侧边栏结构导航
- **评论区** (`Comment.vue`) — 注入 `doc-after`，集成 Waline，含多套表情包 + 文章反应 + 浏览量统计

### 文章组件

- **`ArticleMeta`** — 每篇文章标题下侧显示更新日期、字数统计、阅读时间、分类、标签、Waline 浏览量
- **`BackToTop`** — 回到顶部按钮，附带圆形阅读进度指示器

### 通用组件

| 组件 | 功能 |
|------|------|
| `Icon` | Iconify 图标通用封装 |
| `GitHubCard` | GitHub 仓库卡片 |
| `Bilibili` | Bilibili 视频嵌入 |
| `GitHubContributionGraph` | GitHub 贡献图表 |

### 数据与内容管理

- **`posts.data.ts`** — 文章数据加载器，聚合 Git 日志时间戳、按分类/标签/年份分组，支持置顶排序
- **`autoFrontmatter.ts`** — 开发模式下用 `chokidar` 监听新 md 文件，自动填充 `title` 和 `createTime`
- **统一配置** (`theme/config`) — 集中的配置模块，管理版权信息、面包屑路径映射、社交链接、分页参数、博客起始日期等

### SEO 与元信息

- **RSS Feed** — 构建时自动生成 `rss.xml`，含最新 100 篇文章
- **Open Graph / Twitter Card** — 每页自动生成 `og:title`、`og:description`、`og:image`、`twitter:card` 等标签
- **结构化标签** — 文章页自动生成 `article:published_time`、`article:tag` 等
- **封面图策略** — frontmatter `cover` → 正文首图 → `/avatar.png` 兜底

### 交互与视觉效果

- **图片预览** — 集成 Fancybox，图片可点击放大/缩放/旋转，自动绑定/销毁
- **目录自动居中** — 大纲滚动时自动将激活项滚动到可视区域中间
- **暗黑模式过渡** — View Transitions API + 圆形 clipPath 扩散动画

### 构建与部署

- **IndexNow 推送** — `scripts/push-indexnow.js`，构建后自动向搜索引擎推送链接
- **Umami 统计** — 通过环境变量注入 Umami 分析脚本
- **Git 提交历史** — 集成 `@nolebase/vitepress-plugin-git-changelog`，文章底部显示 Git 变更记录
- **环境变量注入** — 自动将所有 `VITE_` 开头的环境变量暴露给 Vue 组件

### 中文本地化

完整的 VitePress 中文翻译。

## 文档
- [VitePress](https://vitepress.dev/)
- [VitePress 教程](https://vitepress.yiov.top/)
- [Nólëbase 集成](https://nolebase-integrations.ayaka.io/pages/zh-CN/)
- [Steam Web API](https://partner.steamgames.com/doc/webapi_overview)
- [KuGouMusicApi](https://kugoumusicapi-docs.4everland.app/)

## 参考项目
- [vuejs/vitepress](https://github.com/vuejs/vitepress)
- [izhichao/vitepress-theme-minimalism](https://github.com/izhichao/vitepress-theme-minimalism)
- [Yiov/vitepress-doc](https://github.com/Yiov/vitepress-doc)
- [pengzhanbo/vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume)

## 许可协议
项目代码采用 [MIT](LICENSE) 许可协议，原创文章采用 [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/) 许可协议