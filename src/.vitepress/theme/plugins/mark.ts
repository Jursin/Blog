type InlineRule = (state: any, silent: boolean) => boolean

export function markPlugin(md: any): void {
  const rule: InlineRule = (state, silent) => {
    const start = state.pos
    const max = state.posMax
    const src = state.src

    // 匹配开头的 ==
    if (start + 1 >= max) return false
    if (src.charCodeAt(start) !== 0x3D || src.charCodeAt(start + 1) !== 0x3D) return false
    if (start + 2 < max && src.charCodeAt(start + 2) === 0x3D) return false // 避免 ===

    // 查找结尾 ==
    const end = src.indexOf('==', start + 2)
    if (end === -1) return false
    if (end === start + 2) return false // 空内容

    let pendingClass = ''
    let finalEnd = end + 2

    // 检查结尾 == 后面是否有 {.classname}
    if (finalEnd < max && src.charCodeAt(finalEnd) === 0x7B) {
      const closeBrace = src.indexOf('}', finalEnd + 1)
      if (closeBrace !== -1) {
        const inner = src.slice(finalEnd + 1, closeBrace).trim()
        if (inner.startsWith('.')) {
          pendingClass = inner.slice(1)
          finalEnd = closeBrace + 1
        }
      }
    }

    if (!silent) {
      const open = state.push('mark_open', 'mark', 1)
      if (pendingClass) {
        open.attrs = [['class', pendingClass]]
      }

      state.pos = start + 2
      state.posMax = end
      state.md!.inline!.tokenize(state, start + 2, end)

      state.push('mark_close', 'mark', -1)
    }

    state.pos = finalEnd
    state.posMax = max
    return true
  }

  md.inline.ruler.before('emphasis', 'mark', rule)
}
