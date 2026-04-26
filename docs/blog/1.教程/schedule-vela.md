---
title: 【手环快应用】腕上课程表
createTime: 2026/03/22 16:36:47
tags:
    - 小米
    - Vela 穿戴设备
permalink: /blog/60fsmnc1/
---

> 我在 AI 辅助下开发了一个适用于 Vela 设备的课程表快应用，欢迎 Star 🌟

<!-- more -->

![banner](/images/schedule-vela/banner.png)

<div class="github-cards-grid">
  <GitHubCard owner="Jursin" repo="Schedule-Vela" />
  <GitHubCard owner="Jursin" repo="Schedule-Sync" />
</div>

## 特点
- [X] 以卡片形式显示每日课程及详细信息
- [X] 每日课程分时间段显示
- [X] 可自由切换显示上/下一天课程
- [X] 点击课程卡片进入全屏显示
- [X] 显示上/下课倒计时和进度条
- [ ] 为胶囊形和圆形屏幕添加弧形进度条

> 目前支持导入[拾光课程表](https://sgschedule.jursin.top/)、[WakeUp 课程表](https://www.wakeup.fun/)和 [CSES](https://cloud.smart-teach.cn/) 的配置文件

## 预览图
### Xiaomi-Band
![](/images/schedule-vela/Xiaomi-Band.png)

### Xiaomi-Band-10
![](/images/schedule-vela/Xiaomi-Band-10.png)

### Xiaomi-Band-Pro
![](/images/schedule-vela/Xiaomi-Band-Pro.png)

## 开始使用
### 准备
- [AstroBox 客户端](https://astrobox.online/downloads)
  ::: tip
  如果 AstroBox 不支持你的穿戴设备，可以使用[表盘自定义工具](https://www.bandbbs.cn/threads/9797/)
  :::
- [手环端 `rpk` 文件](https://ghproxy.jursin.top/?url=https://github.com/Jursin/Schedule-Vela&fetchReleases=true)
- [安卓端同步器](https://ghproxy.jursin.top/?url=https://github.com/Jursin/Schedule-Sync&fetchReleases=true)

  <a href="https://www.bandbbs.cn/resources/5772/">
    <img src="/images/schedule-vela/get-it-on-bandbbs.png" style="height:80px;">
  </a>

::: important
本手环端快应用根据[Xiaomi Vela JS 应用开发文档](https://iot.mi.com/vela/quickapp/)开发，理论上支持小米 Vela 穿戴设备
:::

### 向手环安装快应用

<div class="install-row">
  <p class="install-desc">打开 <code>AstroBox-设备</code>，连接设备<br/>点击<code>安装快应用</code>，选择 <code>rpk</code> 文件<br/>点击队列-安装队列的<code>发送</code>按钮，执行安装</p>
  <img src="/images/schedule-vela/AstroBox.png" alt="AstroBox" class="install-img">
</div>

### 在手机端编辑课程表并导出配置文件
:::  tip
根据文档在对应应用添加课程表或从教务系统导入再导出课表配置文件
:::

- 拾光课程表
  - [添加课表/时间表](https://sgschedule.jursin.top/guide/user/add-table.html)
  - [从教务系统导入课表](https://sgschedule.jursin.top/guide/user/schedule-import.html#%E6%95%99%E5%8A%A1%E7%B3%BB%E7%BB%9F%E5%AF%BC%E5%85%A5)
  - [课程文件导出](https://sgschedule.jursin.top/guide/user/export-and-share.html#%E8%AF%BE%E7%A8%8B%E6%96%87%E4%BB%B6%E5%AF%BC%E5%87%BA)
    ::: tip
    后缀为 `json`
    :::
- WakeUp 课程表
  - [添加/编辑课程](https://www.wakeup.fun/doc/add_course.html)
  - [从教务系统导入课表](https://www.wakeup.fun/doc/import_from_eas.html)
  - 导出为备份
    ::: tip
    后缀为 `wakeup_schedule`
    :::

    <img src="/images/schedule-vela/WakeUp课程表导出.png" class="wakeup-export" width="50%">
- [CSES](https://cloud.smart-teach.cn/)

### 在手机端传递配置文件

<div class="install-row">
  <p class="install-desc">先确保<code>小米运动健康</code>已连接到穿戴设备<br/>打开<code>腕上课程表同步器</code>，会自动连接穿戴设备并打开快应用<br/>点击<code>选择配置文件</code>按钮选择 <code>json</code>/<code>wakeup_schedule</code> 文件<br/>点击<code>确认导入</code>按钮，手环端会提示导入成功</p>
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

.install-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin: 0 35px;
}

.install-desc {
  margin: 0;
}

.install-img {
  width: 50%;
}

@media screen and (max-width: 768px) {
  .wakeup-export {
    width: 100%;
  }
}
</style>