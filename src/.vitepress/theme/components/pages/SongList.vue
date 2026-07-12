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
        <a
          v-for="(song, index) in songs"
          :key="song.hash"
          class="song-card"
          :href="`https://cn.bing.com/search?q=${encodeURIComponent(song.name)}%20site:y.qq.com%20OR%20site:music.163.com%20OR%20site:kugou.com%20OR%20site:kuwo.cn%20OR%20site:music.apple.com`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="song-index">{{ (page - 1) * PAGE_SIZE + index + 1 }}</span>
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
        </a>
      </div>
      <Pagination
        :currentPage="page"
        :totalPages="totalPages"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Pagination from '../Pagination.vue'

const API_BASE = import.meta.env.VITE_KUGOU_API
const COLLECTION_ID = import.meta.env.VITE_KUGOU_COLLECTION_ID
const PAGE_SIZE = 30

const songs = ref([])
const total = ref(0)
const page = ref(1)
const loading = ref(true)
const error = ref(false)

const totalPages = computed(() => Math.ceil(total.value / PAGE_SIZE))

async function fetchSongs(p) {
  loading.value = true
  error.value = false
  try {
    const url = `${API_BASE}/playlist/track/all?id=${COLLECTION_ID}&page=${p}&pagesize=${PAGE_SIZE}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`请求失败: ${res.status}`)
    const json = await res.json()
    songs.value = json.data.songs || []
    total.value = json.data.count || 0
    page.value = p
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

function changePage(p) {
  if (p < 1 || p > totalPages.value) return
  fetchSongs(p)
}

function getCover(song) {
  const url = song.trans_param?.union_cover || song.cover || ''
  return url.replace('{size}', '250')
}

function getTitle(song) {
  const name = song.name || ''
  const idx = name.indexOf(' - ')
  return idx !== -1 ? name.slice(idx + 3) : name
}

function getArtist(song) {
  if (song.singerinfo?.length) {
    return song.singerinfo.map((s) => s.name).join('、')
  }
  const name = song.name || ''
  const idx = name.indexOf(' - ')
  return idx !== -1 ? name.slice(0, idx) : '未知'
}

function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min}:${String(sec).padStart(2, '0')}`
}

function formatCollectTime(timestamp) {
  const date = new Date(timestamp * 1000)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

onMounted(() => fetchSongs(1))
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
  transition: color 0.25s ease;
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
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
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
