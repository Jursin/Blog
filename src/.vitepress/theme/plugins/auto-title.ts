export function autoTitlePlugin(md: any): void {
  md.core.ruler.push('auto_title', (state: any) => {
    // 检查是否已存在 H1
    const hasH1 = state.tokens.some(
      (t: any) => t.type === 'heading_open' && t.tag === 'h1'
    )

    if (!hasH1 && state.env?.frontmatter?.title) {
      const title = String(state.env.frontmatter.title)

      const h1Open = new state.Token('heading_open', 'h1', 1)
      h1Open.block = true

      const textToken = new state.Token('text', '', 0)
      textToken.content = title

      const h1Inline = new state.Token('inline', '', 0)
      h1Inline.block = true
      h1Inline.content = title
      h1Inline.children = [textToken]

      const h1Close = new state.Token('heading_close', 'h1', -1)
      h1Close.block = true

      // 插入到 tokens 头部
      state.tokens.unshift(h1Open, h1Inline, h1Close)
    }

    return true
  })
}
