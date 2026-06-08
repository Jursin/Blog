<template>
  <div class="skills">
    <h2 class="title">技能</h2>
    <!-- 技术栈 -->
    <h3 class="skill-header">
      <Icon name="octicon:code-16" color="var(--vp-c-brand-1)" />
      使用的技术栈
    </h3>
    <div class="itemGrid">
      <div
        v-for="(item, index) in techStackData.techStack"
        :key="'tech-' + index"
        class="gridItem"
        :data-name="item.name"
      >
        <img v-if="item.custom" :src="item.svg" :alt="item.name" class="icon-img" />
        <Icon v-else :name="item.icon" size="2rem" :color="item.color || 'currentColor'" />
      </div>
    </div>

    <!-- 开发工具 -->
    <h3 class="skill-header">
      <Icon name="octicon:terminal-16" color="var(--vp-c-brand-1)" />
      使用的编程工具
    </h3>
    <div class="itemGrid">
      <div
        v-for="(item, index) in devToolsData.devTools"
        :key="'tool-' + index"
        class="gridItem"
        :data-name="item.name"
      >
        <img v-if="item.custom" :src="item.svg" :alt="item.name" class="icon-img" />
        <Icon v-else :name="item.icon" size="2rem" :color="item.color || 'currentColor'" />
      </div>
    </div>

    <!-- 云服务平台 -->
    <h3 class="skill-header">
      <Icon name="octicon:cloud-16" color="var(--vp-c-brand-1)" />
      使用的云服务平台
    </h3>
    <div class="itemGrid">
      <div
        v-for="(item, index) in cloudPlatformsData.cloudPlatforms"
        :key="'cloud-' + index"
        class="gridItem"
        :data-name="item.name"
      >
        <img v-if="item.custom" :src="item.svg" :alt="item.name" class="icon-img" />
        <Icon v-else :name="item.icon" size="2rem" :color="item.color || 'currentColor'" />
      </div>
    </div>

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

<script setup>
import techStackData from "../data/techStack.json";
import devToolsData from "../data/devTools.json";
import cloudPlatformsData from "../data/cloudPlatforms.json";
import projectsData from "../data/projects.json";
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
  transition: color var(--vp-t-color);
}

.skill-header {
  display: flex;
  align-items: center;
  margin: 1.5rem 0 1rem;
  font-size: 20px;
  font-weight: 600;
}

.itemGrid {
  display: flex;
  flex-wrap: wrap;
}

.gridItem {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  position: relative;
  margin: 0 0.2rem 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.gridItem::before {
  content: attr(data-name);
  position: absolute;
  top: -1.5rem;
  left: 50%;
  color: var(--vp-c-text-1);
  font-size: 14px;
  background: var(--vp-c-bg-soft);
  width: max-content;
  padding: 0 5px;
  text-align: center;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  transform: translate(-50%, 20px);
  opacity: 0;
}

.gridItem:hover::before {
  transform: translate(-50%, 0);
  opacity: 1;
}

.icon-img {
  width: 2rem;
  height: 2rem;
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
