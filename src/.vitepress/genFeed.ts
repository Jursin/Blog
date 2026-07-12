import { writeFileSync } from 'fs'
import path from 'path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import site from './theme/config'
import { extractExcerpt } from './theme/utils/excerpt'

export async function buildFeed(config: SiteConfig) {
  const siteUrl = config.sitemap?.hostname

  const raw = await createContentLoader('blog/**/*.md', {
    includeSrc: true,
  }).load()

  const logoPath = typeof config.site.themeConfig.logo === 'string'
    ? config.site.themeConfig.logo
    : config.site.themeConfig.logo?.src

  const feed = new Feed({
    title: config.site.title,
    description: config.site.description,
    id: siteUrl,
    link: siteUrl,
    language: config.site.lang,
    image: `${siteUrl}${logoPath}`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© 2025-${new Date().getFullYear()} Jursin`,
  })

  const items = raw
    .filter(p => !p.frontmatter.draft && !p.frontmatter.hidden && p.frontmatter.createTime)
    .sort((a, b) => new Date(b.frontmatter.createTime).getTime() - new Date(a.frontmatter.createTime).getTime())
    .slice(0, 100)
    .map(p => {
      const dir = p.url.split('/').filter(Boolean)[1] || ''
      const desc = p.frontmatter.description
        || (p.src ? extractExcerpt(p.src) : '')

      const categories: { name: string }[] = [{ name: site.categoryPathMap[dir] || dir }]
      if (Array.isArray(p.frontmatter.tags)) {
        p.frontmatter.tags.forEach((t: string) => categories.push({ name: t }))
      }

      return {
        title: p.frontmatter.title,
        id: `${siteUrl}${p.url}`,
        link: `${siteUrl}${p.url}`,
        description: desc,
        content: desc,
        date: new Date(p.frontmatter.createTime),
        category: categories,
      }
    })

  for (const item of items) feed.addItem(item)

  writeFileSync(path.join(config.outDir, 'rss.xml'), feed.rss2())
  console.log(`\x1b[32m✓\x1b[39m generated feed include ${items.length} posts (rss.xml)`)
}
