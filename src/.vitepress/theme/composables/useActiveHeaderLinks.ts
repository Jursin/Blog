import { getScrollOffset } from 'vitepress'

// 页面滚动时自动在 URL 末尾更新对应的标题锚点 hash
export function useActiveHeaderLinks() {
  if (typeof window === 'undefined') return

  // 更新 URL 末尾 hash；不触发路由滚动行为，也不新增历史记录
  const updateHash = (hash: string) => {
    const base = location.pathname + location.search
    history.replaceState(null, '', hash ? base + hash : base)
  }

  // 计算元素在文档中的绝对位置（累加 offsetTop）
  const getAbsoluteTop = (element: HTMLElement | null): number => {
    let offsetTop = 0
    while (element && element !== document.body) {
      offsetTop += element.offsetTop
      element = element.offsetParent as HTMLElement | null
    }
    return offsetTop
  }

  const setActiveRouteHash = () => {
    const scrollTop = Math.max(
      window.scrollY,
      document.documentElement.scrollTop,
      document.body.scrollTop,
    )
    const offset = getScrollOffset() + 4

    // 滚回页面顶部时清空 hash
    if (Math.abs(scrollTop) < offset) {
      updateHash('')
      return
    }

    // 是否已滚动到页面底部
    const scrollBottom = window.innerHeight + scrollTop
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    )
    const isAtPageBottom = Math.abs(scrollHeight - scrollBottom) < offset

    // 目录链接与正文标题锚点
    const headerLinks = [
      ...document.querySelectorAll<HTMLAnchorElement>('.VPDocAsideOutline a'),
    ]
    const headerAnchors = [
      ...document.querySelectorAll<HTMLAnchorElement>('.header-anchor'),
    ]
    // 仅保留目录中存在的锚点
    const existedHeaderAnchors = headerAnchors.filter((anchor) =>
      headerLinks.some((link) => link.hash === anchor.hash)
    )

    for (let i = 0; i < existedHeaderAnchors.length; i++) {
      const anchor = existedHeaderAnchors[i]
      const nextAnchor = existedHeaderAnchors[i + 1]

      const anchorTop = getAbsoluteTop(anchor.parentElement)
      const nextAnchorTop = nextAnchor
        ? getAbsoluteTop(nextAnchor.parentElement)
        : Infinity

      // 已滚过当前锚点，且未滚过下一个锚点
      const hasPassedCurrentAnchor = scrollTop >= anchorTop - offset
      const hasNotPassedNextAnchor = scrollTop < nextAnchorTop - offset
      if (!hasPassedCurrentAnchor || !hasNotPassedNextAnchor) continue

      const routeHash = decodeURIComponent(location.hash)
      const anchorHash = decodeURIComponent(anchor.hash)
      if (routeHash === anchorHash) return

      // 页面底部时保持最后一个锚点 hash
      if (isAtPageBottom) {
        for (let j = i + 1; j < existedHeaderAnchors.length; j++) {
          if (routeHash === decodeURIComponent(existedHeaderAnchors[j].hash))
            return
        }
      }

      updateHash(anchorHash)
      return
    }
  }

  // 防抖包装滚动处理
  let timer: ReturnType<typeof setTimeout> | undefined
  const onScroll = () => {
    clearTimeout(timer)
    timer = setTimeout(setActiveRouteHash, 200)
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  const destroy = () => {
    window.removeEventListener('scroll', onScroll)
    clearTimeout(timer)
  }

  return { destroy }
}
