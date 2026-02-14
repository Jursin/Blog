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
    <blockquote>
      <p class="hitokoto">
        <span id="hitokoto_text">一言加载中…</span>
      </p>
    </blockquote>
    <div class="social">
      <a href="https://github.com/Jursin" target="_blank"><Icon name="mdi:github" /></a>
      <a href="https://space.bilibili.com/1575907920" target="_blank"><Icon name="mingcute:bilibili-line" color="#F9709A" /></a>
      <a href="https://t.me/Hello_Jursin" target="_blank"><Icon name="mingcute:telegram-fill" color="#62B8EB" /></a>
      <a href="mailto:jursin@126.com" target="_blank"><Icon name="mdi:email-outline" color="#177F41" /></a>
      <a href="https://forum.smart-teach.cn/u/Jursin" target="_blank"><img src="/icon/SmartTeach.svg" alt="SmartTeach" class="social-icon"></a>
    </div>
    <div class="actions">
      <div class="action">
        <VPButton text="博客" icon="mdi:blog" href="/blog/" theme="alt" />
        <VPButton text="技能" icon="mdi:code-tags" href="/skills" theme="alt" />
      </div>
    </div>
	</div>
</div>

<div class="pixelblast-layer" aria-hidden="true">
  <ClientOnly>
    <PixelBlast
      class="pixelblast-canvas"
      variant="square"
      color="#5086a1"
      :speed="0.5"
      :pixel-size="4"
      :pattern-scale="2"
      :pattern-density="0.8"
      :edge-fade="0.5"
      :pixel-size-jitter="0"
      :antialias="true"
      :enable-ripples="true"
      :ripple-intensity-scale="1"
      :ripple-thickness="0.1"
      :ripple-speed="0.3"
      :liquid="false"
      :liquid-strength="0.1"
      :liquid-radius="1"
      :liquid-wobble-speed="4.5"
      :auto-pause-offscreen="true"
      :transparent="true"
      :noise-amount="0"
    />
  </ClientOnly>
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
  position: relative;
  z-index: 1;
}

.pixelblast-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: auto;
  overflow: hidden;
}

.pixelblast-layer :deep(.home-hero-effect-pixel-blast) {
  position: absolute;
  inset: 0;
  pointer-events: auto;
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

.vp-icon {
  margin: 0 !important;
}

.info > blockquote {
  background-color: var(--vp-c-bg-soft);
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
  background: var(--vp-c-bg-soft);
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

.actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}

.action {
  display: flex;
  gap: 0.25rem;
}

.action :deep(.vp-button) {
  text-decoration: none;
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
  .actions {
    justify-content: center;
  }
}
</style>

<script setup>
import PixelBlast from '@theme/background/PixelBlast.vue'

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
