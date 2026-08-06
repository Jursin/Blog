---
title: 在安卓手机上使用 Unlock Music CLI 版
createTime: 2025/12/04 17:12:45
tags:
  - Termux
  - Unlock Music
cover: /images/unlock-music.png
---

> Unlock Music 是一个移除已购音乐加密保护的开源项目，支持多种格式。本文介绍如何在安卓手机上通过 Termux 应用使用 Unlock Music CLI 版，使用时请自觉**遵守项目相关协议**。

<!-- more -->

## 准备

一键安装脚本：
```bash [install.sh]
#!/bin/bash
curl -sL -o um.tar.gz "$(curl -s https://git.um-react.app/api/v1/repos/um/cli/releases/latest | grep -oE '"https[^"]*linux-arm64[^"]*\.tar\.gz"' | tr -d '"')" #下载最新版附件
tar -xzf um.tar.gz
rm um.tar.gz
mkdir -p ~/.local/bin
mv um ~/.local/bin/um
chmod 550 ~/.local/bin/um #授予执行权限
grep -qF 'export PATH="$HOME/.local/bin:$PATH"' ~/.bashrc || echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc #添加环境变量
```

## 使用
- `um [-o <output dir>] [-i] <input dir/file>`
- `um -h` 显示帮助菜单

::: tip
如需处理外部存储的音乐文件需执行 `termux-setup-storage`
:::

## 更多
CLI 版适合批量处理，但该项目也有网页版：
- 原网页版：https://legacy.um-react.app/
- 新网页版：https://demo.um-react.app/