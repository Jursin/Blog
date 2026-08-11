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

<GitHubCard repo="Jursin/Schedule-Vela" />

## 功能特性
- [X] 以卡片形式显示每日课程及详细信息
- [X] 用主题色高亮正在进行的课程卡片
- [X] 每日课程分时间段显示
- [X] 可自由切换显示上/下一天课程
- [X] 点击课程卡片进入全屏显示
- [X] 显示上/下课倒计时和进度条
- [X] 上课时详情页显示下一节课课程和教室
- [X] 支持隐藏授课老师、首页文本居中等偏好
- [X] 支持多种预设主题色
- [X] 支持导入[拾光课程表](https://sgschedule.jursin.top/)、[WakeUp课程表](https://www.wakeup.fun/)和 [CSES](https://cloud.smart-teach.cn/) 的配置文件

## 预览图
### Xiaomi-Band
![](/images/schedule-vela/Xiaomi-Band.png)

### Xiaomi-Band-10
![](/images/schedule-vela/Xiaomi-Band-10.png)

### Xiaomi-Band-Pro
![](/images/schedule-vela/Xiaomi-Band-Pro.png)

## 开始使用
### 准备
- [AstroBox 客户端](https://astrobox.online/downloads) <Badge text="推荐" />
- [表盘自定义工具](https://www.bandbbs.cn/threads/9797/)*（如果 AstroBox 不支持你的穿戴设备，可以使用这个）*
- [同步器APP](https://gh.dpik.top/https://github.com/Jursin/Schedule-Sync/releases/latest/download/app-release.apk)*（如果不能使用 AstroBox 插件可以用这个）*

### 向手环安装快应用
[![astrobox](https://astrobox.online/goab/zhcn/black.svg)](https://astrobox.online/open?source=resv2&id=com.schedule.vela&provider=OfficialV2)

[![自定义表盘工具](https://img.shields.io/badge/%E9%80%9A%E8%BF%87%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E7%9B%98%E5%B7%A5%E5%85%B7%E8%8E%B7%E5%8F%96-black?style=for-the-badge)](https://api.bandbbs.cn/wftools/bandbbs.html?code=A&state=1855993)

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
#### 通过同步器 APP
::: text-image
@text
- 先确保`小米运动健康`已连接到穿戴设备
- 打开`腕上课程表同步器`，会自动连接穿戴设备并打开快应用
- 点击`选择配置文件`按钮选择 `json`/`wakeup_schedule` 文件
- 点击`确认导入`按钮，手环端会提示导入成功
@image src="/images/schedule-vela/Schedule-Sync.png"
:::

#### 通过 AstroBox 插件
- 在 AstroBox 插件市场搜索**腕上课程表同步器**
- 安装插件后打开
- 操作流程与同步器 APP 类似，提示需要权限使允许即可

## 常见问题
### 为什么没有编辑课表功能？
穿戴设备屏幕小，不方便操作，且手机端编辑好后导入更高效，所以短期内不考虑实现。

### 为什么应用不能放在首页小组件页面？
官方没开放实现方式，我也没办法。

### 手机端同步器能不能添加编辑课表功能？
没必要。可以在 WakeUp课程表、拾光课程表、CSES Cloud 编辑好课表后导入，重复造轮子无意义。

### 可以适配小爱课程表导入吗？
暂不考虑。现在小爱课程表难以打开，且没有导出配置文件的功能。手动适配难度大、收益低，如果一定要使用建议直接使用相关衍生项目。

### 可不可以适配其它设备？
本快应用根据Xiaomi Vela JS 应用开发文档开发，理论上支持文档提到的[小米 Vela 穿戴设备](https://iot.mi.com/vela/quickapp/zh/guide/multi-screens/)。但因为我只有小米手环 9，所以除了这个设备屏幕适配较好外，其它设备屏幕适配可能不太好，但仍可以尝试安装。


<style>
@media screen and (max-width: 768px) {
  .wakeup-export {
    width: 100%;
  }
}
</style>