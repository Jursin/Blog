import type { Post } from '../posts.data'

export interface GroupData {
  [key: string]: Post[]
}

export interface GroupResult {
  tabs: {
    category: string[]
    tag: string[]
    archive: string[]
  }
  posts: {
    category: GroupData
    tag: GroupData
    archive: GroupData
  }
}

export const useGroup = (posts: Post[]): GroupResult => {
  const groupPosts = { category: {} as GroupData, tag: {} as GroupData, archive: {} as GroupData }
  const tabs = { category: [] as string[], tag: [] as string[], archive: [] as string[] }

  posts.forEach((post) => {
    const category = post.category
    const tags = post.tags || []
    const year = post.createTime ? new Date(post.createTime).getFullYear() : undefined

    if (category) addToData(groupPosts.category, category, post)
    tags.forEach((tag) => addToData(groupPosts.tag, tag, post))
    if (year != null) addToData(groupPosts.archive, String(year), post)
  })

  tabs.category = Object.keys(groupPosts.category).sort((a, b) => {
    const countDiff = groupPosts.category[b].length - groupPosts.category[a].length
    if (countDiff !== 0) return countDiff
    return a.localeCompare(b, 'zh-CN')
  })
  tabs.tag = Object.keys(groupPosts.tag).sort((a, b) => {
    const countDiff = groupPosts.tag[b].length - groupPosts.tag[a].length
    if (countDiff !== 0) return countDiff
    return a.localeCompare(b, 'zh-CN')
  })
  tabs.archive = Object.keys(groupPosts.archive).sort(
    (a, b) => parseInt(b) - parseInt(a)
  )

  return { tabs, posts: groupPosts }
}

const addToData = (obj: GroupData, key: string, value: Post) => {
  if (!obj[key]) {
    obj[key] = []
  }
  obj[key].push(value)
}
