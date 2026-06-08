import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const key = process.env.INDEXNOW_KEY;

if (key) {
  fs.writeFileSync(path.join(`docs/.vuepress/dist`, `${key}.txt`), key, 'utf-8');
  console.log(`[INFO] 已生成密钥文件 ${key}.txt`);
} else {
  console.log('[WARN] 环境变量 INDEXNOW_KEY 未设置');
}