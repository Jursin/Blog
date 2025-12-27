import { defineThemeConfig } from 'vuepress-theme-plume'
import navbar from './navbar'

export default defineThemeConfig({
  logo: '/favicon.ico',
  appearance: true,
  social: [
    { icon: 'github', link: 'https://github.com/Jursin/Blog' },
    { icon: 'bilibili', link: 'https://space.bilibili.com/1575907920' },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"/></svg>',
        name: 'email'
      },
      link: 'mailto:jursin@126.com'
    },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m2.5 12A1.5 1.5 0 0 0 6 16.5A1.5 1.5 0 0 0 7.5 18A1.5 1.5 0 0 0 9 16.5A1.5 1.5 0 0 0 7.5 15M6 10v2a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8m0-4v2a10 10 0 0 1 10 10h2A12 12 0 0 0 6 6"/></svg>',
        name: 'rss'
        },
      link: '/rss.xml'
    },
  ],
  navbarSocialInclude: ['github', 'bilibili', 'rss'], // 允许显示在导航栏的 social 社交链接
  // aside: true, // 页内侧边栏， 默认显示在右侧
  // outline: [2, 3], // 页内大纲， 默认显示 h2, h3
  copyright: { 
    license: {
      name: 'MIT',
      url: 'https://github.com/Jursin/Blog/blob/main/LICENSE'
    },
    author: {
      name: 'Jursin',
      url: 'https://github.com/Jursin'
    },
    creation: 'original'
  },
  // prevPage: true,   // 是否启用上一页链接
  // nextPage: true,   // 是否启用下一页链接
  // createTime: true, // 是否显示文章创建时间

  /* 页脚 */
  footer: {
    message: 'Powered by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a> | Copyright © 2025 Jursin',
    copyright: '<img src="/icon/miit.png" width="14" height="14" style="margin-right: 5px; display: inline-block; vertical-align: middle;"><a href="http://beian.miit.gov.cn/" target="_blank" >鄂ICP备2025157296号-1</a> | <img src="/icon/mps.png" width="14" height="14" style="margin-right: 5px; display: inline-block; vertical-align: middle;"><a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank">鄂公网安备42100302000228号</a>',
  },

  navbar,
  collections: [ 
    { type: 'post', dir: 'blog', title: '博客', meta: { createTime: "long" } }
  ],

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
  // bulletin: {
  //   layout: 'top-right',
  //   contentType: 'markdown',
  //   title: '公告板标题',
  //   content: '公告板内容',
  // },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  transition: {
  //   page: true,        // 启用 页面间跳转过渡动画
  //   postList: true,    // 启用 博客文章列表过渡动画
    appearance: 'circle-clip',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
  },
})
