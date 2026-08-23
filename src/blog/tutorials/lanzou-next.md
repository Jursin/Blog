---
title: 开发了一个蓝奏云桌面客户端
createTime: 2026/08/23 10:41:01
tags:
    - 蓝奏云
    - Tauri
---

> 一个轻量、美观的跨平台蓝奏云第三方客户端。

<!-- more -->

![](https://img.shields.io/badge/Tauri-2.11-24C8D8?logo=tauri)
![](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs)
![](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![](https://img.shields.io/badge/Rust-1.97-black?logo=rust)
[![](https://img.shields.io/badge/爱发电-赞助我-946CE6?logo=afdian)](https://afdian.com/a/jursin)

<GitHubCard repo="Jursin/lanzou-next" />

## 🖼️ 截图

| ![](/images/lanzou-next/1.png) | ![](/images/lanzou-next/2.png) |
| - | - |
| ![](/images/lanzou-next/3.png) | ![](/images/lanzou-next/4.png) |

## ✨ 功能特性

- **文件管理**：浏览、搜索、排序、重命名、移动、删除文件/文件夹
- **上传**：大文件自动分片上传、文件夹递归上传、上传预检
- **下载**：多线程断点续传、分片合并下载、自定义下载目录
- **分享解析**：解析分享链接、提取码自动填充
- **回收站**：查看、恢复、彻底删除
- **个性化**：预设配色方案、浅色/深色主题
- **账号管理**：账号密码登录、Cookie 自动持久化
- **更新检查**：启动时自动检查、手动检查、接收测试版更新、更新后自动安装并重启
- **日志查看**：实时记录日志、可选日志级别、一键清理

## 支持的平台

| 系统 | |
|:---|:---|
| **Windows** | ![Setup-x64](https://img.shields.io/badge/Setup-x64-blue.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik02LDZoMTd2MTdINlY2eiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNS4wNDIsMjIuOTU4VjZINDJ2MTYuOTU4SDI1LjA0MnoiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNiwyNWgxN3YxN0g2VjI1eiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNSw0MlYyNWgxN3YxN0gyNXoiLz48L3N2Zz4=) ![Portable-x64](https://img.shields.io/badge/Portable-x64-blue.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik02LDZoMTd2MTdINlY2eiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNS4wNDIsMjIuOTU4VjZINDJ2MTYuOTU4SDI1LjA0MnoiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNiwyNWgxN3YxN0g2VjI1eiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNSw0MlYyNWgxN3YxN0gyNXoiLz48L3N2Zz4=)<br>![Setup-arm64](https://img.shields.io/badge/Setup-arm64-blue.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik02LDZoMTd2MTdINlY2eiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNS4wNDIsMjIuOTU4VjZINDJ2MTYuOTU4SDI1LjA0MnoiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNiwyNWgxN3YxN0g2VjI1eiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNSw0MlYyNWgxN3YxN0gyNXoiLz48L3N2Zz4=) ![Portable-arm64](https://img.shields.io/badge/Portable-arm64-blue.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik02LDZoMTd2MTdINlY2eiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNS4wNDIsMjIuOTU4VjZINDJ2MTYuOTU4SDI1LjA0MnoiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNiwyNWgxN3YxN0g2VjI1eiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNSw0MlYyNWgxN3YxN0gyNXoiLz48L3N2Zz4=) |
| **Linux** | ![DebPackage-x64](https://img.shields.io/badge/DebPackage-x64-A81D33.svg?logo=debian&logoColor=A81D33) ![RpmPackage-x64](https://img.shields.io/badge/RpmPackage-x64-EE0000.svg?logo=redhat&logoColor=EE0000) ![ArchPackage-x64](https://img.shields.io/badge/ArchPackage-x64-1793D1.svg?logo=archlinux&logoColor=1793D1) ![AppImage-x64](https://img.shields.io/badge/AppImage-x64-FCC624.svg?logo=linux&logoColor=FCC624)<br>![DebPackage-arm64](https://img.shields.io/badge/DebPackage-arm64-A81D33.svg?logo=debian&logoColor=A81D33) ![RpmPackage-arm64](https://img.shields.io/badge/RpmPackage-arm64-EE0000.svg?logo=redhat&logoColor=EE0000) ![ArchPackage-arm64](https://img.shields.io/badge/ArchPackage-arm64-1793D1.svg?logo=archlinux&logoColor=1793D1) ![AppImage-arm64](https://img.shields.io/badge/AppImage-arm64-FCC624.svg?logo=linux&logoColor=FCC624) |
| **macOS** | ![DMG-Apple Silicon](https://img.shields.io/badge/DMG-Apple%20Silicon-000000.svg?logo=apple)<br>![DMG-Intel x64](https://img.shields.io/badge/DMG-Intel%20x64-0071C5.svg?logo=apple) |

## ⚙️ 配置说明

配置文件位置（由 `tauri-plugin-store` 管理）：

| 平台 | 路径 |
|------|------|
| Windows | `%APPDATA%\com.lanzou.next\config.json` |
| Linux | `~/.config/com.lanzou.next/config.json` |
| macOS | `~/Library/Application Support/com.lanzou.next/config.json` |

## 📜 许可证

[MIT License](https://github.com/Jursin/lanzou-next/blob/main/LICENSE)

## 🙏 致谢

- 后端核心逻辑移植自 [chenhb23/lanzouyun-disk](https://github.com/chenhb23/lanzouyun-disk)
- 前端界面参考 [AnInsomniacy/motrix-next](https://github.com/AnInsomniacy/motrix-next)
- 蓝奏云接口逆向分析参考 [zaxtyson/LanZouCloud-API](https://github.com/zaxtyson/LanZouCloud-API)
- UI 组件库 [Naive UI](https://www.naiveui.com/)
- 桌面框架 [Tauri](https://tauri.app/)

## 📄 免责声明
本项目仅供个人学习和技术研究使用。
- **使用限制**：禁止将本项目用于任何违法行为，请遵守蓝奏云服务条款及相关法律法规。
- **责任声明**：你应了解相应的风险，因使用本项目产生的任何法律纠纷或损失，均由使用者自行承担。
- **争议处理**：如版权方认为本项目侵犯其权益，请通过 Issues 联系，我们将积极配合处理。

## 🌟 星标历史
[![Stargazers over time](https://starcharts.vercel.app/Jursin/lanzou-next.svg?variant=adaptive)](https://starchart.cc/Jursin/lanzou-next)
