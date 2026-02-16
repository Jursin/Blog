---
title: Termux 安装与美化
createTime: 2025/08/29 15:52:51
tags:
  - Termux
---

@[bilibili](BV17CekzXEEh)

> Termux 是一个适用于 Android 的终端模拟器，其环境类似于 Linux 环境, 无需 Root 或设置即可使用。

## 下载 Termux（任选一个渠道）

<a href="https://github.com/termux/termux-app/releases/latest" ><img src="https://termux.dev/assets/globals/hosts/get-it-on-github.png" alt="GitHub" width="200" /></a>
<a href="https://f-droid.org/zh_Hans/packages/com.termux/"><img src="https://termux.dev/assets/globals/hosts/get-it-on-fdroid.png" alt="F-Droid" width="200" /></a>

- 下载 `Termux:Styling`
  - [在 GitHub 上获取](https://github.com/termux/termux-styling/releases/latest)
  - [在 F-Droid 上获取](https://f-droid.org/packages/com.termux.styling/)

::: tip
- 请自行解决 GitHub 访问问题
- 尽管 F-Droid 网页端提供了 APK 安装包的下载选项，但你应该注意，以这种方式安装将不会收到更新通知，这是一种不太安全的下载方式。官方建议你安装使用 F-Droid 客户端。
:::

::: warning
不同来源的 APK 文件使用不同的签名密钥进行签名，请勿尝试混用不同来源的 APK 文件。例如，不要尝试从 `F-Droid` 安装一个应用或插件（如 `Termux:Styling`），然后再从其他来源（如 `Github` ）安装另一个。
:::

- GitHub 文件加速：[https://github.akams.cn](https://github.akams.cn)
- F-Droid 客户端下载<Badge type="tip" text="可选但推荐" />：[https://gitlab.com/fdroid/fdroidclient/-/releases/](https://gitlab.com/fdroid/fdroidclient/-/releases/)
  - 镜像仓库 URL：`https://mirrors.tuna.tsinghua.edu.cn/fdroid/repo/?fingerprint=43238D512C1E5EB2D6569F4A3AFBF5523418B82E0A3ED1552770ABB9A9C9CCAB`

## 开始
- 隐藏 欢迎语
  ```bash
  touch .hushlogin
  ```
- 设置外部存储访问权限<Badge type="tip" text="可选" />
  ```bash
  termux-setup-storage
  ```
- 切换镜像源
  ```bash
  termux-change-repo
  ```
- 更新软件包列表
  ```bash
  pkg update
  ```
- 升级已安装的软件包
  ```bash
  pkg upgrade
  ```
  > 可添加 `-y` 参数自动确认
- 安装 fastfetch oh-my-posh fish
  ```bash
  pkg install fastfetch oh-my-posh fish
  ```
- [为 Termux 注入文件提供器后通过其修改文件](#通过-mt-管理器-访问-termux-目录)<Badge type="tip" text="可选" />
- 配置 bash
  ```txt title="~/.bashrc"
  fastfetch // 隐藏 logo: fastfetch --logo none
  exec fish
  ```
- 下载主题
  ```bash
  curl -s https://ohmyposh.dev/install.sh | bash -s
  ```
- 配置 fish
  ```txt title="~/.config/fish/config.fish"
  set -g fish_greeting ""
  oh-my-posh init fish --config ~/.cache/oh-my-posh/themes/montys.omp.json | source
  echo -ne "\e[5 q" // 光标形状：下划线
  ```
- 下载 Nerd 字体：推荐 [JetBrains Maple Mono](https://fonts.zeoseven.com/items/521/)
- 代码编辑器：推荐 [Acode](https://f-droid.org/packages/com.foxdebug.acode)

## 通过 [MT 管理器](https://mt2.cn/) 访问 Termux 目录<Badge type="tip" text="可选" />
### Root 用户
直接访问主目录：`/data/user/0/com.termux/files/home/`

## 非 Root 用户
::: steps

1. 注入文件提供器

   通过 MT 管理器为下载的 Termux 安装包注入文件提供器，再安装注入好后的安装包

2. 添加本地存储

   点击 MT 管理器左侧右上角的更多按钮，点击`添加本地存储`，展开左侧面板后选择 Termux 应用

3. 后续即可通过 MT 管理器访问 Termux 目录

:::

## 其它推荐软件包
- android-tools：Android 开发工具包
- git: 版本控制系统
- nodejs: 包管理器
- python