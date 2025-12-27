---
pageLayout: page
---

<div class="home">
	<div class="avatar">
		<img src="/avatar.png" alt="Avatar" loading="lazy" />
		<div class="emoji">😋</div>
	</div>
	<div class="info">
    <div style="
        margin-bottom: 0.5rem;
        font-family: 'Google Sans Code', sans-serif;
        font-size: 24px;
        animation: fadeInUp 1s ease-out 0.1s;
      ">
      <span style="color: rgb(0, 217, 255);">user@Jursin</span>
      <span style="color: rgb(110, 118, 129);">:</span>
      <span style="color: rgb(167, 139, 250);">~</span>
      <span style="color: rgb(110, 118, 129);">$</span>
      <span style="color: var(--vp-c-text-1); margin-left: 0.5rem;">whoami</span>
    </div>
		<div class="name">
      <span style="color: var(--vp-c-brand-1); margin-right: 6px;">&gt;</span>
      <span style="color: var(--vp-c-text-1);">Jursin</span>
      <span class="cursor">_</span>
    </div>
    <div class="tags-container">
      <div class="tag">
        <Icon name="mdi:location" width="16" height="16" />
        湖北荆州
      </div>
      <div class="tag">
        <Icon name="ep:school" width="16" height="16" />
        长江大学
      </div>
    </div>
    <p class="career">
      <mark class="vp-mark-visible" style=" margin-right: 0.5rem;">大学生</mark>
      <mark class="important vp-mark-visible">前端入门者</mark>
    </p>
		<p class="desc">若想梦想实现，先从梦中醒来。</p>
    <blockquote>
      <p class="hitokoto">
        <span id="hitokoto_text">一言加载中…</span>
      </p>
    </blockquote>
    <div class="social">
      <a href="https://github.com/Jursin" target="_blank"><Icon name="mdi:github" /></a>
      <a href="https://space.bilibili.com/1575907920" target="_blank"><Icon name="mingcute:bilibili-line" color="#F9709A" /></a>
      <a href="https://t.me/Hello_Jursin" target="_blank"><Icon name="mingcute:telegram-fill" color="#62B8EB" /></a>
      <a href="jursin@126.com" target="_blank"><Icon name="mdi:email-outline" color="#177F41" /></a>
      <a href="https://forum.smart-teach.cn/u/Jursin" target="_blank"><img src="/icon/SmartTeach.svg" alt="SmartTeach" class="social-icon"></a>
    </div>
	</div>
</div>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&amp;family=Google+Sans+Flex:opsz,wght@6..144,1..1000&amp;display=swap" rel="stylesheet">

<style scoped>
@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

.cursor {
  animation: blink 1s step-end infinite;
  color: var(--vp-c-brand-3);
  display: inline-block;
  width: 0.65ch;
}

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  max-width: 1200px;
  padding: 3rem 1.5rem;
  margin: 0 auto;
  min-height: 75vh;
}

.avatar img {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.06);
}

.avatar {
  position: relative;
  display: inline-block;
}

.emoji {
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.emoji:hover {
  transform: scale(1.15);
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  font-family: 'Google Sans Code', sans-serif;
  font-size: 60px;
  font-weight: bold;
  margin: 0 0 0.5rem;
  line-height: 1.2;
}

.tags-container {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}

.tag {
  padding: 7px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.vp-icon {
  margin: 0 !important;
}

.career {
  margin: 0 0 1rem;
  font-size: 22px;
  color: var(--vp-c-text-2, #666);
}
.desc {
  font-size: 20px;
  color: var(--vp-c-text-1, #333);
  padding-left: 16px;
  border-left: 3px solid var(--vp-c-brand-1);
}
.hitokoto {
  margin: 0;
  font-size: 20px !important;
  color: var(--vp-c-text-2, #666);
}

.social {
  font-size: 28px;
  display: flex;
  gap: 0.8rem;
}

.social a {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.social-icon {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  object-fit: contain;
}

.social a:hover {
  transform: scale(1.1);
}

@media (max-width: 640px) {
  .home {
    flex-direction: column;
    text-align: center;
  }
  .name { font-size: 36px; }
  .avatar img { width: 200px; height: 200px; }
  .emoji {
    bottom: 18px;
    right: 18px;
    width: 35px;
    height: 35px;
    font-size: 20px;
  }
}
@media (prefers-color-scheme: dark) {
  .avatar img { border-color: rgba(255,255,255,0.12); box-shadow: 0 8px 24px rgba(0,0,0,0.35); }
  .desc { color: var(--vp-c-text-1, #ddd); }
  .career, .hitokoto { color: var(--vp-c-text-2, #aaa); }
}
</style>

<script>
	(async function loadHitokoto() {
		try {
			const res = await fetch('https://v1.hitokoto.cn/?encode=json&c=d&c=h&c=i');
			const data = await res.json();
			const el = document.getElementById('hitokoto_text');
			if (el && data && data.hitokoto) {
				const from = data.from || data.from_who || '一言';
				el.textContent = `${data.hitokoto} — ${from}`;
			}
		} catch (err) {
			// 静默失败，保留占位文本
		}
	})();
</script>
