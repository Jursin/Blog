<template>
  <div class="github-card" :class="{ loading, error }">
    <div v-if="loading" class="loading-spinner">
      <Icon name="line-md:loading-twotone-loop" />
    </div>
    <div v-else-if="error" class="error-message">
      <Icon name="material-symbols:error-outline" /> 加载失败
    </div>
    <div v-else class="card-content">
      <div class="header">
        <img :src="repoData.owner.avatar_url" class="avatar" alt="avatar">
        <div class="repo-info">
          <h3>
            <a :href="repoData.html_url" target="_blank">
              {{ repoData.full_name }}
            </a>
          </h3>
          <p class="description">{{ repoData.description }}</p>
        </div>
      </div>

      <div class="meta-info">
        <div class="meta-items">
          <span v-if="repoData.language" class="language">
            <span class="language-color" :style="{ backgroundColor: getLanguageColor(repoData.language) }"></span>
            {{ repoData.language }}
          </span>
          <span class="meta-item">
            <Icon name="octicon:star-fill-16" color="#E3B341" />
            {{ repoData.stargazers_count }}
          </span>
          <span v-if="repoData.license" class="meta-item">
            <Icon name="lucide:scale" />
            {{ repoData.license.spdx_id }}
          </span>
            <span class="meta-item">
              <Icon name="octicon:clock-16" />
              创建于 {{ getRelativeTime(repoData.created_at) }}
            </span>
            <span class="meta-item">
              <Icon name="octicon:git-commit-16" />
              更新于 {{ getRelativeTime(lastCommitAt ?? '') }}
            </span>
        </div>
        <span v-if="repoData.archived" class="archive-label">公共存档</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ''

const props = defineProps({
  repo: String
})

const repoData = ref(null)
const lastCommitAt = ref(null)
const loading = ref(true)
const error = ref(false)
const languageColors = ref({})

async function githubFetch(url) {
  const headers = { Accept: 'application/vnd.github.v3+json' }
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`请求失败: ${url} (${res.status})`)
  return res.json()
}

async function loadLanguageColors() {
  const SOURCES = ['https://gh.dpik.top/', 'https://github.dpik.top/', '']
  const COLOR_URL = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
  for (const mirror of SOURCES) {
    try {
      const res = await fetch(mirror + COLOR_URL)
      if (!res.ok) throw Error()
      const data = await res.json()
      const map = {}
      for (const [lang, info] of Object.entries(data)) {
        const entry = info
        if (entry?.color) map[lang] = entry.color
      }
      languageColors.value = map
      return
    } catch (_) { /* try next */ }
  }
  console.warn('加载语言颜色失败')
}

function getRelativeTime(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffMonths / 12)

  if (diffSecs < 60) return '1分钟前'
  if (diffMins < 60) return `${diffMins}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (diffDays < 30) return `${diffDays}天前`
  if (diffMonths < 12) return `${diffMonths}个月前`

  const remainingMonths = diffMonths % 12
  if (remainingMonths === 0) {
    return `${diffYears}年前`
  }
  return `${diffYears}年${remainingMonths}个月前`
}

function getLanguageColor(language) {
  return languageColors.value[language] || '#ccc'
}

onMounted(async () => {
  try {
    loadLanguageColors()
    const [repoResult, commits] = await Promise.all([
      githubFetch(`https://api.github.com/repos/${props.repo}`),
      githubFetch(`https://api.github.com/repos/${props.repo}/commits?per_page=1`)
    ])
    repoData.value = repoResult
    lastCommitAt.value = commits[0]?.commit?.committer?.date || repoResult.updated_at
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.github-card {
  --gc-transition: 0.25s ease;
  --gc-transition-fast: 0.15s ease;

  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 14px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color var(--gc-transition), box-shadow var(--gc-transition), background-color var(--gc-transition);
  width: 100%;
}

.github-card:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-2);
  box-shadow: var(--vp-shadow-2);
}

.loading-spinner, .error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 12px;
}

.error-message {
  color: var(--vp-c-danger-1);
}

.header {
  display: flex;
  margin-bottom: 6px;
  align-items: flex-start;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  margin: 0 12px 0 0;
  transition: transform var(--gc-transition);
  flex-shrink: 0;
}

.github-card:hover .avatar {
  transform: scale(1.05);
}

.repo-info {
  flex: 1;
  min-width: 0;
}

.repo-info h3 {
  margin: 0;
  font-size: 20px;
  line-height: 1;
}

.repo-info h3 a {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color var(--gc-transition-fast);
}

.repo-info h3 a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.description {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.5;
}

.language {
  font-size: 14px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
}

.language-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--vp-c-text-2);
  padding: 6px;
  border-top: 1px solid var(--vp-c-divider);
}

.meta-items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px 8px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.archive-label {
  margin-left: auto;
  border: 1px solid #9a6700;
  border-radius: 625rem;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0 0.375rem;
  white-space: nowrap;
  line-height: 18px;
  color: #9a6700;
  vertical-align: middle;
  transition: color var(--gc-transition), border-color var(--gc-transition);
}

@media (max-width: 768px) {
  .repo-info h3 {
    font-size: 18px;
  }

  .description {
    font-size: 14px;
  }
}
</style>
