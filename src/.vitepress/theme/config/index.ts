import type { BreadcrumbPathMap, SocialLinkItem, PaginationConfig } from './types'

const categoryPathMap: Record<string, string> = {
	blog: '博客',
	tutorials: '教程',
	resources: '资源',
	misc: '杂谈',
}

const breadcrumbPathMap: BreadcrumbPathMap =
	Object.entries(categoryPathMap) as BreadcrumbPathMap

const socialLinks: SocialLinkItem[] = [
	{ icon: 'mdi:github', url: 'https://github.com/Jursin', label: 'GitHub', size: '1.25em' },
	{ icon: 'mingcute:bilibili-line', url: 'https://space.bilibili.com/1575907920', label: 'B站', color: '#F9709A', size: '1.25em' },
	{ icon: 'logos:tiktok-icon', url: 'https://www.douyin.com/user/MS4wLjABAAAAQGQcpmhfTWT-dnMkBX1Dtdw4mqk-WUPiz1Stbb5nn7Q', label: '抖音', size: '1em' },
	{ icon: 'simple-icons:afdian', url: 'https://ifdian.net/a/jursin', label: '爱发电', color: '#946ce6', size: '1.25em' },
	{ icon: 'mingcute:telegram-fill', url: 'https://t.me/Hello_Jursin', label: 'Telegram', color: '#62B8EB', size: '1.25em' },
	{ icon: 'arcticons:coolapk', url: 'https://www.coolapk.com/u/26772772', label: '酷安', color: '#109d58', size: '1.25em' },
	{ icon: 'mdi:email-outline', url: 'mailto:jursin@126.com', label: '邮箱', color: '#177F41', size: '1.25em' },
]

export default {
	blogStartDate: '2025-08-31',
	blogRepo: 'Jursin/Blog',
	categoryPathMap,
	breadcrumbPathMap,
	socialLinks,
	copyright: {
		author: { name: 'Jursin', url: 'https://blog.jursin.top' },
		license: 'CC-BY-SA-4.0' as const,
	},
	comment: {
		serverURL: 'https://waline.jursin.top/',
	},
	pagination: {
		pageSize: 10,
		maxVisible: 5,
	} satisfies PaginationConfig,
}
