export function plotPlugin(md: any): void {
  const rule = (state: any, silent: boolean) => {
    const start = state.pos
    const max = state.posMax
    const src = state.src

    // 匹配开头的 !!
    if (start + 1 >= max) return false
    if (src.charCodeAt(start) !== 0x21 || src.charCodeAt(start + 1) !== 0x21) return false

    // 查找结尾 !!
    const end = src.indexOf('!!', start + 2)
    if (end === -1) return false
    if (end === start + 2) return false // 空内容

    if (!silent) {
      const token = state.push('plot_open', 'span', 1)
      token.attrs = [['class', 'vp-plot']]

      state.pos = start + 2
      state.posMax = end
      state.md!.inline!.tokenize(state, start + 2, end)

      state.push('plot_close', 'span', -1)
    }

    state.pos = end + 2
    state.posMax = max
    return true
  }

  md.inline.ruler.before('emphasis', 'plot', rule)
}
