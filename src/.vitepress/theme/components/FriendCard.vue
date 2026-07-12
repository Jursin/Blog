<template>
  <div class="friend-card">
    <div class="avatar">
      <img :src="friend.avatar" :alt="friend.name" loading="lazy" />
    </div>
    <div class="friend-content">
      <a
        class="friend-title"
        :href="friend.link"
        target="_blank"
        rel="noopener noreferrer"
      >{{ friend.name }}</a>
      <p v-if="friend.desc" class="desc">{{ friend.desc }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  friend: Object
})
</script>

<style scoped>
.friend-card {
  position: relative;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 20px;
  border: solid 1px var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 0 transparent;
  transition: all .25s ease;
}

.friend-card:hover {
  border-color: var(--vp-c-brand-2);
  box-shadow: var(--vp-shadow-2);
}

.avatar {
  width: 88px;
  height: 88px;
  padding: 8px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 50%;
}

.friend-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.friend-title {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-decoration: none;
  text-align: left;
  transition: color .25s ease;
}

.friend-title::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: "";
}

.friend-title:hover {
  color: var(--vp-c-brand-1);
}

.desc {
  margin: 8px 0 0;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  transition: color .25s ease;
}
</style>
