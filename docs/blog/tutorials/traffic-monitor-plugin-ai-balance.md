---
title: 用 AI 写了一个在任务栏显示 AI 账单余额的 TrafficMonitor 插件 
createTime: 2026/06/16 21:49:45
---

> [TrafficMonitor](https://github.com/zhongyang219/TrafficMonitor) 是一款 Windows 平台的桌面悬浮窗软件，支持实时显示网络、硬件等信息，并支持任务栏显示、多种皮肤和插件系统。

<!-- more -->

<GitHubCard repo="Jursin/TrafficMonitorPlugin_AIBalance" />

如果觉得不错给个 ==Star== 支持一下吧🌟

## 准备
- 下载 [TrafficMonitor](https://github.com/zhongyang219/TrafficMonitor/releases/latest)
- 下载我写的 [AIBalance](https://github.com/Jursin/TrafficMonitorPlugin_AIBalance/releases/latest) 插件

::: tip
如果无法访问 GitHub 网站，可以通过[镜像站](https://github.akams.cn/)下载
:::

## 使用
- 将下载的 `AIBalance.dll` 放在 **TrafficMonitor** 的 `plugins` 目录下
- 运行 `TrafficMonitor.exe` 主程序
- 在程序右键菜单中勾选**显示任务栏窗口**
- 在程序右键菜单中点击**插件管理**，应该能显示 AIBalance 插件和加载成功信息

  <img src="/images/traffic-monitor-plugin-ai-balance/plugin-management.png" width="500px">
- 右键插件点击**选项**，在选项窗口填写 API Key，可设置刷新频率（默认 5 分钟）

  <img src="/images/traffic-monitor-plugin-ai-balance/AIBalance-options.png" width="450px">
- 任务栏鼠标悬浮框内也会显示余额

  <img src="/images/traffic-monitor-plugin-ai-balance/hover.png" width="200px">
- 支持的提供商
  - [DeepSeek](https://platform.deepseek.com/api_keys)
  - [Xiaomi MiMo](https://platform.xiaomimimo.com/console/api-keys)
  - [Kimi](https://platform.kimi.com/console/api-keys)
  - [智谱](https://bigmodel.cn/apikey/platform)
  - [硅基流动](https://cloud.siliconflow.cn/me/account/ak)

  ::: note
  调用 **Xiaomi MiMo** 接口需要自行提供 **Cookie**，且只有 **1 天**时效
  :::
- 在程序右键菜单中点击**显示设置**，勾选需要显示的 AI 账单余额

[详细文档见 **TrafficMonitor Wiki**](https://github.com/zhongyang219/TrafficMonitor/wiki){.readmore}

## 注意
- 插件本身只是通过请求**官方 API 接口**获取余额数据并显示
- 插件不会收集你的敏感信息，所有配置保存在本地，您可自行前往 GitHub 仓库查看
- 插件为 **AI 辅助编写**，如介意请不要使用

## 感谢
感谢 [zhongyang219](https://github.com/zhongyang219) 开发者开发出本软件并提供插件系统