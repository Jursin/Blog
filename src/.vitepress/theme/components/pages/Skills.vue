<template>
  <div class="skills">
    <h2 class="title">技能</h2>
    <SkillSection
      icon="octicon:code-16"
      title="使用的技术栈"
      :items="techStackData.techStack"
    />
    <SkillSection
      icon="octicon:terminal-16"
      title="使用的开发工具"
      :items="devToolsData.devTools"
    />
    <SkillSection
      icon="octicon:cloud-16"
      title="使用的云服务平台"
      :items="cloudPlatformsData.cloudPlatforms"
    />

    <!-- 贡献图表 -->
    <h3 class="skill-header">
      <Icon name="octicon:graph-16" color="var(--vp-c-brand-1)" />
      GitHub 贡献图表
    </h3>
    <div class="contribution-section">
      <GitHubContributionGraph />
    </div>

    <!-- 开源项目 -->
    <h3 class="skill-header">
      <Icon name="octicon:repo-16" size="20px" color="var(--vp-c-brand-1)" />
      开源项目
    </h3>
    <div class="github-cards-grid">
      <GitHubCard
        v-for="(project, index) in projectsData.projects"
        :key="'project-' + index"
        :repo="project.repo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import techStackRaw from "../../data/techStack.json";
import devToolsRaw from "../../data/devTools.json";
import cloudPlatformsRaw from "../../data/cloudPlatforms.json";
import projectsData from "../../data/projects.json";
import GitHubContributionGraph from "../GitHubContributionGraph.vue";
import SkillSection from "../SkillSection.vue";

interface SkillItem {
  name: string
  icon?: string
  custom?: boolean
  svg?: string
  color?: string
}

const techStackData = techStackRaw as { techStack: SkillItem[] }
const devToolsData = devToolsRaw as { devTools: SkillItem[] }
const cloudPlatformsData = cloudPlatformsRaw as { cloudPlatforms: SkillItem[] }
</script>

<style scoped>
.skills {
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  margin: 0 0 16px 0 !important;
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-align: center;
  transition: color 0.25s ease;
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin: 1.5rem 0 1rem;
  font-size: 20px;
  font-weight: 600;
}

.contribution-section {
  min-width: 0;
}

.github-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .github-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
