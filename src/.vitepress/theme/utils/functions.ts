import site from '../config'

const pattern
    = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export const countDaysFrom = (startDate: string | number | Date) =>
  Math.floor(
    (Date.now() - new Date(startDate).setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
  )

export function countWord(data: string) {
  const m = data.match(pattern)
  let count = 0
  if (!m) {
    return 0
  }
  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length
    }
    else {
      count += 1
    }
  }
  return count
}

export function getCategoryDisplay(cat: string) {
  return site.categoryPathMap[cat] || cat.replaceAll('-', ' ')
}

export function formatDate(dateStr: string | undefined, style: 'full' | 'short' = 'full') {
  if (!dateStr) return ''
  const date = dateStr.split(' ')[0]
  return style === 'short' ? date.slice(5) : date
}