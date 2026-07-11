const EXCERPT_MAX = 200

function stripMarkdown(str: string): string {
  return str
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#+\s+(.*)$/gm, '$1')
    .replace(/^>\s?(.*)$/gm, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/<\/?[^>]*>/g, '')
    .replace(/==([^=]+)==/g, '$1')
    .replace(/:::[\s\S]*?:::/g, '')
    .replace(/[`*~_#\-|]/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim()
}

export function extractExcerpt(src: string): string {
  let text = src.replace(/^---[\s\S]*?---\n*/g, '')
  const moreIndex = text.search(/<!--\s*more\s*-->/)
  if (moreIndex !== -1) text = text.slice(0, moreIndex)
  return stripMarkdown(text).slice(0, EXCERPT_MAX)
}
