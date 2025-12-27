import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { feedPlugin } from '@vuepress/plugin-feed'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Jursin 的博客',
  description: 'Jursin 的个人博客 VuePress Theme Plume 搭建',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  theme: plumeTheme({
    /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
    hostname: 'https://blog.jursin.top',

    /* 文档仓库配置，用于 editLink */
    docsRepo: 'https://github.com/Jursin/Blog',
    docsDir: 'docs',
    docsBranch: 'main',

    /* 页内信息 */
    // editLink: true,
    // lastUpdated: true,
    // contributors: true,
    changelog: true,
    llmstxt: true,
    contributors: {
      mode: 'block',
    },

    /**
     * 编译缓存，加快编译速度
     * @see https://theme-plume.vuejs.press/config/basic/#cache
     */
    cache: 'filesystem',

    autoFrontmatter: {
      permalink: false,  // 是否生成永久链接
    //   createTime: true, // 是否生成创建时间
    //   title: true,      // 是否生成标题
    },

    /* 本地搜索, 默认启用 */
    search: { provider: 'local' },

    /**
     * Shiki 代码高亮
     * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
     */
    // codeHighlighter: {
    //   twoslash: true, // 启用 twoslash
    //   whitespace: true, // 启用 空格/Tab 高亮
    //   lineNumbers: true, // 启用行号
    // },

    /* 文章字数统计、阅读时间，设置为 false 则禁用 */
    // readingTime: true,

    /**
     * markdown
     * @see https://theme-plume.vuejs.press/config/markdown/
     */
    markdown: {
    //   abbr: true,         // 启用 abbr 语法  *[label]: content
      annotation: true,   // 启用 annotation 语法  [+label]: content
    //   pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
    //   caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
      plot: true,         // 启用隐秘文本语法 !!xxxx!!
      bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
    //   youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
    //   artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
    //   audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      icon: { provider: 'iconify' },        // 启用内置图标语法  ::icon-name::
      table: {
        align: 'center',
        maxContent: false,
        fullWidth: true,
        copy: true,
      },
    //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
    //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
    //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
    //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
    //   npmTo: true,        // 启用 npm-to 容器  ::: npm-to
    //   demo: true,         // 启用 demo 容器  ::: demo
    //   repl: {             // 启用 代码演示容器
    //     go: true,         // ::: go-repl
    //     rust: true,       // ::: rust-repl
    //     kotlin: true,     // ::: kotlin-repl
    //     python: true,     // ::: python-repl
    //   },
    //   math: {             // 启用数学公式
    //     type: 'katex',
    //   },
    //   chartjs: true,      // 启用 chart.js
    //   echarts: true,      // 启用 ECharts
      mermaid: true,      // 启用 mermaid
    //   flowchart: true,    // 启用 flowchart
      image: {
    //     figure: true,     // 启用 figure
        lazyload: true,   // 启用图片懒加载
    //     mark: true,       // 启用图片标记
    //     size: true,       // 启用图片大小
      },
    //   include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
      imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
      mark: 'lazy',
      timeline: true,
    },

    /**
     * 水印
     * @see https://theme-plume.vuejs.press/guide/features/watermark/
     */
    // watermark: true,

    /**
     * 评论 comments
     * @see https://theme-plume.vuejs.press/guide/features/comments/
     */
    comment: {
      provider: 'Waline',
      serverURL: 'https://waline-starter.netlify.app/.netlify/functions/comment',
      emoji: [
          "https://jsd.akams.cn/gh/walinejs/emojis@1.4.0/bilibili",
          "https://jsd.akams.cn/gh/walinejs/emojis@1.4.0/bmoji",
          'https://jsd.akams.cn/gh/walinejs/emojis@1.4.0/qq',
          'https://jsd.akams.cn/gh/walinejs/emojis@1.4.0/tieba',
          "https://jsd.akams.cn/gh/walinejs/emojis@1.4.0/weibo",
          'https://unpkg.com/@waline/emojis@1.2.0/tw-emoji',
          'https://jsd.akams.cn/gh/norevi/waline-blobcatemojis@1.0/blobs',
          'https://jsd.akams.cn/gh/walinejs/emojis@1.4.0/alus',
      ],
      reaction: [
        'https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_heart_eyes.png',
        'https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_thumbsup.png',
        'https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_zhoumei.png',
        'https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_grievance.png',
        'https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_dizzy_face.png',
        'https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_slap.png',
      ],
    },

    /**
     * 资源链接替换
     * @see https://theme-plume.vuejs.press/guide/features/replace-assets/
     */
    // replaceAssets: 'https://cdn.example.com',

    /**
     * 加密功能
     * @see https://theme-plume.vuejs.press/guide/features/encryption/
     */
    // encrypt: {},
  }),

  plugins: [
    feedPlugin({
      hostname: 'https://blog.jursin.top',
      rss: true,
      count: 100,
      image: '/avatar.png',
    }),
  ],

})
