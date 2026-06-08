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
          <span class="meta-item" @click="starRepo">
            <Icon name="octicon:star-fill-16" size="0.8em" color="#E3B341" />
            {{ repoData.stargazers_count }}
          </span>
          <span v-if="repoData.license" class="meta-item" @click="viewLicense">
            <Icon name="lucide:scale" size="0.8em" />
            {{ repoData.license.spdx_id }}
          </span>
          <span class="meta-item">
            <Icon name="octicon:clock-16" size="0.8em" />
            创建于 {{ getRelativeTime(repoData.created_at) }}
          </span>
          <span class="meta-item">
            <Icon name="octicon:git-commit-16" size="0.8em" />
            更新于 {{ getRelativeTime(lastCommitAt) }}
          </span>
        </div>
        <span v-if="repoData.archived" class="archive-label">公共存档</span>
      </div>
    </div>
  </div>
</template>

<script>
const MIRROR_SOURCES = [
  'https://gh.dpik.top/',
  'https://ghfile.geekertao.top/',
  ''
]

export default {
  props: {
    repo: { type: String, required: true }
  },
  data() {
    return {
      repoData: null,
      lastCommitAt: null,
      loading: true,
      error: false,
      languageColors: {}
    }
  },
  async mounted() {
    try {
      this.loadLanguageColors()
      const [repoData, commits] = await Promise.all([
        this.fetchJsonWithMirrors(`https://api.github.com/repos/${this.repo}`),
        this.fetchJsonWithMirrors(`https://api.github.com/repos/${this.repo}/commits?per_page=1`)
      ])
      this.repoData = repoData
      this.lastCommitAt = commits[0]?.commit?.committer?.date || repoData.updated_at
    } catch (err) {
      this.error = true
    } finally {
      this.loading = false
    }
  },
  methods: {
    buildMirrorUrl(baseUrl, targetUrl) {
      return `${baseUrl.replace(/\/?$/, '/')}${targetUrl}`
    },

    async fetchJsonWithMirrors(targetUrl) {
      let lastError = null

      for (const mirror of MIRROR_SOURCES) {
        try {
          const requestUrl = this.buildMirrorUrl(mirror, targetUrl)
          const response = await fetch(requestUrl)
          if (!response.ok) {
            lastError = new Error(`请求失败: ${requestUrl} (${response.status})`)
            continue
          }

          return await response.json()
        } catch (error) {
          lastError = error
        }
      }

      throw lastError || new Error('请求失败')
    },
    async loadLanguageColors() {
      try {
        const data = await this.fetchJsonWithMirrors(
          'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
        )
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
  cursor: pointer;
  transition: color 0.3s ease;
}

.meta-item:hover {
  color: var(--vp-c-text-1);
}

.fas {
  font-size: 16px;
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
  transition: color var(--vp-t-color), border-color var(--vp-t-color);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .repo-info h3 {
    font-size: 18px;
  }

  .description {
    font-size: 14px;
  }
}
</style>
