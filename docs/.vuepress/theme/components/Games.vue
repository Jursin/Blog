<template>
  <div class="games">
    <h2 class="title">游戏</h2>
    <div v-if="loading" class="loading">
      <Icon name="line-md:loading-twotone-loop" size="2rem" />
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error">
      <Icon name="fa-exclamation-triangle" size="2rem" />
      <p>加载失败，请稍后重试</p>
    </div>
    <div v-else class="games-grid">
      <div
        v-for="game in sortedGames"
        :key="game.appid"
        class="game-card"
      >
        <div class="game-cover">
          <img
            :src="`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`"
            :alt="game.name"
            loading="lazy"
          />
          <div v-if="game.achievements" class="achievement-badge">
            <Icon name="octicon:check-circle-16" size="0.75em" />
            {{ game.achievements.unlocked }}/{{ game.achievements.total }}
          </div>
        </div>
        <a
          class="game-info"
          :href="`https://store.steampowered.com/app/${game.appid}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 class="game-name">{{ game.name }}</h3>
          <div class="game-meta">
            <span class="meta-item">
              <Icon name="octicon:clock-16" size="0.85em" />
              总时长 {{ formatPlaytime(game.playtime_forever) }}
            </span>
            <span v-if="game.rtime_last_played" class="meta-item">
              <Icon name="octicon:history-16" size="0.85em" />
              {{ formatLastPlayed(game.rtime_last_played) }}
            </span>
          </div>
          <div v-if="game.achievements" class="achievement-bar">
            <div
              class="achievement-progress"
              :style="{ width: getAchievementPercent(game.achievements) + '%' }"
            ></div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const PROXY = import.meta.env.VITE_STEAM_PROXY

export default {
  name: 'Games',
  data() {
    return {
      games: [],
      loading: true,
      error: false
    }
  },
  computed: {
    sortedGames() {
      return [...this.games].sort((a, b) => b.playtime_forever - a.playtime_forever)
    }
  },
  async mounted() {
    try {
      const url = `${PROXY}/IPlayerService/GetOwnedGames/v1/?format=json&include_appinfo=1&include_played_free_games=1`
      const data = await this.fetchSteamApi(url)
      const gamesList = data.response.games || []
      this.games = gamesList
      this.fetchAchievements()
    } catch {
      this.error = true
    } finally {
      this.loading = false
    }
  },
  methods: {
    async fetchAchievements() {
      const promises = this.games
        .filter(game => game.has_community_visible_stats)
        .map(async (game) => {
        try {
          const url = `${PROXY}/ISteamUserStats/GetPlayerAchievements/v1/?appid=${game.appid}`
          const data = await this.fetchSteamApi(url)
          const stats = data.playerstats
          if (stats && stats.success && stats.achievements) {
            const total = stats.achievements.length
            const unlocked = stats.achievements.filter(a => a.achieved === 1).length
            game.achievements = { total, unlocked }
          }
        } catch {
          // 部分游戏无成就数据，静默跳过
        }
      })
      await Promise.allSettled(promises)
    },
    formatPlaytime(minutes) {
      if (minutes < 60) return `${minutes} 分钟`
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      if (hours < 24) {
        return mins > 0 ? `${hours} 小时 ${mins} 分钟` : `${hours} 小时`
      }
      const days = Math.floor(hours / 24)
      const remainHours = hours % 24
      return remainHours > 0 ? `${days} 天 ${remainHours} 小时` : `${days} 天`
    },
    formatLastPlayed(timestamp) {
      const diffMs = Date.now() - timestamp * 1000
      const diffDays = Math.floor(diffMs / 86400000)
      if (diffDays === 0) return '今天玩过'
      if (diffDays === 1) return '昨天玩过'
      if (diffDays < 30) return `${diffDays} 天前玩过`
      const diffMonths = Math.floor(diffDays / 30)
      if (diffMonths < 12) return `${diffMonths} 个月前玩过`
      const diffYears = Math.floor(diffMonths / 12)
      const remainMonths = diffMonths % 12
      return remainMonths > 0 ? `${diffYears} 年 ${remainMonths} 个月前玩过` : `${diffYears} 年前玩过`
    },
    getAchievementPercent({ unlocked, total }) {
      return total ? Math.round((unlocked / total) * 100) : 0
    },
    async fetchSteamApi(url) {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`请求失败: ${res.status}`)
      return res.json()
    }
  }
}
</script>

<style scoped>
.games {
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
}

.title {
  margin: 0 0 24px 0 !important;
  padding: 0 !important;
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-align: center;
  outline: none;
  transition: color var(--vp-t-color);
}

.loading,
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--vp-c-text-2);
  gap: 12px;
}

.error {
  color: var(--vp-c-red);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.game-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  transition: border-color var(--vp-t-color), box-shadow var(--vp-t-color), background-color var(--vp-t-color);
}

.game-card:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-2);
  box-shadow: var(--vp-shadow-2);
}

.game-cover {
  position: relative;
  overflow: hidden;
  aspect-ratio: 460 / 215;
}

.game-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.game-card:hover .game-cover img {
  transform: scale(1.05);
}

.achievement-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
}

.game-info {
  display: block;
  padding: 14px;
  text-decoration: none;
  color: inherit;
}

.game-name {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.game-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.achievement-bar {
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.achievement-progress {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.6s ease;
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>
