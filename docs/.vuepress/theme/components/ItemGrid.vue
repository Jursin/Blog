<template>
  <div>
    <!-- 技术栈 -->
    <h2>🫡使用的技术栈</h2>
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
    <h2>🛠️使用的编程工具</h2>
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
    <h2>☁️使用的云服务平台</h2>
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
        <Icon name="octicon:repo-16" size="1em" />
        <h2>开源项目</h2>
      </div>
      <GitHubCard owner="Jursin" repo="MC-Guide" /><br />
      <GitHubCard owner="Jursin" repo="Awesome-Class-Softwares" /><br />
      <GitHubCard owner="Jursin" repo="student-info-system" />
    </div>
  </div>
</template>

<script setup>
import techStackData from "../data/techStack.json";
import devToolsData from "../data/devTools.json";
import cloudPlatformsData from "../data/cloudPlatforms.json";
</script>

<style scoped>
h2 {
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
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.project-header h2 {
  margin: 0;
}
</style>
