export function useMark() {
  if (typeof window === 'undefined') return

  document.documentElement.setAttribute('data-mark-mode', 'lazy')

  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        ;(e.target as HTMLElement).classList.add('vp-mark-visible')
        observer.unobserve(e.target)
      }
    }
  }, { rootMargin: '8% 0px -8% 0px' })

  const bind = () =>
    document.querySelectorAll('mark:not(.vp-mark-visible)')
      .forEach(el => observer.observe(el))

  const reset = () => { observer.disconnect(); bind() }

  const destroy = () => { observer.disconnect() }

  return { bind, reset, destroy }
}
