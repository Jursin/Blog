---
title: 腕上课程表
createTime: 2026/03/22 16:36:47
tags:
    - 小米
    - Vela 穿戴设备
permalink: /blog/60fsmnc1/
---

> 在 AI 辅助下开发了一个适用于 Vela 设备的课程表快应用

<!-- more -->

## 准备
- [AstroBox 客户端](https://astrobox.online/downloads)
  ::: tip
  如果 AstroBox 不支持你的穿戴设备，可以使用[表盘自定义工具](https://www.bandbbs.cn/threads/9797/)
  :::
- [手环端 `rpk` 文件](https://ghproxy.jursin.top/?url=https://github.com/Jursin/Schedule-Vela&fetchReleases=true)
- [安卓端同步器](https://ghproxy.jursin.top/?url=https://github.com/Jursin/Schedule-Sync&fetchReleases=true)

::: important
本手环端快应用根据[Xiaomi Vela JS 应用开发文档](https://iot.mi.com/vela/quickapp/)开发，理论上支持小米 Vela 穿戴设备
:::

## 向手环安装快应用

<div style="display: flex; align-items: center; justify-content: center; gap: 30px;">
  <p style="margin: 0;">打开 <code>AstroBox-设备</code>，连接设备<br/>点击<code>安装快应用</code>，选择 <code>rpk</code> 文件<br/>点击队列-安装队列的<code>发送</code>按钮，执行安装</p>
  <img src="/images/schedule-vela/AstroBox.png" alt="AstroBox" width="40%">
</div>

## 在安卓端传递配置文件

<div style="display: flex; align-items: center; justify-content: center; gap: 30px;">
  <p style="margin: 0;">先确保<code>小米运动健康</code>已连接到穿戴设备<br/>打开<code>腕上课程表同步器</code>，会自动连接穿戴设备并打开快应用<br/>点击<code>选择配置文件</code>按钮选择 <code>json</code> 文件<br/>点击<code>确认导入</code>按钮，手环端应该会提示导入成功</p>
  <img src="/images/schedule-vela/Schedule-Sync.png" alt="Schedule-Sync" width="40%">
</div>

## 预览图

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <div style="text-align: center; flex: 0 0 30%; max-width: 450px;">
    <img src="/images/schedule-vela/preview1.png" alt="首页" style="width: 100%;">
    <p style="margin-top: 10px; font-weight: bold;">首页</p>
  </div>
</div>

> 目前仅支持导入拾光课程表的配置文件，后续会支持导入 WakeUp 课程表配置文件