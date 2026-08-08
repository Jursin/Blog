import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import taskLists from 'markdown-it-task-lists'
import container from 'markdown-it-container'
import { transformerNotationWordHighlight } from '@shikijs/transformers'
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { buildFeed } from './genFeed'
import { buildHeadMeta } from './genHead'
import { startAutoFrontmatter } from './autoFrontmatter'
import { markPlugin } from './theme/plugins/mark'
import { plotPlugin } from './theme/plugins/plot'
import { supPlugin, subPlugin } from './theme/plugins/super-sub'
import { autoTitlePlugin } from './theme/plugins/auto-title'
import { textImagePlugin } from './theme/plugins/text-image'
import zh from './theme/translations/zh'
import siteConfig from './theme/config'
const currentYear = new Date().getFullYear()

const isDev = process.argv.some(a => a === 'dev')

// 开发模式下自动填充新 md 文件的 title 和 createTime
if (isDev) {
  startAutoFrontmatter()
}

export default defineConfig({
    lang: 'zh-CN',
    title: "Jursin 的博客",
    description: "一个使用 VitePress 构建的个人博客",
    sitemap: {
      hostname: 'https://blog.jursin.top',
    },
    vite: {
      publicDir: '.vitepress/public',
      envDir: process.cwd(),
      build: {
        target: 'es2020',
        cssCodeSplit: !isDev,
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          onwarn(warning, warn) {
            if (warning.message?.includes('__PURE__')) return
            warn(warning)
          },
        },
      },
      plugins: [
        groupIconVitePlugin(),
        GitChangelog({
          repoURL: () => `https://github.com/${siteConfig.blogRepo}`,
          maxGitLogCount: 10,
          mapAuthors: [
            { name: 'Jursin', username: 'Jursin' },
          ],
        }),
        GitChangelogMarkdownSection(),
      ],
    },
    
    head: [
      [ 'link', { rel: 'icon', href: '/favicon.ico' } ],
      [ 'link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: '/rss.xml' } ],
      [
        'script', {
          defer: '',
          src: 'https://umami.jursin.top/script.js',
          'data-website-id': 'd072a3ac-3b82-41de-89c9-5c8d4192b39b'
        }
      ]
    ],
    lastUpdated: true,
    ignoreDeadLinks: true,

    buildEnd: buildFeed,

    async transformHead(ctx) {
      if (isDev) return []
      return buildHeadMeta(ctx)
    },

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
        md.use(textImagePlugin)
        md.use(taskLists, { label: true });
        // 注册 VitePress 未内置的容器
        (['note', 'important', 'caution'] as const).forEach((type) => {
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
        { 
          icon: { 
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img"><path fill="currentColor" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0a8 8 0 0 0-8-8a1 1 0 0 1 0-2m0 4a6 6 0 0 1 6 6a1 1 0 1 1-2 0a4 4 0 0 0-4-4a1 1 0 0 1 0-2m.5 7a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3" /></svg>' 
          },
          link: '/rss.xml' 
        },
      ],
      footer: {
        message: `<span style="color: var(--vp-c-brand-1);">©</span> 2025-${currentYear} Jursin | 由 <a href="https://vitepress.dev/" target="_blank" style="color: var(--vp-c-brand-1);">VitePress</a> 驱动`,
        copyright: '<img src="/icon/miit.png" width="14" height="14" style="margin-right: 5px; display: inline-block; vertical-align: middle;"><a href="https://beian.miit.gov.cn/" target="_blank" >鄂ICP备2025157296号</a> | <img src="/icon/mps.png" width="14" height="14" style="margin-right: 5px; display: inline-block; vertical-align: middle;"><a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank">鄂公网安备42100302000228号</a>',
      },
      ...zh,
    },
  })
