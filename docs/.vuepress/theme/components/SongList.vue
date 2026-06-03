<template>
  <div class="music">
    <h2 class="title">歌单</h2>
    <div v-if="loading" class="loading">
      <Icon name="line-md:loading-twotone-loop" size="2rem" />
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error">
      <Icon name="fa-exclamation-triangle" size="2rem" />
      <p>加载失败，请稍后重试</p>
    </div>
    <div v-else>
      <div class="song-grid">
        <div
          v-for="(song, index) in songs"
          :key="song.hash"
          class="song-card"
        >
          <span class="song-index">{{ (page - 1) * pageSize + index + 1 }}</span>
          <img
            :src="getCover(song)"
            :alt="song.name"
            class="song-cover"
            loading="lazy"
          >
          <div class="song-info">
            <span class="song-name">{{ getTitle(song) }}</span>
            <span class="song-artist">{{ getArtist(song) }}</span>
          </div>
          <div class="song-meta">
            <span class="meta-item">
              <Icon name="octicon:clock-16" size="0.75em" />
              {{ formatDuration(song.timelen) }}
            </span>
            <span class="meta-item">
              <Icon name="octicon:heart-16" size="0.75em" />
              {{ formatCollectTime(song.collecttime) }}
            </span>
          </div>
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
const API_BASE = import.meta.env.VITE_KUGOU_API
const COLLECTION_ID = import.meta.env.VITE_KUGOU_COLLECTION_ID
const PAGE_SIZE = 30

export default {
  name: 'Music',
  data() {
    return {
      songs: [],
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
    await this.fetchSongs(1)
  },
  methods: {
    async fetchSongs(page) {
      this.loading = true
      this.error = false
      try {
        const url = `${API_BASE}/playlist/track/all?id=${COLLECTION_ID}&page=${page}&pagesize=${this.pageSize}`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`请求失败: ${res.status}`)
        const json = await res.json()
        this.songs = json.data.songs || []
        this.total = json.data.count || 0
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
      this.fetchSongs(page)
    },
    jumpToPage() {
      const p = Math.floor(this.inputPage)
      if (p >= 1 && p <= this.totalPages && p !== this.page) {
        this.fetchSongs(p)
      } else {
        this.inputPage = this.page
      }
    },
    getCover(song) {
      const url = song.trans_param?.union_cover || song.cover || ''
      return url.replace('{size}', '250')
    },
    getTitle(song) {
      const name = song.name || ''
      const idx = name.indexOf(' - ')
      return idx !== -1 ? name.slice(idx + 3) : name
    },
    getArtist(song) {
      if (song.singerinfo?.length) {
        return song.singerinfo.map(s => s.name).join('、')
      }
      const name = song.name || ''
      const idx = name.indexOf(' - ')
      return idx !== -1 ? name.slice(0, idx) : '未知'
    },
    formatDuration(ms) {
      const totalSec = Math.floor(ms / 1000)
      const min = Math.floor(totalSec / 60)
      const sec = totalSec % 60
      return `${min}:${String(sec).padStart(2, '0')}`
    },
    formatCollectTime(timestamp) {
      const date = new Date(timestamp * 1000)
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    }
  }
}
</script>

<style scoped>
.music {
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

.song-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 12px;
}

.song-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  transition: border-color var(--vp-t-color), box-shadow var(--vp-t-color), background-color var(--vp-t-color);
}

.song-card:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-2);
  box-shadow: var(--vp-shadow-2);
}

.song-index {
  width: 26px;
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.song-cover {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.song-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.song-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-artist {
  font-size: 14px;
  color: var(--vp-c-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
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
  .song-grid {
    grid-template-columns: 1fr;
  }

  .song-index {
    display: none;
  }

  .song-card {
    gap: 10px;
    padding: 8px 12px;
  }
}
</style>
