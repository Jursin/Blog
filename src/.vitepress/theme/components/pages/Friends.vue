<template>
  <div class="friends-page">
    <h2 class="page-title">{{ title }}</h2>
    <p v-if="description" class="page-desc">{{ description }}</p>

    <!-- 顶层列表（无分组） -->
    <section v-if="list.length" class="friends-list">
      <FriendCard
        v-for="(friend, index) in list"
        :key="'flat-' + index"
        :friend="friend"
      />
    </section>

    <!-- 分组列表 -->
    <div v-for="(group, gIdx) in groups" :key="gIdx" class="friends-group">
      <h3 class="group-title">{{ group.title }}</h3>
      <p v-if="group.desc" class="group-desc">{{ group.desc }}</p>
      <section v-if="group.list?.length" class="friends-list">
        <FriendCard
          v-for="(friend, fIdx) in group.list"
          :key="gIdx + '-' + fIdx"
          :friend="friend"
        />
      </section>
    </div>

    <!-- 本站友情链接 -->
    <div class="vp-doc friends-info-card">
      <header class="info-title">
        <Icon name="mdi:web" />
        <span>本站友情链接</span>
      </header>
      <ul>
        <li>名称：<code>Jursin 的博客</code></li>
        <li>链接：<code>https://blog.jursin.top/</code></li>
        <li>头像：<code>https://blog.jursin.top/avatar.png</code></li>
        <li>描述：<code>若要梦想实现，先从梦中醒来</code></li>
        <li>订阅：<code>https://blog.jursin.top/rss.xml</code></li>
      </ul>
    </div>

    <!-- Comment -->
    <div class="friends-comment">
      <Comment />
    </div>
  </div>
</template>

<script>
import { useData } from 'vitepress'
import { computed } from 'vue'
import Comment from '../Comment.vue'
import FriendCard from '../FriendCard.vue'

export default {
  name: 'Friends',
  components: { Comment, FriendCard },
  setup() {
    const { frontmatter } = useData()

    const title = computed(() => frontmatter.value.title || '友情链接')
    const description = computed(() => frontmatter.value.description || '')
    const groups = computed(() => frontmatter.value.groups || [])
    const list = computed(() => frontmatter.value.list || [])

    return { title, description, groups, list }
  }
}
</script>

<style scoped>
.friends-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px 5rem;
}

.page-title {
  padding: 32px 0 0;
  margin-bottom: 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-align: center;
}

.page-desc,
.group-desc {
  margin-bottom: 16px;
  line-height: 28px;
  color: var(--vp-c-text-1);
  text-align: center;
}

.group-title {
  padding: 20px 0;
  margin-bottom: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
}

.friends-list {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .friends-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .friends-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.friends-info-card {
  padding: 16px 20px;
  margin: 48px 0 0;
  border: solid 1px var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-1);
  transition: border-color .25s ease, box-shadow .25s ease;
  background-color: var(--vp-c-bg);
}

.info-title {
  display: flex;
  gap: 6px;
  align-items: center;
  margin: 16px 0 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.friends-comment {
  margin-top: 48px;
}
</style>
