<script setup>
import { ref, watch, onMounted } from 'vue'

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const GITHUB_USERNAME = 'Jursin'
const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const LEVEL_MAP = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 }
const API_URL = 'https://api.github.com/graphql'

const root = ref(null)
const selectedYear = ref(new Date().getFullYear())
const currentYear = ref(new Date().getFullYear())
const minYear = ref(new Date().getFullYear())
const weeks = ref([])
const monthLabels = ref([])
const totalContributions = ref(0)
const loading = ref(true)
const error = ref(false)
const tooltip = ref({ visible: false, x: 0, y: 0, text: '', date: '' })

watch(selectedYear, () => fetchContributions())

async function githubGraphQL(query, variables) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `bearer ${GITHUB_TOKEN}` },
    body: JSON.stringify({ query, variables })
  })
  if (!res.ok) throw new Error(`请求失败: ${res.status}`)
  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0].message)
  return data
}

async function fetchUserJoinYear() {
  try {
    const data = await githubGraphQL('query($l:String!){user(login:$l){createdAt}}', { l: GITHUB_USERNAME })
    minYear.value = new Date(data.user.createdAt).getFullYear()
  } catch {}
}

async function fetchContributions() {
  loading.value = true
  error.value = false
  try {
    const y = selectedYear.value
    const data = await githubGraphQL(`
      query($l:String!,$f:DateTime!,$t:DateTime!){
        user(login:$l){
          contributionsCollection(from:$f,to:$t){
            contributionCalendar{
              totalContributions
              weeks{contributionDays{contributionCount date contributionLevel weekday}}
            }
          }
        }
      }`, { l: GITHUB_USERNAME, f: `${y}-01-01T00:00:00Z`, t: `${y}-12-31T23:59:59Z` })
    const calendar = data.user.contributionsCollection.contributionCalendar
    totalContributions.value = calendar.totalContributions
    processWeeks(calendar.weeks)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

function processWeeks(rawWeeks) {
  const days = []
  for (let wi = 0; wi < rawWeeks.length; wi++) {
    for (const d of rawWeeks[wi].contributionDays) {
      const col = d.weekday === 0 ? wi - 1 : wi
      if (col >= 0) {
        days.push({
          col,
          row: d.weekday === 0 ? 6 : d.weekday - 1,
          date: d.date,
          count: d.contributionCount,
          level: LEVEL_MAP[d.contributionLevel] || 0
        })
      }
    }
  }

  const w = Array.from({ length: Math.max(...days.map((d) => d.col)) + 1 }, () => new Array(7).fill(null))
  days.forEach((d) => { w[d.col][d.row] = d })

  const monthSet = new Set()
  const ml = []
  w.forEach((week, wi) => {
    const day = week.find(Boolean)
    if (!day) return
    const key = day.date.slice(0, 7)
    if (!monthSet.has(key)) {
      monthSet.add(key)
      ml.push({ name: MONTH_NAMES[+day.date.slice(5, 7) - 1], weekIndex: wi })
    }
  })
  ml.forEach((m, i) => { m.weekIndex = i === 0 ? 0 : Math.max(0, m.weekIndex - 1) })

  weeks.value = w
  monthLabels.value = ml
}

function prevYear() { if (selectedYear.value > minYear.value) selectedYear.value-- }
function nextYear() { if (selectedYear.value < currentYear.value) selectedYear.value++ }

function showTooltip(event, day) {
  if (!day) return
  const rect = event.target.getBoundingClientRect()
  const container = root.value.getBoundingClientRect()
  const m = +day.date.slice(5, 7)
  const dd = +day.date.slice(8, 10)
  tooltip.value = {
    visible: true,
    x: rect.left - container.left + rect.width / 2,
    y: rect.top - container.top - 36,
    text: day.count ? `${m}月${dd}日，贡献 ${day.count} 次` : `${m}月${dd}日，没有贡献`,
    date: ''
  }
}

onMounted(async () => {
  await fetchUserJoinYear()
  await fetchContributions()
})
</script>

<template>
  <div ref="root" class="contribution-graph">
    <div class="graph-header">
      <h3 class="graph-title">{{ selectedYear }} 年，贡献 {{ totalContributions }} 次</h3>
      <div class="year-nav">
        <button class="year-btn" @click="prevYear" :disabled="selectedYear <= minYear">
          <Icon name="octicon:chevron-left-16" size="1em" />
        </button>
        <span class="year-label">{{ selectedYear }}</span>
        <button class="year-btn" @click="nextYear" :disabled="selectedYear >= currentYear">
          <Icon name="octicon:chevron-right-16" size="1em" />
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <Icon name="line-md:loading-twotone-loop" size="2rem" />
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error">
      <Icon name="material-symbols:error-outline" />
      <span>加载失败</span>
    </div>
    <div v-else class="graph-body">
      <div class="graph-scroll">
        <div
          class="graph-grid"
          :style="{
            gridTemplateColumns: `auto repeat(${weeks.length}, 18px)`,
            gridTemplateRows: `auto repeat(7, 18px)`,
            gap: '5px'
          }"
        >
          <template v-for="m in monthLabels" :key="'m' + m.weekIndex">
            <div class="month-label" :style="{ gridColumn: m.weekIndex + 2, gridRow: 1 }">
              {{ m.name }}
            </div>
          </template>

          <div class="weekday-label" style="grid-column: 1; grid-row: 2">周一</div>
          <div class="weekday-label" style="grid-column: 1; grid-row: 4">周三</div>
          <div class="weekday-label" style="grid-column: 1; grid-row: 6">周五</div>

          <template v-for="(week, wi) in weeks" :key="'w' + wi">
            <div
              v-for="(day, di) in week"
              :key="wi + '-' + di"
              class="day-cell"
              :class="day ? 'level-' + day.level : 'level-0'"
              :style="{ gridColumn: wi + 2, gridRow: di + 2 }"
              @mouseenter="showTooltip($event, day)"
              @mouseleave="tooltip.visible = false"
            />
          </template>
        </div>
      </div>

      <div class="legend">
        <span class="legend-label">更少</span>
        <div v-for="n in 5" :key="n" class="legend-cell" :class="'level-' + (n - 1)" />
        <span class="legend-label">更多</span>
      </div>
    </div>

    <div
      v-if="tooltip.visible"
      class="tooltip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <strong>{{ tooltip.text }}</strong>
      {{ tooltip.date }}
    </div>
  </div>
</template>

<style scoped>
.contribution-graph {
  position: relative;
  width: 100%;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.graph-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.graph-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.year-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.year-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.25s ease;
}

.year-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.year-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.year-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 40px;
  text-align: center;
}

