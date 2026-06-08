import fs from 'fs';
import path from 'path';
import process from 'process';
import 'dotenv/config';

const SITE_URL = process.env.SITE_URL;
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const SITEMAP_FILE = path.join(process.cwd(), 'docs/.vuepress/dist', 'sitemap.xml');
const OLD_SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const CHUNK_SIZE = 5;

const args = process.argv.slice(2);
const PUSH_MODE = args.includes('--push');
const FORCE = args.includes('--force');

function parseSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
}

async function sendIndexNow(urls) {
  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  };
  console.log('IndexNow 请求体:', JSON.stringify(payload, null, 2));
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });
  return { ok: res.ok, status: res.status, text: await res.text() };
}

// 主流程
if (!fs.existsSync(SITEMAP_FILE)) {
  console.error('本地 sitemap.xml 不存在:', SITEMAP_FILE);
} else {
  const newUrls = parseSitemap(fs.readFileSync(SITEMAP_FILE, 'utf-8'));

  let toPush = newUrls;
  if (!FORCE) {
    let oldUrls = [];
    try {
      const res = await fetch(OLD_SITEMAP_URL);
      if (res.ok) oldUrls = parseSitemap(await res.text());
      else console.warn('线上 sitemap.xml 未找到 (HTTP', res.status, ')，视为全部新页面');
    } catch {
      console.warn('获取线上 sitemap.xml 失败，视为全部新页面');
    }
    const oldSet = new Set(oldUrls);
    toPush = newUrls.filter(u => !oldSet.has(u));
  }

  if (toPush.length === 0) {
    console.log('没有新页面需要推送');
  } else {
    console.log(`发现 ${toPush.length} 个${FORCE ? '' : '新'}页面`);

    if (!PUSH_MODE) {
      toPush.forEach(u => console.log(u));
    } else {
      const chunks = [];
      for (let i = 0; i < toPush.length; i += CHUNK_SIZE) {
        chunks.push(toPush.slice(i, i + CHUNK_SIZE));
      }

      let ok = 0;
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        console.log(`推送 ${i + 1}/${chunks.length} (${chunk.length} 条)...`);
        try {
          const res = await sendIndexNow(chunk);
          if (res.ok) { ok++; console.log(`第 ${i + 1} 批成功 (HTTP ${res.status})`); }
          else console.error(`第 ${i + 1} 批失败 (HTTP ${res.status})`, res.text);
        } catch (e) {
          console.error(`第 ${i + 1} 批异常:`, e.message || e);
        }
        if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 500));
      }
      console.log(`IndexNow 推送完成（${ok}/${chunks.length}）`);
    }
  }
}
