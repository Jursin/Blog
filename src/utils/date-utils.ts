import { siteConfig } from "../config";

export function formatDateToYYYYMMDD(date: Date): string {
	return date.toISOString().substring(0, 10);
}

// 国际化日期格式化函数
export function formatDateI18n(dateString: string): string {
	const date = new Date(dateString);
	const lang = siteConfig.lang || "en";
	
	// 根据语言设置不同的日期格式
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	
	// 语言代码映射
	const localeMap: Record<string, string> = {
		"zh_CN": "zh-CN",
		"en": "en-US",
	};
	
	const locale = localeMap[lang] || "en-US";
	return date.toLocaleDateString(locale, options);
}
