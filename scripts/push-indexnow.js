import fs from 'fs'
import path from 'path'
import process from 'process'

try { process.loadEnvFile() } catch {}

const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
}

const SITE_URL = process.env.VITE_SITE_URL
const INDEXNOW_KEY = process.env.INDEXNOW_KEY
const DIST_DIR = path.resolve('src/.vitepress/dist')
const SITEMAP_FILE = path.join(DIST_DIR, 'sitemap.xml')
const OLD_SITEMAP_URL = `${SITE_URL}/sitemap.xml`
const CHUNK_SIZE = 5

const args = process.argv.slice(2)
const PUSH_MODE = args.includes('--push')
const FORCE = args.includes('--force')

function parseSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
}

async function sendIndexNow(urls) {
  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })
  return { ok: res.ok, status: res.status, text: await res.text() }
}

console.log(c.green('✓') + ' reading sitemap...')
if (!fs.existsSync(SITEMAP_FILE)) {
  console.log(c.red('✗') + ' sitemap.xml ' + c.red('not found at') + ' ' + c.dim(SITEMAP_FILE))
} else {
  const newUrls = parseSitemap(fs.readFileSync(SITEMAP_FILE, 'utf-8'))
  console.log(c.green('✓') + ' found ' + c.dim(`${newUrls.length} URL`) + ' in sitemap')

  let toPush = newUrls
  if (!FORCE) {
    console.log(c.green('✓') + ' fetching remote sitemap...')
    let oldUrls = []
    try {
      const res = await fetch(OLD_SITEMAP_URL)
      if (res.ok) {
        oldUrls = parseSitemap(await res.text())
        console.log(c.green('✓') + ' remote sitemap has ' + c.dim(`${oldUrls.length} URL`))
      } else {
        console.log(c.yellow('✗') + ' remote sitemap ' + c.yellow(`HTTP ${res.status}`) + ', pushing all URLs')
      }
    } catch {
      console.log(c.yellow('✗') + ' failed to fetch remote sitemap, pushing all URLs')
    }
    const oldSet = new Set(oldUrls)
    toPush = newUrls.filter(u => !oldSet.has(u))
  }

  if (toPush.length === 0) {
    console.log(c.green('✓') + ' no new URLs to push')
  } else {
    console.log(c.green('✓') + ' ' + c.dim(`${toPush.length}`) + ` new URL${toPush.length > 1 ? 's' : ''} to push`)

    if (!PUSH_MODE) {
      toPush.forEach(u => console.log('  ' + c.dim(u)))
      console.log(c.green('✓') + ' dry-run complete' + c.dim(' — use --push to submit'))
    } else {
      const chunks = []
      for (let i = 0; i < toPush.length; i += CHUNK_SIZE) {
        chunks.push(toPush.slice(i, i + CHUNK_SIZE))
      }

      let ok = 0
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]
        console.log(c.yellow('→') + ` pushing ${i + 1}/${chunks.length} ` + c.dim(`(${chunk.length} URLs)`))
        try {
          const res = await sendIndexNow(chunk)
          if (res.ok) {
            ok++
            console.log(c.green('✓') + ` batch ${i + 1} ` + c.dim(`HTTP ${res.status}`))
          } else {
            console.log(c.red('✗') + ` batch ${i + 1} ` + c.red(`HTTP ${res.status}`) + c.dim(` ${res.text}`))
          }
        } catch (e) {
          console.log(c.red('✗') + ` batch ${i + 1}: ` + c.red(e.message || e))
        }
        if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 500))
      }
      console.log(c.green('✓') + ' IndexNow push complete' + c.dim(` (${ok}/${chunks.length} batches)`))
    }
  }
}