.loading,
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--vp-c-text-2);
  gap: 8px;
}

.error {
  color: var(--vp-c-red);
}

.graph-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.graph-scroll {
  overflow-x: auto;
  width: 100%;
  display: flex;
  justify-content: safe center;
}

.graph-grid {
  display: grid;
  min-width: max-content;
}

.month-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  align-self: end;
  padding-bottom: 2px;
}

.weekday-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 6px;
}

.day-cell {
  border-radius: 3px;
  outline: 1px solid rgba(27, 31, 35, 0.06);
  outline-offset: -1px;
  cursor: pointer;
  transition: outline-color 0.1s;
}

:root.dark .day-cell {
  outline-color: rgba(255, 255, 255, 0.06);
}

.day-cell:hover {
  outline: 2px solid var(--vp-c-text-3);
}

.level-0 { background-color: #ebedf0; }
.level-1 { background-color: #9be9a8; }
.level-2 { background-color: #40c463; }
.level-3 { background-color: #30a14e; }
.level-4 { background-color: #216e39; }

:root.dark .level-0 { background-color: #161b22; }
:root.dark .level-1 { background-color: #0e4429; }
:root.dark .level-2 { background-color: #006d32; }
:root.dark .level-3 { background-color: #26a641; }
:root.dark .level-4 { background-color: #39d353; }

.legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 8px;
}

.legend-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 0 4px;
}

.legend-cell {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  outline: 1px solid rgba(27, 31, 35, 0.06);
  outline-offset: -1px;
}

:root.dark .legend-cell {
  outline-color: rgba(255, 255, 255, 0.06);
}

.tooltip {
  position: absolute;
  z-index: 100;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  pointer-events: none;
  transform: translateX(-50%);
  box-shadow: var(--vp-shadow-2);
}

.tooltip strong {
  display: block;
  margin-bottom: 2px;
}

@media (max-width: 768px) {
  .graph-title, .year-label {
    font-size: 15px;
  }
}
</style>