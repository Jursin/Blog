import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Blog",
	subtitle: "Fuwari",
	lang: "zh_CN",
	themeColor: {
		hue: 250,
		fixed: false,
	},
	banner: {
		enable: false,
		src: "assets/images/banner.png",
		position: "center", // 等同于object-position，仅支持'top'、'center'、'bottom'，默认为'center'
		credit: {
			enable: false, // 显示横幅图片的署名文字
			text: "", // 要显示的署名文字
			url: "", // (可选)原始作品或艺术家页面的URL链接
		},
	},
	toc: {
		enable: true,
		depth: 3, // 目范围1到3
	},
	favicon: [
		// 保持数组为空以使用默认favicon
		// {
		//   src: '/favicon/icon.png',    // favicon路径，相对于/public目录
		//   theme: 'light',              // (可选) 'light'或'dark'，仅在为浅色和深色模式设置不同favicon时使用
		//   sizes: '32x32',              // (可选) favicon尺寸，仅在设置不同尺寸的favicon时使用
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/Jursin/Blog",
			external: true, // 显示外部链接图标并会在新标签页打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png",
	name: "Jursin",
	bio: "悟已往之不谏，知来者之可追",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Jursin",
		},
		{
			name: "QQ",
			icon: "fa6-brands:qq",
			url: "https://qm.qq.com/q/JpIhKxU5Uc",
		},
		{
			name: "Telegram",
			icon: "fa6-brands:telegram",
			url: "https://t.me/Hello_Jurisn",
		},
		{
			name: "Discord",
			icon: "fa6-brands:discord",
			url: "https://discord.gg/4rr8EkAZ",
		},
		{
			name: "X",
			icon: "fa6-brands:twitter",
			url: "https://x.com/Hello_Jursin",
		},
		{
			name: "Mail",
			icon: "fa6-solid:envelope",
			url: "mailto:jursin@126.com",
		},
		{
			name: "Douyin",
			icon: "fa6-brands:tiktok",
			url: "https://www.douyin.com/user/MS4wLjABAAAAQGQcpmhfTWT-dnMkBX1Dtdw4mqk-WUPiz1Stbb5nn7Q",
		},
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/1575907920",
		},
		{
			name: "YouTube",
			icon: "fa6-brands:youtube",
			url: "https://www.youtube.com/@Hello_Jursin",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://steamcommunity.com/profiles/76561199700473272/",
		}
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景颜色）会被覆盖，请查看astro.config.mjs文件
	// 请选择深色主题，因为当前博客主题仅支持深色背景
	theme: "github-dark",
};
