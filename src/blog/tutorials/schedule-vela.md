---
title: 【手环快应用】腕上课程表
createTime: 2026/03/22 16:36:47
tags:
    - 小米
    - Vela 穿戴设备
cover: /images/schedule-vela/banner.png
---

> 我在 AI 辅助下开发了一款适用于 Xiaomi Vela OS 操作系统的==课程表快应用==，欢迎 ==Star 🌟==

<!-- more -->

![banner](/images/schedule-vela/banner.png)

<CardGrid>
  <GitHubCard repo="Jursin/Schedule-Vela" />
  <GitHubCard repo="Jursin/Schedule-Sync" />
</CardGrid>

## 特点
- [X] 以卡片形式显示每日课程及详细信息
- [X] 每日课程分时间段显示
- [X] 可自由切换显示上/下一天课程
- [X] 点击课程卡片进入全屏显示
- [X] 显示上/下课倒计时和进度条

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
- [手环端 `rpk` 文件](https://github.com/Jursin/Schedule-Vela/releases/latest)
- [安卓端同步器](https://github.com/Jursin/Schedule-Sync/releases/latest)

  <a href="https://www.bandbbs.cn/resources/5772/">
    <img src="/images/schedule-vela/get-it-on-bandbbs.png" style="height:60px;">
  </a>

::: important
本手环端快应用根据[Xiaomi Vela JS 应用开发文档](https://iot.mi.com/vela/quickapp/)开发，理论上支持小米 Vela 穿戴设备
:::

### 向手环安装快应用
[![astrobox](https://astrobox.online/goab/zhcn/black.svg)](https://astrobox.online/open?source=resv2&id=5772&provider=BandBBS)

[或通过**自定义表盘工具**](https://api.bandbbs.cn/wftools/bandbbs.html?code=A&state=1855993){.readmore}

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

    <img src="/images/schedule-vela/WakeUp课程表导出.png" alt="WakeUp课程表导出.png" class="wakeup-export" width="50%">
- [CSES](https://cloud.smart-teach.cn/)

### 在手机端传递配置文件

::: text-image
@text
- 先确保`小米运动健康`已连接到穿戴设备
- 打开`腕上课程表同步器`，会自动连接穿戴设备并打开快应用
- 点击`选择配置文件`按钮选择 `json`/`wakeup_schedule` 文件
- 点击`确认导入`按钮，手环端会提示导入成功
@image src="/images/schedule-vela/Schedule-Sync.png"
:::

<style>
@media screen and (max-width: 768px) {
  .wakeup-export {
    width: 100%;
  }
}
</style>