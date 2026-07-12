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

// 分页
export interface PaginationConfig {
	pageSize: number
	maxVisible: number
}
