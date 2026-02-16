<template>
  <div class="skills">
    <h2 class="title">技能</h2>
    <!-- 技术栈 -->
    <h3>🫡使用的技术栈</h3>
    <div class="itemGrid">
      <div
        v-for="(item, index) in techStackData.techStack"
        :key="'tech-' + index"
        class="gridItem"
        :data-name="item.name"
      >
        <template v-if="item.custom">
          <svg width="2rem" height="2rem" viewBox="0 0 24 24" :fill="item.fill || 'currentColor'">
            <path :d="item.svg" :fill="item.fill || 'currentColor'"/>
          </svg>
        </template>
        <template v-else>
          <Icon :name="item.icon" size="2rem" />
        </template>
      </div>
    </div>

    <!-- 开发工具 -->
    <h3>🛠️使用的编程工具</h3>
    <div class="itemGrid">
      <div
        v-for="(item, index) in devToolsData.devTools"
        :key="'tool-' + index"
        class="gridItem"
        :data-name="item.name"
      >
        <template v-if="item.custom">
          <svg width="2rem" height="2rem" viewBox="0 0 24 24" :fill="item.fill || 'currentColor'">
            <path :d="item.svg" :fill="item.fill || 'currentColor'"/>
          </svg>
        </template>
        <template v-else>
          <Icon :name="item.icon" size="2rem" />
        </template>
      </div>
    </div>

    <!-- 云服务平台 -->
    <h3>☁️使用的云服务平台</h3>
    <div class="itemGrid">
      <div
        v-for="(item, index) in cloudPlatformsData.cloudPlatforms"
        :key="'cloud-' + index"
        class="gridItem"
        :data-name="item.name"
      >
        <template v-if="item.custom">
          <svg width="2rem" height="2rem" viewBox="0 0 24 24" :fill="item.fill || 'currentColor'">
            <path :d="item.svg" :fill="item.fill || 'currentColor'"/>
          </svg>
        </template>
        <template v-else>
          <Icon :name="item.icon" size="2rem" />
        </template>
      </div>
    </div>
    <div class="project">
      <div class="project-header">
        <Icon name="octicon:repo-16" size="20px" />
        <h3>开源项目</h3>
      </div>
      <div class="github-cards-grid">
        <GitHubCard owner="Jursin" repo="Awesome-Class-Softwares" />
        <GitHubCard owner="Jursin" repo="Awesome-Class-Softwares-Web" />
        <GitHubCard owner="Jursin" repo="MC-Guide" />
      </div>
    </div>
  </div>
</template>

<script setup>
import techStackData from "../data/techStack.json";
import devToolsData from "../data/devTools.json";
import cloudPlatformsData from "../data/cloudPlatforms.json";
</script>

<style scoped>
.skills {
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
}

.title {
  padding: 40px 0 0 0;
  margin: 0 0 16px 0 !important;
  padding: 0 !important;
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-align: center;
  outline: none;
  transition: color var(--vp-t-color);
}

h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
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

.project-header {
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.project-header h3 {
  margin: 0;
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
