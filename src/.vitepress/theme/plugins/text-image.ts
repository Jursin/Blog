export function textImagePlugin(md: any): void {
  const originalRender = md.render.bind(md)

  md.render = function (src: string, env: any) {
    const lines = src.split('\n')
    const out: string[] = []
    let i = 0

    while (i < lines.length) {
      if (lines[i].trim() === '::: text-image') {
        i++
        const contentLines: string[] = []
        while (i < lines.length && lines[i].trim() !== ':::') {
          contentLines.push(lines[i])
          i++
        }
        if (i < lines.length) i++

        let textContent = ''
        let imageSrc = ''
        let textFirst = false
        let mode: 'text' | null = null
        let order: ('text' | 'image')[] = []

        for (const line of contentLines) {
          const trimmed = line.trimEnd()
          const imgMatch = trimmed.match(/^@image\s+src="([^"]+)"\s*$/)
          if (trimmed === '@text') {
            mode = 'text'
            order.push('text')
            continue
          }
          if (imgMatch) {
            imageSrc = imgMatch[1]
            mode = null
            order.push('image')
            continue
          }
          if (mode === 'text') {
            textContent += line + '\n'
          }
        }

        textFirst = order.indexOf('text') < order.indexOf('image')
        textContent = textContent.trim()

        const renderedText = textContent
          ? md.render(textContent, env)
          : ''

        const altText = imageSrc.replace(/^.*[/\\]/, '').replace(/\.[^.]+$/, '')

        const html = [
          '<div class="custom-text-image">',
          '<div class="container">',
          textFirst
            ? `<div class="content-text"><section>${renderedText}</section></div><div class="content-image"><img src="${imageSrc}" alt="${altText}" loading="lazy" /></div>`
            : `<div class="content-image"><img src="${imageSrc}" alt="${altText}" loading="lazy" /></div><div class="content-text"><section>${renderedText}</section></div>`,
          '</div>',
          '</div>',
        ].join('\n')

        out.push(html)
      } else {
        out.push(lines[i])
        i++
      }
    }

    return originalRender(out.join('\n'), env)
  }
}
