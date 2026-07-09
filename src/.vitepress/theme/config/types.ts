// 版权信息
export type CopyrightLicenseKey =
	| 'CC0'
	| 'CC-BY-4.0'
	| 'CC-BY-SA-4.0'
	| 'CC-BY-NC-4.0'
	| 'CC-BY-ND-4.0'
	| 'CC-BY-NC-SA-4.0'
	| 'CC-BY-NC-ND-4.0'

export interface CopyrightLicenseInfo {
	label: string
	url: string
	icons: string[]
}

export interface CopyrightConfig {
	author: CopyrightAuthor
	license: CopyrightLicenseKey
}

export type CopyrightLicense = CopyrightLicenseKey | string

export interface CopyrightLicenseObject {
	name: CopyrightLicense
	url: string
}

export interface CopyrightAuthor {
	name: string
	url?: string
}

export interface CopyrightFrontmatterConfig {
	// 版权许可
	license?: CopyrightLicense | CopyrightLicenseObject

	// 版权所有者

	author?: string | CopyrightAuthor

	// 作品的创作方式, 原创、转载，默认 'original'
	creation?: 'original' | 'reprint'

	// 原文地址，非原创作品时需要声明原文地址
	source?: string
}

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

// 面包屑导航
export type BreadcrumbPathMap = [string, string][]

// 社交链接
export interface SocialLinkItem {
	icon: string
	url: string
	label: string
	size?: string
	color?: string
}

// 评论
export interface CommentConfig {
	serverURL: string
}

// 分页
export interface PaginationConfig {
	pageSize: number
	maxVisible: number
}
