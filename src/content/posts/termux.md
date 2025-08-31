---
title: Termux
published: 2025-08-29
updated: 2025-08-29
description: 'Termux 安装与美化'
image: ''
tags: [Termux]
category: 'Termux'
draft: false 
---

# Termux 安装与美化

> Termux 是一个适用于 Android 的终端模拟器，其环境类似于 Linux 环境, 无需 Root 或设置即可使用。

## 下载 Termux

<a href="https://github.com/termux/termux-app/releases/latest" ><img src="https://termux.dev/assets/globals/hosts/get-it-on-github.png" alt="GitHub" width="200" /></a>
<a href="https://f-droid.org/en/packages/com.termux/"><img src="https://termux.dev/assets/globals/hosts/get-it-on-fdroid.png" alt="F-Droid" width="200" /></a>

- GitHub 文件加速：https://github.akams.cn
- F-Droid 客户端下载：https://gitlab.com/fdroid/fdroidclient/-/releases/
- 镜像仓库 URL：https://mirrors.tuna.tsinghua.edu.cn/fdroid/repo/?fingerprint=43238D512C1E5EB2D6569F4A3AFBF5523418B82E0A3ED1552770ABB9A9C9CCAB

## 开始
- 隐藏 欢迎语
  ```bash
  touch .hushlogin
  ```
- 设置外部存储访问权限（可选）
  ```bash
  termux-setup-storage
  ```
- 切换镜像源
  ```bash
  termux-change-repo
  ```
- 更新软件包
  ```bash
  pkg upgrade
  ```
- 安装 fastfetch oh-my-posh fish
  ```bash
  pkg install fastfetch oh-my-posh fish
  ```
- 配置 bash
  ```txt
  fastfetch # 隐藏 logo: fastfetch --logo none
  exec fish
  ```
- 下载主题
  ```bash
  curl -s https://ohmyposh.dev/install.sh | bash -s
  ```
- 配置 fish
  ```txt
  set -g fish_greeting ""
  oh-my-posh init fish --config ~/.cache/oh-my-posh/themes/montys.omp.json | source
  ```
- 下载字体：https://www.nerdfonts.com/font-downloads
- 代码编辑器 Acode：https://f-droid.org/packages/com.foxdebug.acode

## 其它推荐软件包
- android-tools：Android 开发工具包
- git: 版本控制系统
- nodejs: 包管理器
- python