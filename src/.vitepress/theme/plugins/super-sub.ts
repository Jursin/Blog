// markdown-it 内联规则回调类型
type InlineRule = (state: any, silent: boolean) => boolean

export function supPlugin(md: any): void {
  const rule: InlineRule = (state, silent) => {
    const start = state.pos
    const max = state.posMax
    const src = state.src

    // 匹配开头的 ^
    if (start + 1 >= max) return false
    if (src.charCodeAt(start) !== 0x5E) return false

    // 查找结尾 ^
    const end = src.indexOf('^', start + 1)
    if (end === -1 || end === start + 1) return false // 空内容

    if (!silent) {
      state.push('sup_open', 'sup', 1)
      state.pos = start + 1
      state.posMax = end
      state.md!.inline!.tokenize(state, start + 1, end)
      state.push('sup_close', 'sup', -1)
    }

    state.pos = end + 1
    state.posMax = max
    return true
  }

  md.inline.ruler.before('emphasis', 'sup', rule)
}

export function subPlugin(md: any): void {
  const rule: InlineRule = (state, silent) => {
    const start = state.pos
    const max = state.posMax
    const src = state.src

    // 匹配开头的 ~
    if (start + 1 >= max) return false
    if (src.charCodeAt(start) !== 0x7E) return false
    // 避免与 ~~ 删除线冲突
    if (src.charCodeAt(start + 1) === 0x7E) return false

    // 查找结尾 ~
    const end = src.indexOf('~', start + 1)
    if (end === -1 || end === start + 1) return false // 空内容

    if (!silent) {
      state.push('sub_open', 'sub', 1)
      state.pos = start + 1
      state.posMax = end
      state.md!.inline!.tokenize(state, start + 1, end)
      state.push('sub_close', 'sub', -1)
    }

    state.pos = end + 1
    state.posMax = max
    return true
  }

  md.inline.ruler.before('emphasis', 'sub', rule)
}
