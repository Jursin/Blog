import { defineConfig, loadEnv } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { markPlugin } from './theme/plugins/mark'
import { plotPlugin } from './theme/plugins/plot'
import { supPlugin, subPlugin } from './theme/plugins/super-sub'
import { autoTitlePlugin } from './theme/plugins/auto-title'
import { transformerNotationWordHighlight } from '@shikijs/transformers'
import taskLists from 'markdown-it-task-lists'
import container from 'markdown-it-container'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { RssPlugin } from 'vitepress-plugin-rss'
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import zh from './theme/translations/zh'
import siteConfig from './theme/config'
const currentYear = new Date().getFullYear()

const env = loadEnv('', process.cwd(), 'VITE_')

// 将所有 VITE_ 开头的环境变量注入到组件
const viteDefine: Record<string, string> = {}
for (const key of Object.keys(env)) {
  viteDefine[`import.meta.env.${key}`] = JSON.stringify(env[key])
}

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: "Jursin 的博客",
    description: "一个使用 VitePress 构建的个人博客",
    sitemap: {
      hostname: 'https://blog.jursin.top',
    },
    vite: {
      publicDir: '.vitepress/public',
      define: viteDefine,
      plugins: [
        groupIconVitePlugin(),
        RssPlugin({
          title: 'Jursin 的博客',
          baseUrl: 'https://blog.jursin.top',
        }),
        GitChangelog({
          repoURL: () => `https://github.com/${siteConfig.blogRepo}`,
        }),
        GitChangelogMarkdownSection(),
      ],
    },
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      ['script', {
        defer: '',
        src: 'https://umami.jursin.top/script.js',
        'data-website-id': 'd072a3ac-3b82-41de-89c9-5c8d4192b39b'
      }]
    ],
    lastUpdated: true,
    ignoreDeadLinks: true,
    markdown: {
      container: {
        infoLabel: '信息',
        noteLabel: '注意',
        tipLabel: '提示',
        importantLabel: '重要',
        warningLabel: '警告',
        dangerLabel: '危险',
        cautionLabel: '危险',
        detailsLabel: '详细信息'
      },
      image: {
        lazyLoading: true
      },
      lineNumbers: true,
      math: true,
      codeTransformers: [
        transformerNotationWordHighlight(),
      ],
      config: (md) => {
        md.renderer.rules.heading_close = function(tokens, idx, options, env, slf) {
            let htmlResult = slf.renderToken(tokens, idx, options);
            if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMeta />`;
            return htmlResult;
        }
        md.use(groupIconMdPlugin)
        md.use(markPlugin)
        md.use(plotPlugin)
        md.use(supPlugin)
        md.use(subPlugin)
        md.use(autoTitlePlugin)
        md.use(taskLists, { label: true })
        // 注册 VitePress 未内置的容器
        ;(['note', 'important', 'caution'] as const).forEach((type) => {
          const labels = { note: '注意', important: '重要', caution: '危险' }
          md.use(container, type, {
            render(tokens: any[], idx: number) {
              const token = tokens[idx]
              if (token.nesting === 1) {
                token.attrJoin('class', `${type} custom-block`)
                const info = token.info.trim().slice(type.length).trim()
                const title = md.utils.escapeHtml(info || labels[type])
                const titleClass = 'custom-block-title' + (info ? '' : ' custom-block-title-default')
                return `<div ${md.renderer.renderAttrs(token)}><p class="${titleClass}">${title}</p>\n`
              }
              return `</div>\n`
            }
          })
        })
      }
    },
    themeConfig: {
      logo: '/avatar.png',
      nav: [
        { text: '<iconify-icon icon="material-symbols:home-outline-rounded" width="1.25em" height="1.25em"></iconify-icon> 首页', link: '/' },
        { text: '<iconify-icon icon="material-symbols:archive-outline" width="1.25em" height="1.25em"></iconify-icon> 归档', link: '/archives' },
        { text: '<iconify-icon icon="octicon:ai-model-16" width="1em" height="1em"></iconify-icon> 技能', link: '/skills' },
        {
          text: '<iconify-icon icon="material-symbols:interests-outline" width="1.25em" height="1.25em"></iconify-icon> 娱乐',
          items: [
            { text: '<iconify-icon icon="material-symbols:sports-esports-outline" width="1.25em" height="1.25em"></iconify-icon> 游戏', link: '/games' },
            { text: '<iconify-icon icon="material-symbols:play-circle-outline" width="1.25em" height="1.25em"></iconify-icon> 追番', link: '/anime' },
            { text: '<iconify-icon icon="material-symbols:library-music-outline" width="1.25em" height="1.25em"></iconify-icon> 歌单', link: '/song-list' },
          ]
        },
        { text: '<iconify-icon icon="octicon:link-16" width="1em" height="1em"></iconify-icon> 友链', link: '/friends' },
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/Jursin/Blog' },
      ],
      footer: {
        message: `<span style="color: var(--vp-c-brand-1);">©</span> 2025-${currentYear} Jursin | 由 <a href="https://vitepress.dev/" target="_blank" style="color: var(--vp-c-brand-1);">VitePress</a> 驱动`,
        copyright: '<img src="/icon/miit.png" width="14" height="14" style="margin-right: 5px; display: inline-block; vertical-align: middle;"><a href="https://beian.miit.gov.cn/" target="_blank" >鄂ICP备2025157296号</a> | <img src="/icon/mps.png" width="14" height="14" style="margin-right: 5px; display: inline-block; vertical-align: middle;"><a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank">鄂公网安备42100302000228号</a>',
      },
      ...zh,
    },
    mermaid: {
      // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    // optionally set additional config for plugin itself with MermaidPluginConfig
    mermaidPlugin: {
      class: "mermaid my-class", // set additional css classes for parent container
    },

  })
)
