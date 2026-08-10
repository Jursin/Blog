import type { BreadcrumbPathMap, SocialLinkItem, PaginationConfig, CopyrightLicenseKey, CopyrightLicenseInfo } from './types'

export const copyrightLicenseMap: Record<CopyrightLicenseKey, CopyrightLicenseInfo> = {
	'CC0': {
		label: 'CC0 1.0 通用 (CC0)',
		url: 'https://creativecommons.org/publicdomain/zero/1.0/',
		icons: ['cib:creative-commons-zero'],
	},
	'CC-BY-4.0': {
		label: '署名 4.0 国际 (CC-BY-4.0)',
		url: 'https://creativecommons.org/licenses/by/4.0/',
		icons: ['cib:creative-commons', 'cib:creative-commons-by'],
	},
	'CC-BY-SA-4.0': {
		label: '署名-相同方式共享 4.0 国际 (CC-BY-SA-4.0)',
		url: 'https://creativecommons.org/licenses/by-sa/4.0/',
		icons: ['cib:creative-commons', 'cib:creative-commons-by', 'cib:creative-commons-sa'],
	},
	'CC-BY-NC-4.0': {
		label: '署名-非商业性 4.0 国际 (CC-BY-NC-4.0)',
		url: 'https://creativecommons.org/licenses/by-nc/4.0/',
		icons: ['cib:creative-commons', 'cib:creative-commons-by', 'cib:creative-commons-nc'],
	},
	'CC-BY-ND-4.0': {
		label: '署名-禁止演绎 4.0 国际 (CC-BY-ND-4.0)',
		url: 'https://creativecommons.org/licenses/by-nd/4.0/',
		icons: ['cib:creative-commons', 'cib:creative-commons-by', 'cib:creative-commons-nd'],
	},
	'CC-BY-NC-SA-4.0': {
		label: '署名-非商业性-相同方式共享 4.0 国际 (CC-BY-NC-SA-4.0)',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
		icons: ['cib:creative-commons', 'cib:creative-commons-by', 'cib:creative-commons-nc', 'cib:creative-commons-sa'],
	},
	'CC-BY-NC-ND-4.0': {
		label: '署名-非商业性-禁止演绎 4.0 国际 (CC-BY-NC-ND-4.0)',
		url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
		icons: ['cib:creative-commons', 'cib:creative-commons-by', 'cib:creative-commons-nc', 'cib:creative-commons-nd'],
	},
}

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
	{ icon: 'mdi:email-outline', url: 'mailto:jursin@126.com', label: '邮箱', color: '#177F41', size: '1.25em' },
	{ icon: 'mingcute:bilibili-line', url: 'https://space.bilibili.com/1575907920', label: 'bilibili', color: '#F9709A', size: '1.25em' },
	{ icon: 'logos:tiktok-icon', url: 'https://www.douyin.com/user/MS4wLjABAAAAQGQcpmhfTWT-dnMkBX1Dtdw4mqk-WUPiz1Stbb5nn7Q', label: '抖音', size: '1em' },
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
