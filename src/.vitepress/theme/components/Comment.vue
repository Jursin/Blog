<script setup>
import { defineAsyncComponent, computed, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import '@waline/client/style';
import site from '../config';

const Waline = defineAsyncComponent(() => import('@waline/client/component').then(m => m.Waline));

const serverURL = site.comment.serverURL;
const route = useRoute();
const path = computed(() => route.path);
const dark = 'html[class~="dark"]';

onMounted(() => nextTick(async () => {
  const { pageviewCount } = await import('@waline/client/pageview');
  pageviewCount({ serverURL });
}));
watch(path, () => nextTick(async () => {
  const { pageviewCount } = await import('@waline/client/pageview');
  pageviewCount({ serverURL });
}));

const emojiOptions = [
  'https://unpkg.com/@waline/emojis@1.4.0/bilibili',
  'https://unpkg.com/@waline/emojis@1.4.0/bmoji',
  'https://gcore.jsdelivr.net/gh/Jursin/waline-emojis@v1.5.0/wechat',
  'https://unpkg.com/@waline/emojis@1.4.0/qq',
  'https://gcore.jsdelivr.net/gh/Jursin/waline-emojis@v1.5.0/feishu',
  'https://gcore.jsdelivr.net/gh/Jursin/waline-emojis@v1.5.0/douyin',
  'https://unpkg.com/@waline/emojis@1.4.0/tieba',
  'https://unpkg.com/@waline/emojis@1.4.0/weibo',
  'https://unpkg.com/@waline/emojis@1.4.0/tw-emoji',
  'https://unpkg.com/@waline/emojis@1.4.0/alus',
];
const reactionOptions = [
  'https://unpkg.com/@waline/emojis@1.4.0/bilibili/bb_heart_eyes.png',
  'https://unpkg.com/@waline/emojis@1.4.0/bilibili/bb_thumbsup.png',
  'https://unpkg.com/@waline/emojis@1.4.0/bilibili/bb_zhoumei.png',
  'https://unpkg.com/@waline/emojis@1.4.0/bilibili/bb_grievance.png',
  'https://unpkg.com/@waline/emojis@1.4.0/bilibili/bb_dizzy_face.png',
  'https://unpkg.com/@waline/emojis@1.4.0/bilibili/bb_slap.png',
];
const localesOptions = {
  '/': {
    reaction0: '非常有用',
    reaction1: '有帮助',
    reaction2: '一般',
    reaction3: '无帮助',
    reaction4: '看不懂',
    reaction5: '有错误',
    reactionTitle: '本页内容对您有帮助吗？',
    sofa: '还没有人留言哦！快来抢沙发吧~',
    comment: '留言',
  }
};
</script>

<template>
  <h2 id="评论区" tabindex="-1">
    <a class="header-anchor" href="#评论区">
      <Icon name="mdi:comment-text-outline" />
    </a>
    评论区
  </h2>
  <Waline
    :serverURL="serverURL"
    :path="path"
    :dark="dark"
    :emoji="emojiOptions"
    :reaction="reactionOptions"
    :locales="localesOptions"
  />
</template>

<style scoped>
h2 {
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
  position: relative;
  font-weight: 600;
  outline: none;
}

.header-anchor {
  position: absolute;
  top: 24px;
  left: 0;
  margin-left: -1.25em;
  font-weight: 500;
  user-select: none;
  text-decoration: none;
  opacity: 0;
  color: var(--vp-c-brand-1);
  transition: color 0.25s, opacity 0.25s;
}

h2:hover .header-anchor,
.header-anchor:focus {
  opacity: 1;
}

[data-waline] {
  --waline-theme-color: var(--vp-c-brand);
  --waline-active-color: var(--vp-c-brand);
}

:deep(.wl-emoji-popup, .wl-gif-popup) {
  z-index: 99;
}
</style>