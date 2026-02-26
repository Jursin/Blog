---
title: 在安卓设备上通过 Termux 使用 adb 无线调试配对本设备
createTime: 2026/02/16 16:13:57
tags:
  - Termux
  - adb
permalink: /blog/nddmqo09/
---

> 由于需要启用无线调试，请确保 Android 版本在 11 及以上，且连接到 WLAN。

<!-- more -->

::: steps
1. 打开 `Termux`，安装 `android-tools` 包

   ```bash
   pkg install android-tools
   ```

2. 打开系统`设置`，连续点击系统版本，启用`开发者模式`
3. 进入`设置-更多设置-开发者选项-调试`，启用`无线调试`并进入

   <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: nowrap;">
     <img src="/images/adb-termux/1.jpg" alt="调试" style="width: 48%;" />
     <img src="/images/adb-termux/2.jpg" alt="无线调试" style="width: 48%;" />
   </div>

4. 点击`使用配对码配对设备`
5. 以小窗模式打开 `Termux`

   - 运行配对命令

     ```bash
     adb pair 192.168.0.xxx:xxxxx
     ```

     ::: tip
     `IP 地址和端口`替换为提示框中的实际内容
     :::

   - 回车后输入提示框中的 `WLAN 配对码`再回车
   - 运行连接命令

     ```bash
     adb connect 192.168.0.xxx:xxxxx
     ```

     ::: warning
     `IP 地址和端口`替换为无线调试页面中的实际内容，不是提示框中的
     :::
6. 连接成功，可运行以下命令查看连接设备

   ```bash
   adb devices
   ```
:::