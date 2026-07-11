import { watch } from 'chokidar'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG = path.resolve(process.cwd(), 'src/blog')

function stamp(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

function dataToYAML(data: Record<string, any>): string {
  return Object.entries(data).map(([k, v]) =>
    Array.isArray(v) ? `${k}:\n${v.map(i => `  - ${i}`).join('\n')}`
    : v instanceof Date ? `${k}: ${stamp(v)}`
    : `${k}: ${v}`
  ).join('\n')
}

export function startAutoFrontmatter() {
  const w = watch(BLOG, { ignoreInitial: true, ignored: (p, s) => s?.isFile() ? !p.endsWith('.md') : false })
  w.on('add', (fp: string) => {
    try {
      const { data, content } = matter(readFileSync(fp, 'utf-8'))
      if (data.title && data.createTime) return
      if (!data.title) data.title = path.basename(fp).replace(/\.md$/, '').trim()
      if (!data.createTime) data.createTime = stamp(new Date())
      writeFileSync(fp, `---\n${dataToYAML(data)}\n---\n${content.replace(/^\n+/, '')}`, 'utf-8')
      console.log(`\x1b[2m${new Date().toLocaleTimeString()}\x1b[22m \x1b[33m[auto-frontmatter]\x1b[39m ${path.relative(BLOG, fp)}`)
    } catch (e) { console.error(`\x1b[31m[auto-frontmatter]\x1b[39m ${fp}:`, e) }
  })
}
