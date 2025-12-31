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
      <span class="tag">
        <Icon name="mdi:location" width="16" height="16" />
        湖北荆州
      </span>
      <span class="tag">
        <Icon name="ep:school" width="16" height="16" />
        长江大学
      </span>
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

<div class="pixel-blast" aria-hidden="true"></div>

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
  position: relative;
  z-index: 1;
}

.pixel-blast {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at 12% 22%, rgba(0, 217, 255, 0.32), transparent 38%),
              radial-gradient(circle at 80% 12%, rgba(167, 139, 250, 0.3), transparent 36%),
              radial-gradient(circle at 65% 78%, rgba(255, 125, 72, 0.28), transparent 42%),
              radial-gradient(circle at 28% 70%, rgba(63, 185, 80, 0.26), transparent 44%),
              radial-gradient(circle at 90% 65%, rgba(255, 225, 128, 0.24), transparent 48%);
  mix-blend-mode: normal;
  opacity: 1;
  filter: saturate(115%) brightness(105%);
}

.pixel-blast::before,
.pixel-blast::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: var(--vp-c-brand-1);
  box-shadow: 12px -18px 0 rgba(0, 217, 255, 0.65),
              -24px 14px 0 rgba(167, 139, 250, 0.65),
              30px 6px 0 rgba(255, 125, 72, 0.6),
              -32px -24px 0 rgba(63, 185, 80, 0.6),
              8px 28px 0 rgba(255, 225, 128, 0.6),
              48px -10px 0 rgba(0, 217, 255, 0.4),
              -14px -40px 0 rgba(167, 139, 250, 0.5),
              60px 22px 0 rgba(63, 185, 80, 0.45),
              -54px 18px 0 rgba(255, 125, 72, 0.5),
              20px -52px 0 rgba(255, 225, 128, 0.55),
              -64px -8px 0 rgba(0, 217, 255, 0.45),
              72px -36px 0 rgba(167, 139, 250, 0.35),
              -78px 34px 0 rgba(63, 185, 80, 0.35),
              34px 60px 0 rgba(255, 125, 72, 0.35),
              -20px 72px 0 rgba(0, 217, 255, 0.35);
  opacity: 0.8;
  transform: translate(-50%, -50%) scale(0.55);
  animation: pixelBlast 6s linear infinite;
  filter: drop-shadow(0 0 10px rgba(0, 217, 255, 0.3));
}

.pixel-blast::after {
  animation-duration: 9s;
  animation-delay: -2s;
  opacity: 0.55;
  filter: hue-rotate(28deg) drop-shadow(0 0 12px rgba(167, 139, 250, 0.28));
}

@keyframes pixelBlast {
  0% {
    transform: translate(-50%, -50%) scale(0.45) rotate(0deg);
    opacity: 0.9;
  }
  60% {
    opacity: 0.65;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.6) rotate(12deg);
    opacity: 0.08;
  }
}

.avatar img {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 8px 24px var(--vp-c-brand-soft);
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
  background: var(--vp-c-default-soft);
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
  color: var(--vp-c-text-2);
}
.desc {
  font-size: 20px;
  color: var(--vp-c-text-1);
  padding-left: 16px;
  border-left: 3px solid var(--vp-c-brand-1);
}
.hitokoto {
  margin: 0;
  font-size: 20px !important;
  color: var(--vp-c-text-2);
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
  background: var(--vp-c-default-soft);
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

@media screen and (max-width: 768px) {
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
  .tags-container {
    justify-content: center;
    align-items: center;
  }
  .social {
    justify-content: center;
    align-items: center;
  }
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
