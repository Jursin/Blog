declare module '*.vue' {}
declare module '*.css' {}
declare module 'virtual:*' {}
declare module 'markdown-it-container' {
  import type MarkdownIt from 'markdown-it'
  interface ContainerOpts {
    render: (tokens: any[], idx: number, options: any, env: any, self: any) => string
  }
  function container(md: MarkdownIt, name: string, opts: ContainerOpts): void
  export default container
}
declare module 'markdown-it-task-lists' {
  import type MarkdownIt from 'markdown-it'
  interface TaskListOptions {
    enabled?: boolean
    label?: boolean
    labelAfter?: boolean
  }
  const plugin: (md: MarkdownIt, options?: TaskListOptions) => void
  export default plugin
}
