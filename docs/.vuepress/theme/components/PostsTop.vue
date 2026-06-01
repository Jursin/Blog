<template>
  <div class="home">
    <div class="avatar">
      <img :src="profileData.avatar" :alt="avatar" loading="lazy" />
      <div class="emoji">{{ profileData.emoji }}</div>
    </div>
    <div class="info">
      <div style="
            margin-bottom: 0.5rem;
            font-family: 'Google Sans Code', sans-serif;
            font-size: 24px;
            animation: fadeInUp 1s ease-out 0.1s;
        ">
        <span style="color: rgb(0, 217, 255);">user@{{ profileData.name }}</span>
        <span style="color: rgb(110, 118, 129);">:</span>
        <span style="color: rgb(167, 139, 250);">~</span>
        <span style="color: rgb(110, 118, 129);">$</span>
        <span style="color: var(--vp-c-text-1); margin-left: 0.5rem;">whoami</span>
      </div>
      <div class="name">
        <span style="color: var(--vp-c-brand-1); margin-right: 6px;">&gt;</span>
        <span style="color: var(--vp-c-text-1);">{{ profileData.name }}</span>
        <span class="cursor">_</span>
      </div>
      <div class="hitokoto">
        <span>{{ hitokotoText }}</span>
      </div>
      <div class="social">
        <a v-for="item in profileData.socialLinks" :key="item.link" :href="item.link" target="_blank">
          <Icon :name="item.icon" :size="item.size || undefined" :color="item.color || undefined" />
        </a>
      </div>
    </div>
  </div>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&amp;family=Google+Sans+Flex:opsz,wght@6..144,1..1000&amp;display=swap"
    rel="stylesheet">
</template>

<script setup>
import { onMounted, ref } from 'vue';
import profileData from '../data/profile.json';

const hitokotoText = ref('一言加载中…');

onMounted(() => {
  fetch('https://v1.hitokoto.cn/?encode=json&c=d&c=i&c=k')
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (!data?.hitokoto) return;
      const from = data.from ?? data.from_who ?? '一言';
      hitokotoText.value = `${data.hitokoto} — ${from}`;
    })
    .catch(() => { });
});
</script>

<style scoped>
@keyframes blink {

  from,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

canvas {
  z-index: -1;
  position: fixed;
  top: -1px;
  left: -1px;
  pointer-events: none;
  overflow: hidden;
}

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  max-width: 1200px;
  padding: 1.5rem;
  margin: 0 auto;
}

.avatar img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: var(--vp-shadow-1);
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
  line-height: 1.2;
}

.cursor {
  animation: blink 1s step-end infinite;
  color: var(--vp-c-brand-3);
  display: inline-block;
  width: 0.65ch;
}

.vp-icon {
  margin: 0 !important;
}

.info>blockquote {
  background-color: var(--vp-c-bg);
}

.hitokoto {
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-1);
  border-radius: 8px;
  font-size: 20px;
  font-family: "SimSun", serif;
  color: var(--vp-c-text-1);
  padding: 0.65em;
  margin: 16px 0;
}

.social {
  font-size: 28px;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  max-width: 100%;
  align-items: center;
}

.social a {
  width: 50px;
  height: 50px;
  flex: 0 0 auto;
  box-sizing: border-box;
  border-radius: 50%;
  background: var(--vp-c-bg);
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

  .name {
    font-size: 36px;
  }

  .avatar img {
    width: 200px;
    height: 200px;
  }

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
