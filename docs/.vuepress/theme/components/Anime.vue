<template>
  <div class="anime">
    <h2 class="title">追番</h2>
    <div v-if="loading" class="loading">
      <Icon name="line-md:loading-twotone-loop" size="2rem" />
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error">
      <Icon name="fa-exclamation-triangle" size="2rem" />
      <p>加载失败，请稍后重试</p>
    </div>
    <div v-else class="anime-grid">
      <div
        v-for="item in animeList"
        :key="item.season_id"
        class="anime-card"
      >
        <div class="anime-cover">
          <img
            :src="fixHttps(item.cover)"
            :alt="item.title"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
          <span
            v-if="item.badge_info"
            class="badge"
            :style="{ backgroundColor: item.badge_info.bg_color }"
          >
            {{ item.badge_info.text }}
          </span>
          <span
            v-if="item.follow_status === 3"
            class="follow-status finished"
          >
            <Icon name="octicon:check-circle-fill-16" size="0.75em" />
            已看完
          </span>
          <span v-else-if="item.follow_status === 2" class="follow-status watching">
            <Icon name="octicon:eye-16" size="0.75em" />
            在看
          </span>
        </div>
        <a
          class="anime-info"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 class="anime-name">{{ item.title }}</h3>
          <div class="anime-meta">
            <span class="meta-item">
              <Icon name="octicon:play-16" size="0.85em" />
              {{ item.season_type_name }}
            </span>
            <span v-if="item.areas?.length" class="meta-item">
              <Icon name="octicon:globe-16" size="0.85em" />
              {{ item.areas.map(a => a.name).join(' / ') }}
            </span>
            <span v-if="item.new_ep" class="meta-item">
              <Icon name="octicon:stack-16" size="0.85em" />
              {{ item.new_ep.index_show }}
            </span>
            <span v-if="item.publish?.release_date_show" class="meta-item">
              <Icon name="octicon:calendar-16" size="0.85em" />
              {{ item.publish.release_date_show }}
            </span>
          </div>
          <p v-if="item.evaluate" class="anime-desc">{{ item.evaluate }}</p>
          <div v-if="item.rating" class="anime-rating">
            <span class="score">{{ item.rating.score.toFixed(1) }}</span>
            <span class="rating-count">{{ formatCount(item.rating.count) }}人评分</span>
          </div>
          <div v-if="item.styles?.length" class="anime-tags">
            <span v-for="tag in item.styles" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div v-if="item.renewal_time" class="anime-schedule">
            <Icon name="octicon:sync-16" size="0.85em" />
            {{ item.renewal_time }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const API_BASE = import.meta.env.VITE_BILIBILI_API

export default {
  name: 'Anime',
  data() {
    return {
      animeList: [],
      loading: true,
      error: false
    }
  },
  async mounted() {
    try {
      const url = `${API_BASE}/x/space/bangumi/follow/list?vmid=1575907920&type=1&pn=1&ps=15`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`请求失败: ${res.status}`)
      const json = await res.json()
      if (json.code !== 0) throw new Error(json.message)
      this.animeList = json.data.list || []
    } catch {
      this.error = true
    } finally {
      this.loading = false
    }
  },
  methods: {
    fixHttps(url) {
      return url ? url.replace(/^http:\/\//, 'https://') : ''
    },
    formatCount(count) {
      if (count >= 10000) {
        return (count / 10000).toFixed(1) + '万'
      }
      return count.toLocaleString()
    }
  }
}
</script>

<style scoped>
.anime {
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

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.anime-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  transition: border-color var(--vp-t-color), box-shadow var(--vp-t-color), background-color var(--vp-t-color);
}

.anime-card:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-2);
  box-shadow: var(--vp-shadow-2);
}

.anime-cover {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
}

.anime-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.anime-card:hover .anime-cover img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 8px;
  left: 8px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  line-height: 1.5;
}

.follow-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
}

.follow-status.watching {
  background: rgba(0, 180, 255, 0.85);
  color: #fff;
}

.follow-status.finished {
  background: rgba(0, 180, 120, 0.85);
  color: #fff;
}

.anime-info {
  display: block;
  padding: 14px;
  text-decoration: none;
  color: inherit;
}

.anime-name {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.anime-meta {
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

.anime-desc {
  margin: 0 0 10px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.anime-rating {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 10px;
}

.score {
  font-size: 20px;
  font-weight: 700;
  color: #ffb400;
}

.rating-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.anime-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  transition: background-color var(--vp-t-color), color var(--vp-t-color);
}

.anime-schedule {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

@media (max-width: 768px) {
  .anime-grid {
    grid-template-columns: 1fr;
  }
}
</style>
