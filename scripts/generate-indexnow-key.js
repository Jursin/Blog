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

const key = process.env.INDEXNOW_KEY

if (key) {
  const distDir = path.resolve('src/.vitepress/dist')
  fs.mkdirSync(distDir, { recursive: true })
  fs.writeFileSync(path.join(distDir, `${key}.txt`), key, 'utf-8')
  console.log(c.green('✓') + ' generating IndexNow key...')
  console.log(c.green('✓') + ' key file ' + c.dim(`${key}.txt`))
} else {
  console.log(c.yellow('✗') + ' INDEXNOW_KEY ' + c.yellow('not set'))
}
