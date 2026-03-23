---
title: 腕上课程表
createTime: 2026/03/22 16:36:47
tags:
    - 小米
    - Vela 穿戴设备
permalink: /blog/60fsmnc1/
---

> 我在 AI 辅助下开发了一个适用于 Vela 设备的课程表快应用，欢迎 Star 🌟

<!-- more -->

<div class="github-cards-grid">
  <GitHubCard owner="Jursin" repo="Schedule-Vela" />
  <GitHubCard owner="Jursin" repo="Schedule-Sync" />
</div>

## 特点
- [X] 以卡片形式显示每日课程及详细信息
- [X] 可自由切换显示上/下一天课程
- [X] 当课程正在进行时显示进度条和下课倒计时
- [X] 点击课程卡片进入全屏显示
- [ ] 支持课前倒计时
- [ ] 每日课程分时间段显示
- [ ] 为胶囊形和圆形屏幕添加弧形进度条

> 目前支持导入[拾光课程表](https://sgschedule.jursin.top/)和 [WakeUp 课程表](https://www.wakeup.fun/)的配置文件

## 预览图

<div class="preview-images-row">
  <div class="preview-image-item">
    <img src="/images/schedule-vela/首页.png" alt="首页" class="preview-image-pic">
    <p class="preview-image-title">首页</p>
  </div>
  <div class="preview-image-item">
    <img src="/images/schedule-vela/详情页.png" alt="详情页" class="preview-image-pic">
    <p class="preview-image-title">详情页</p>
  </div>
  <div class="preview-image-item">
    <img src="/images/schedule-vela/设置页.png" alt="设置页" class="preview-image-pic">
    <p class="preview-image-title">设置页</p>
  </div>
  <div class="preview-image-item">
    <img src="/images/schedule-vela/日期选择.png" alt="日期选择" class="preview-image-pic">
    <p class="preview-image-title">日期选择</p>
  </div>
</div>

## 开始使用
### 准备
- [AstroBox 客户端](https://astrobox.online/downloads)
  ::: tip
  如果 AstroBox 不支持你的穿戴设备，可以使用[表盘自定义工具](https://www.bandbbs.cn/threads/9797/)
  :::
- [手环端 `rpk` 文件](https://ghproxy.jursin.top/?url=https://github.com/Jursin/Schedule-Vela&fetchReleases=true)
- [安卓端同步器](https://ghproxy.jursin.top/?url=https://github.com/Jursin/Schedule-Sync&fetchReleases=true)

::: important
本手环端快应用根据[Xiaomi Vela JS 应用开发文档](https://iot.mi.com/vela/quickapp/)开发，理论上支持小米 Vela 穿戴设备
:::

### 向手环安装快应用

<div class="install-row">
  <p class="install-desc">打开 <code>AstroBox-设备</code>，连接设备<br/>点击<code>安装快应用</code>，选择 <code>rpk</code> 文件<br/>点击队列-安装队列的<code>发送</code>按钮，执行安装</p>
  <img src="/images/schedule-vela/AstroBox.png" alt="AstroBox" class="install-img">
</div>

### 在安卓端传递配置文件

<div class="install-row">
  <p class="install-desc">先确保<code>小米运动健康</code>已连接到穿戴设备<br/>打开<code>腕上课程表同步器</code>，会自动连接穿戴设备并打开快应用<br/>点击<code>选择配置文件</code>按钮选择 <code>json</code> 文件<br/>点击<code>确认导入</code>按钮，手环端应该会提示导入成功</p>
  <img src="/images/schedule-vela/Schedule-Sync.png" alt="Schedule-Sync" class="install-img">
</div>

<style>
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

.preview-images-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.preview-image-item {
  text-align: center;
  flex: 1;
}

.preview-image-pic {
  width: 100%;
}

.preview-image-title {
  margin-top: 10px;
  font-weight: bold;
}

.install-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.install-desc {
  margin: 0;
}

.install-img {
  width: 40%;
}
</style>