import type { DefaultTheme } from 'vitepress/theme'
import siteConfig from '../config'

const zhTranslations: Partial<DefaultTheme.Config> = {
  // 导航 & 界面
  darkModeSwitchLabel: '主题',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  sidebarMenuLabel: '菜单',
  returnToTopLabel: '回到顶部',
  skipToContentLabel: '跳转到内容',

  // 大纲
  outline: {
    level: [2, 3],
    label: '页面导航',
  },

  // 编辑链接
  editLink: {
    pattern: `https://github.com/${siteConfig.blogRepo}/edit/vitepress/src/:path`,
    text: '在 GitHub 上编辑此页面',
  },

  // 最后更新
  lastUpdated: {
    text: '最后更新于',
    formatOptions: {
      dateStyle: 'long',
      timeStyle: 'medium'
    },
  },

  // 上下页
  docFooter: {
    prev: '上一页',
    next: '下一页',
  },

  // 404
  notFound: {
    title: '页面未找到',
    quote: '如果你不改变方向，继续寻找，你可能会走到你本要去的地方。',
    linkText: '回到首页',
    linkLabel: '回到首页',
  },

  // 搜索
  search: {
    provider: 'local',
    options: {
      translations: {
        button: {
          buttonText: '搜索',
          buttonAriaLabel: '搜索',
        },
        modal: {
          displayDetails: '显示详细列表',
          resetButtonTitle: '重置搜索',
          backButtonTitle: '关闭搜索',
          noResultsText: '未找到关于',
          footer: {
            selectText: '选择',
            selectKeyAriaLabel: '回车',
            navigateText: '导航',
            navigateUpKeyAriaLabel: '上箭头',
            navigateDownKeyAriaLabel: '下箭头',
            closeText: '关闭',
            closeKeyAriaLabel: 'Esc',
          },
        },
      },
    },
  },
}

export default zhTranslations
