import { createContentLoader } from 'vitepress'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import site from './config'
import { extractExcerpt } from './utils/excerpt'

export interface Post {
  title: string
  createTime: string
  updateTime: string
  tags: string[]
  category: string
  categoryDisplay: string
  excerpt: string
  url: string
  cover: string
}

const srcDir = path.resolve(process.cwd(), 'src')

const gitCache = new Map<string, string>()
function getGitTimestamp(filePath: string): string {
  if (gitCache.has(filePath)) return gitCache.get(filePath)!
  if (!fs.existsSync(filePath)) { gitCache.set(filePath, ''); return '' }

  try {
    const result = execSync(`git log -1 --format=%ct "${filePath.replace(/\\/g, '/')}"`, {
      encoding: 'utf-8', timeout: 5000,
    }).trim()
    if (result) {
      const d = new Date(parseInt(result) * 1000)
      const formatted = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
      gitCache.set(filePath, formatted)
      return formatted
    }
  } catch {}
  gitCache.set(filePath, '')
  return ''
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  includeSrc: true,
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.draft && !frontmatter.hidden)
      .map(({ url, frontmatter, src }): Post | null => {
        const title = frontmatter.title
        if (!title) return null

        const parts = url.split('/').filter(Boolean)
        const dirName = parts[1] || ''

        const excerptText = frontmatter.description
          || (src ? extractExcerpt(src) : '')

        const urlPath = url.replace(/\.html$/, '').replace(/^\//, '').replace(/\//g, path.sep)
        const filePath = path.join(srcDir, urlPath) + '.md'

        return {
          title,
          createTime: frontmatter.createTime || '',
          updateTime: getGitTimestamp(filePath),
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          category: dirName,
          categoryDisplay: site.categoryPathMap[dirName] || dirName.replaceAll('-', ' '),
          excerpt: excerptText,
          url,
          cover: frontmatter.cover || '',
        }
      })
      .filter((p): p is Post => p !== null)
      .sort((a, b) => {
        const aTime = a.createTime ? new Date(a.createTime).getTime() : 0
        const bTime = b.createTime ? new Date(b.createTime).getTime() : 0
        return bTime - aTime
      })
  },
})
