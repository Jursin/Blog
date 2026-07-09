export function useOutlineScroll() {
  if (typeof window === 'undefined') return

  const scrollToActive = () => {
    const activeLink = document.querySelector<HTMLAnchorElement>(
      '.VPDocAsideOutline a.active'
    )
    if (!activeLink) return

    const container = document.querySelector<HTMLElement>('.aside-container')
    if (!container) return

    const linkTop = activeLink.offsetTop
    const linkHeight = activeLink.offsetHeight
    const containerHeight = container.clientHeight

    // 将 active 链接滚动到容器中间位置
    container.scrollTop = Math.max(0, linkTop - containerHeight / 2 + linkHeight / 2)
  }

  // 用 MutationObserver 监听 active 类变化，比 scroll 事件更精准
  const observer = new MutationObserver(scrollToActive)

  const start = () => {
    const outline = document.querySelector('.VPDocAsideOutline')
    if (!outline) return
    observer.observe(outline, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: false,
    })
    // 初始定位
    requestAnimationFrame(scrollToActive)
  }

  // 路由切换后重新绑定
  const restart = () => {
    observer.disconnect()
    requestAnimationFrame(start)
  }

  // 首次挂载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start)
  } else {
    start()
  }

  return { restart }
}
