import { createContentLoader } from 'vitepress'
import { execSync } from 'child_process'
import path from 'path'
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
  order: number
}

const srcDir = path.resolve(process.cwd(), 'src')

function formatTimestamp(ts: string): string {
  if (!ts) return ''
  const d = new Date(parseInt(ts) * 1000)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}

function getGitTimestamps(filePaths: string[]): Map<string, string> {
  const result = new Map<string, string>()
  if (filePaths.length === 0) return result

  try {
    const output = execSync(
      'git log --format="%ct" --name-only --diff-filter=AM -- "src/blog/"',
      { encoding: 'utf-8', timeout: 30000 },
    )
    let currentTimestamp = ''
    for (const line of output.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed) continue
      if (/^\d+$/.test(trimmed)) {
        currentTimestamp = trimmed
      } else if (currentTimestamp) {
        const absPath = path.resolve(process.cwd(), trimmed)
        if (!result.has(absPath)) result.set(absPath, currentTimestamp)
      }
    }
  } catch {}

  return result
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  includeSrc: true,
  transform(raw): Post[] {
    const filtered = raw.filter(({ frontmatter }) => !frontmatter.draft && !frontmatter.hidden)

    const filePaths = filtered.map(({ url }) => {
      const urlPath = url.replace(/\.html$/, '').replace(/^\//, '').replace(/\//g, path.sep)
      return path.join(srcDir, urlPath) + '.md'
    })

    const gitTimestamps = getGitTimestamps(filePaths)

    return filtered
      .map(({ url, frontmatter, src }, i): Post | null => {
        const title = frontmatter.title
        if (!title) return null

        const parts = url.split('/').filter(Boolean)
        const dirName = parts[1] || ''

        const excerptText = frontmatter.description
          || (src ? extractExcerpt(src) : '')

        const ts = gitTimestamps.get(filePaths[i])
        const updateTime = ts ? formatTimestamp(ts) : ''

        return {
          title,
          createTime: frontmatter.createTime || '',
          updateTime,
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          category: dirName,
          categoryDisplay: site.categoryPathMap[dirName] || dirName.replaceAll('-', ' '),
          excerpt: excerptText,
          url,
          cover: frontmatter.cover || '',
          order: frontmatter.order || 0,
        }
      })
      .filter((p): p is Post => p !== null)
      .sort((a, b) => {
        const aPinned = a.order > 0
        const bPinned = b.order > 0
        if (aPinned !== bPinned) return aPinned ? -1 : 1
        if (aPinned) return a.order - b.order
        const aTime = a.createTime ? new Date(a.createTime).getTime() : 0
        const bTime = b.createTime ? new Date(b.createTime).getTime() : 0
        return bTime - aTime
      })
  },
})
