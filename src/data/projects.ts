// 项目数据配置文件
// 用于管理项目展示页面的数据

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: 'web' | 'mobile' | 'desktop' | 'other';
	techStack: string[];
	status: 'completed' | 'in-progress' | 'planned';
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
}

export const projectsData: Project[] = [
	{
		id: 'mynav',
		title: '导航站',
		description: '个人导航站',
		image: '',
		category: 'web',
		techStack: ['TypeScript', 'Vue'],
		status: 'in-progress',
		liveDemo: 'https://nav.jursin.top/',
		sourceCode: 'https://github.com/Jursin/MyNav',
		startDate: '2025-07-24',
		featured: true,
		tags: ['VitePress', '导航站']
	},
	{
		id: 'mc-guide',
		title: 'MC-Guide',
		description: 'Minecraft 教程',
		image: '',
		category: 'web',
		techStack: ['TypeScript', 'Vue'],
		status: 'in-progress',
		liveDemo: 'https://mc-guide.jursin.top/',
		sourceCode: 'https://github.com/Jursin/MC-Guide',
		startDate: '2025-07-14',
		tags: ['VitePress', 'Minecraft', '教程']
	},
	{
		id: 'awesome-class-softwares',
		title: 'Awesome-Class-Softwares',
		description: '适用于班级一体机的优质软件合集',
		image: '',
		category: 'other',
		techStack: ['Markdown'],
		status: 'in-progress',
		sourceCode: 'https://github.com/Jursin/Awesome-Class-Softwares',
		startDate: '2024-08-23',
		tags: ['软件', '合集']
	}
];

// 获取项目统计信息
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(p => p.status === 'completed').length;
	const inProgress = projectsData.filter(p => p.status === 'in-progress').length;
	const planned = projectsData.filter(p => p.status === 'planned').length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned
		}
	};
};

// 按分类获取项目
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === 'all') {
		return projectsData;
	}
	return projectsData.filter(p => p.category === category);
};

// 获取特色项目
export const getFeaturedProjects = () => {
	return projectsData.filter(p => p.featured);
};

// 获取所有技术栈
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach(project => {
		project.techStack.forEach(tech => techSet.add(tech));
	});
	return Array.from(techSet).sort();
};