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
    <div v-else>
      <div class="anime-grid">
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
            <div v-if="item.rating" class="anime-rating">
              <span class="score">{{ item.rating.score.toFixed(1) }}</span>
              <span class="rating-count">{{ formatCount(item.rating.count) }}人评分</span>
            </div>
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
            <div v-if="item.styles?.length" class="anime-tags">
              <span v-for="tag in item.styles" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </a>
        </div>
      </div>
      <div class="pagination">
        <button
          class="page-btn"
          :disabled="page <= 1"
          @click="changePage(page - 1)"
        >
          <Icon name="mingcute:left-fill" />
        </button>
        <div class="page-jump">
          <input
            v-model.number="inputPage"
            type="number"
            :min="1"
            :max="totalPages"
            class="page-input"
            @keydown.enter="jumpToPage"
            @blur="jumpToPage"
          >
          <span class="page-sep">/</span>
          <span class="page-total">{{ totalPages }}</span>
        </div>
        <button
          class="page-btn"
          :disabled="page >= totalPages"
          @click="changePage(page + 1)"
        >
          <Icon name="mingcute:right-fill" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const API_BASE = import.meta.env.VITE_BILIBILI_API
const USER_ID = import.meta.env.VITE_BILIBILI_USER_ID
const PAGE_SIZE = 12

export default {
  name: 'Anime',
  data() {
    return {
      animeList: [],
      total: 0,
      page: 1,
      pageSize: PAGE_SIZE,
      inputPage: 1,
      loading: true,
      error: false
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  async mounted() {
    await this.fetchAnime(1)
  },
  methods: {
    async fetchAnime(page) {
      this.loading = true
      this.error = false
      try {
        const url = `${API_BASE}/x/space/bangumi/follow/list?vmid=${USER_ID}&type=1&pn=${page}&ps=${this.pageSize}`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`请求失败: ${res.status}`)
        const json = await res.json()
        if (json.code !== 0) throw new Error(json.message)
        this.animeList = json.data.list || []
        this.total = json.data.total || 0
        this.page = page
        this.inputPage = page
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.fetchAnime(page)
    },
    jumpToPage() {
      const p = Math.floor(this.inputPage)
      if (p >= 1 && p <= this.totalPages && p !== this.page) {
        this.fetchAnime(p)
      } else {
        this.inputPage = this.page
      }
    },
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
  margin: 0 0 40px 0 !important;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

.anime-rating {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 8px;
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
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.anime-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 28px 0 8px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all var(--vp-t-color);
}

.page-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-jump {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.page-input {
  width: 48px;
  height: 32px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  outline: none;
  transition: border-color var(--vp-t-color);
  appearance: textfield;
  -moz-appearance: textfield;
}

.page-input::-webkit-inner-spin-button,
.page-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.page-input:focus {
  border-color: var(--vp-c-brand-1);
}

.page-sep {
  color: var(--vp-c-text-3);
}

.page-total {
  font-variant-numeric: tabular-nums;
}

@media (max-width: 768px) {
  .anime-grid {
    grid-template-columns: 1fr;
  }
}
</style>
