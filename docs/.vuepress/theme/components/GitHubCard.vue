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
      </div>
      
      <div class="stats">
        <div class="stat-item" @click="starRepo">
          <Icon name="octicon:star-fill-16" size="0.8em" color="#E3B341" />
          <span>星标 {{ repoData.stargazers_count }}</span>
        </div>
        <div class="stat-item" @click="issueRepo">
          <Icon name="octicon:issue-opened-16" size="0.8em" color="#3FB950" />
          <span>议题 {{ repoData.open_issues_count }}</span>
        </div>
        <div class="stat-item" @click="watchRepo">
          <Icon name="octicon:eye-16" size="0.8em" color="#3FB950" />
          <span>关注 {{ repoData.subscribers_count }}</span>
        </div>
        <div class="stat-item" v-if="repoData.license" @click="viewLicense">
          <Icon name="lucide:scale" size="0.8em" />
          <span>{{ repoData.license.spdx_id }}</span>
        </div>
      </div>
      
      <div class="footer">
        <span class="language" v-if="repoData.language">
          <span class="language-color" :style="{ backgroundColor: getLanguageColor(repoData.language) }"></span>
          {{ repoData.language }}
        </span>
        <div class="dates" :class="{ 'no-language': !repoData.language }">
          <span class="created">
            <Icon name="octicon:clock-16" size="0.8em" />
            创建于：{{ formatDate(repoData.created_at) }}
          </span>
          <span class="updated">
            <Icon name="material-symbols:update-rounded" size="1em" />
            更新于：{{ formatDate(repoData.updated_at) }}
          </span>
          <span class="branch">
            <Icon name="octicon:git-branch-16" size="0.8em" />
            默认分支：{{ repoData.default_branch }}
          </span>
        </div>
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
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    },
    getLanguageColor(language) {
      return this.languageColors[language] || '#ccc'
    },
    starRepo() {
      // 跳转到GitHub星标页面
      window.open(`${this.repoData.html_url}/stargazers`, '_blank')
    },
    issueRepo() {
      // 跳转到GitHub议题页面
      window.open(`${this.repoData.html_url}/issues`, '_blank')
    },
    watchRepo() {
      // 跳转到GitHub关注页面
      window.open(`${this.repoData.html_url}/watchers`, '_blank')
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
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  background-color: transparent;
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
  margin-bottom: 12px;
  align-items: center;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid var(--vp-c-brand-light);
  transition: transform 0.3s ease;
}

.github-card:hover .avatar {
  transform: scale(1.05);
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

.stats {
  display: flex;
  justify-content: space-between;
  margin: 16px 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: var(--vp-c-text-2);
  padding: 6px 12px;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-item:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.github-card:hover .stat-item {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.stat-item i {
  margin-right: 4px;
  color: var(--vp-c-brand);
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 16px;
  margin-top: 16px;
}

.language {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
}

.dates {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dates.no-language {
  margin-left: auto;
}

.branch {
  display: flex;
  align-items: center;
  gap: 4px;
}

.language-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 4px;
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
  
  .avatar {
    width: 50px;
    height: 50px;
  }
  
  .repo-info h3 {
    font-size: 18px;
  }
  
  .description {
    font-size: 14px;
  }
  
  .stats {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
  }

  .stat-item {
    flex: 0 0 auto;
    width: auto;
  }
  
  .footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .dates {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style>
