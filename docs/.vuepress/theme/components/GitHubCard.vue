<template>
  <div class="github-card" :class="{ loading, error }">
    <div v-if="loading" class="loading-spinner">
      <Icon name="fa:spinner" />
    </div>
    <div v-else-if="error" class="error-message">
      <Icon name="fa-exclamation-triangle" /> {{ error }}
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
        <span v-if="repoData.language" class="language">
          <span class="language-color" :style="{ backgroundColor: getLanguageColor(repoData.language) }"></span>
          {{ repoData.language }}
        </span>
      </div>
      
      <div class="meta-info">
        <span class="meta-item" @click="starRepo">
          <Icon name="octicon:star-fill-16" size="0.8em" color="#E3B341" />
          {{ repoData.stargazers_count }}
        </span><span v-if="repoData.license" class="meta-item" @click="viewLicense">
          <Icon name="lucide:scale" size="0.8em" />
          {{ repoData.license.spdx_id }}
        </span><span class="meta-item">
          <Icon name="octicon:clock-16" size="0.8em" />
          创建于 {{ getRelativeTime(repoData.created_at) }}
        </span><span class="meta-item">
          <Icon name="octicon:issue-reopened-16" size="0.8em" />
          更新于 {{ getRelativeTime(repoData.updated_at) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    owner: { type: String, required: true },
    repo: { type: String, required: true }
  },
  data() {
    return {
      repoData: null,
      loading: true,
      error: null,
      languageColors: {}
    }
  },
  async mounted() {
    try {
      this.loadLanguageColors()
      const response = await fetch(
        `https://api.github.com/repos/${this.owner}/${this.repo}`
      )
      if (!response.ok) throw new Error('Failed to fetch repository data')
      this.repoData = await response.json()
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  },
  methods: {
    async loadLanguageColors() {
      const LANGUAGE_COLOR_URL = 'https://gh.llkk.cc/https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
      try {
        const res = await fetch(LANGUAGE_COLOR_URL)
        if (!res.ok) throw new Error(`语言颜色请求失败 ${res.status}`)
        const data = await res.json()
        const map = {}
        for (const [lang, info] of Object.entries(data)) {
          if (info && typeof info === 'object' && info.color) {
            map[lang] = info.color
          }
        }
        this.languageColors = map
      } catch (e) {
        console.warn('加载语言颜色失败，使用默认颜色:', e)
        this.languageColors = {}
      }
    },
    getRelativeTime(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
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
    },
    getLanguageColor(language) {
      return this.languageColors[language] || '#ccc'
    },
    starRepo() {
      // 跳转到GitHub星标页面
      window.open(`${this.repoData.html_url}/stargazers`, '_blank')
    },
    viewLicense() {
      // 跳转到许可证文件
      if (this.repoData.license && this.repoData.license.key) {
        window.open(`${this.repoData.html_url}/blob/master/LICENSE`, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.github-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 14px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color var(--vp-t-color), box-shadow var(--vp-t-color), background-color var(--vp-t-color);
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
  color: var(--vp-c-red);
}

.header {
  display: flex;
  margin-bottom: 6px;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid var(--vp-c-brand-light);
  transition: transform 0.3s ease;
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
}

.repo-info h3 a {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.3s ease;
}

.repo-info h3 a:hover {
  color: var(--vp-c-brand-light);
  text-decoration: underline;
}

.description {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
}

.language {
  position: absolute;
  top: 0;
  right: 0;
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
  font-size: 14px;
  color: var(--vp-c-text-2);
  padding: 6px;
  border-top: 1px solid var(--vp-c-divider);
}

.meta-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;
}

.meta-item:not(:last-child)::after {
  content: '·';
  margin: 0 2px;
}

.meta-item:hover {
  color: var(--vp-c-text-1);
}

.fas {
  font-size: 16px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .github-card {
    border-radius: 10px;
    padding: 12px;
  }

  .header {
    padding-top: 24px;
  }

  .repo-info h3 {
    font-size: 18px;
  }

  .description {
    font-size: 14px;
  }
}
</style>
