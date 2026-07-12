import fs from 'fs'
import path from 'path'
import type { TransformContext, HeadConfig } from 'vitepress'
import { extractExcerpt } from './theme/utils/excerpt'

export function buildHeadMeta(ctx: TransformContext) {
  const siteUrl = ctx.siteConfig.sitemap?.hostname || ''

  // 判断页面类型
  const isArticle = !!ctx.pageData.frontmatter?.createTime

  // 优先使用 frontmatter.description，否则从原始 markdown 提取
  let description = ''
  const fmDesc = ctx.pageData.frontmatter?.description
  if (fmDesc) {
    description = fmDesc
  } else if (ctx.pageData.frontmatter?.layout === 'home') {
    description = ctx.pageData.frontmatter?.hero?.tagline || ctx.siteConfig.site.description
  } else if (ctx.pageData.filePath) {
    const filePath = path.join(ctx.siteConfig.root, ctx.pageData.filePath)
    try {
      const src = fs.readFileSync(filePath, 'utf-8')
      description = extractExcerpt(src)
    } catch {}
  }
  if (!description) {
    description = ctx.siteConfig.site.description || ''
  }

  // frontmatter.cover → 正文第一张图 → /avatar.png 兜底
  let ogImage = ''
  const cover = ctx.pageData.frontmatter?.cover
  if (cover) {
    ogImage = `${siteUrl}${cover}`
  } else if (ctx.content) {
    const imgMatch = ctx.content.match(/<img\s[^>]*src="([^"]+)"/)
    if (imgMatch?.[1]) {
      const src = imgMatch[1]
      ogImage = src.startsWith('http') ? src : `${siteUrl}${src}`
    }
  }
  if (!ogImage) {
    ogImage = `${siteUrl}/avatar.png`
  }
  // 构建规范 URL
  let pagePath = ctx.page.replace(/\.md$/, '')
  pagePath = pagePath === 'index' || pagePath.endsWith('/index')
    ? pagePath.replace(/\/?index$/, '/')
    : '/' + pagePath + '.html'
  const pageUrl = `${siteUrl}${pagePath}`
  // og:title
  const pageTitle = isArticle
    ? ctx.pageData.title || ctx.siteConfig.site.title || ''
    : `${ctx.siteConfig.site.title || ''} | ${ctx.pageData.title || ''}`.replace(/ \| $/, '')
  const siteName = ctx.siteConfig.site.title || ''

  const tags: HeadConfig[] = [
    // 标准 SEO
    ['meta', { name: 'description', content: description }],

    // Open Graph
    ['meta', { property: 'og:title', content: pageTitle }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: pageUrl }],
    ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:image', content: ogImage }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: pageTitle }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImage }],
  ]

  // 博客文章附加结构化标签
  if (isArticle) {
    const createTime = ctx.pageData.frontmatter.createTime
    if (createTime) {
      tags.push(['meta', { property: 'article:published_time', content: new Date(createTime).toISOString() }])
    }
    if (ctx.pageData.lastUpdated) {
      tags.push(['meta', { property: 'article:modified_time', content: new Date(ctx.pageData.lastUpdated).toISOString() }])
    }
    const fmTags = ctx.pageData.frontmatter?.tags
    if (Array.isArray(fmTags)) {
      for (const tag of fmTags) {
        tags.push(['meta', { property: 'article:tag', content: tag }])
      }
    }
  }

  return tags
}
