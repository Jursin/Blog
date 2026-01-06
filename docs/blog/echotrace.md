---
title: EchoTrace：开源微信聊天记录分析工具，支持数据分析、群聊分析与导出记录
createTime: 2026/01/05 16:46:54
tags: 
  - 微信
  - 数据导出
  - 年度报告
copyright:
  author: 
    name: "ycccccccy"
    url: "https://github.com/ycccccccy"
  creation: "reprint"
  source: "https://github.com/ycccccccy/echotrace/blob/main/docs/beginner_guide.md"
---

> 本文根据项目文档编写，仅供参考。遇到问题请在 GitHub 提交 [Issue](https://github.com/ycccccccy/echotrace/issues) 或向他人请教，也建议有能力的人给该项目一个 Star 鼓励作者 🌟

::: tip
**适用平台**：Windows 10+

**发行版下载**：[https://github.com/ycccccccy/echotrace/releases](https://github.com/ycccccccy/echotrace/releases)

**镜像下载**<Badge text="国内推荐" />：[https://openlist.jursin.top/@s/S7Frr60o](https://openlist.jursin.top/@s/S7Frr60o)
:::

<GitHubCard owner="ycccccccy" repo="echotrace" />

---

## 准备工作
- **下载 EchoTrace**：点击`发行版`链接跳转后下载最新版本的 `zip` 压缩包，或访问我提供的 **OpenList** 分享链接下载（使用 GitHub 第三方镜像加速文件下载）
- **运行**：解压后双击运行文件夹下的 `echotrace.exe` 

  ::: file-tree
  - echotrace-windows-vx.x.x
    - data/
      - ...
    - audioplayers_windows_plugin.dll
    - **echotrace.exe**
    - file_saver_plugin.dll
    - flutter_windows.dll
    - go_decrypt.dll
    - mp3lame.dll
    - sqlite3.x64.windows.dll
    - url_launcher_windows_plugin.dll
    - zstd_native.dll
    - zstd.dll
  :::

  ::: warning
  **不要**将软件文件夹放在任何包含**中文**的目录下，**不建议**解压到**桌面**后运行！
  :::

## 基础配置

点击侧边栏左下角设置，按顺序完成以下配置：

### 填写解密密钥
- **解密密钥**：点击`自动获取获取密钥`以自动填充，如果应用内无法获取可下载 [密钥获取工具](https://github.com/ycccccccy/wx_key/releases) 以获取数据库密钥，再手动填写

  ![wx_key](/images/echotrace/wx_key.png)

- 建议点击右上角`测试连接`按钮，确保密钥正确。

### 选择数据库根目录
- 点击`自动检测`按钮，系统通常会自动定位到 `xwechat_files` 目录。
- 若检测失败，可点击`手动选择`选择微信数据存储目录下的 `xwechat_files` 文件夹。

### 确认账号
- 选择路径后会自动检测出wxid，如果检测到多个微信登录过的账号，系统会提示选择 `wxid`，通常选择最新登录的即可。

完成以上步骤后，点击右上角的`保存配置`。

![设置页面](/images/echotrace/setting.png)

::: note 微信图片解密配置<Badge text="可选" />
- 填写 XOR 和 AES 密钥。
- 不填不影响文字聊天记录导出，但应用内无法渲染图片，导出暂不支持附带图片。
:::

## 解密数据库

配置完成后，需要让软件读取并解密你的聊天数据。

### 批量解密

::: steps
1. 点击侧边栏`数据管理`
2. 自动切换到`数据库`页面
3. 点击`批量解密`按钮
4. **耐心等待**程序自动处理所有数据（根据记录多少和性能好坏，耗时一到数十分钟不等）
5. 弹出`批量解密完成`提示即表示解密成功
:::

![数据管理](/images/echotrace/manage_db.png)

::: tip
- 可以先在手机微信上使用 **“迁移与备份 -> 迁移到电脑”** 功能，将手机聊天记录合并到电脑上，然后再运行 EchoTrace 的解密功能，这样就能得到一份数据详实的年度报告了！
- **增量更新**：如果你之后又聊了很多天，只需再次点击`增量更新`，无需重新批量解密。
:::

## 玩转数据（分析与导出）

解密完成后，你可以选择直接在软件内查看分析报告，或者将数据导出以使用 [@hellodigua](https://github.com/hellodigua) 的 [ChatLab](https://chatlab.fun/) 进行更深入的分析。

### A. 数据分析（可视化报告）
点击侧边栏`数据分析`按钮：
- `查看详细年度报告`：深度分析你的聊天数据，发现更多有趣洞察
- `查看双人报告`：选择一位好友，生成专属的双人聊天报告

下方还可以直接查看一些统计数据

### B. 导出聊天记录（UI 界面）
点击侧边栏`导出记录`按钮：
1.  **选择会话**：勾选你想要导出的好友或群聊（支持顶部搜索）。
2.  **设置参数**：
    - **导出位置**：选择一个文件夹用于存放结果（必选）。
    - **日期范围**：可指定时间段，或勾选“导出全部时间”。
    - **导出格式**：
        - `HTML`：**推荐**，类似网页版微信，适合阅读。
        - `Excel`：适合做表格统计。
        - `JSON`：适合开发者进行二次开发。
        - `PostgreSQL`：生成 SQL 文件导入数据库。
3.  点击 **开始导出**。
4.  开始导出后应用将索引并排列会话中所有的消息，若消息量太大页面可能会卡住一会，这是正常现象

![导出记录](/images/echotrace/output.png)

## 进阶功能：命令行导出 (CLI)

如果你需要编写脚本自动备份，可以使用命令行模式。（需先在 UI 界面完成配置和解密）

打开 PowerShell 或 CMD，在程序所在目录执行：

```powershell
# 场景 1：导出所有会话为 HTML 网页
.\echotrace.exe -e C:\MyBackup --format html --all

# 场景 2：仅导出 2024 年的数据（默认格式为 JSON）
.\echotrace.exe -e C:\MyBackup --start 2024-01-01 --end 2024-12-31
```

**参数说明：**
- `-e <目录>`：必填，指定导出路径。
- `--format`：可选 `json` / `html` / `excel`。
- `--all`：导出所有已解密的数据。
- `--start` / `--end`：指定日期范围 (YYYY-MM-DD)。

## 常见问题 (FAQ)

**Q: 提示“未找到 db_storage”或“数据库目录不存在”？**

> A: 请回到设置页，确认“数据库根目录”选择的是 `xwechat_files` 这一层级，不要选到里面的 `all_users` 或 `wxid_xx` 文件夹。

**Q: 导出时列表是空的？**

> A: 必须先在“数据管理”页面点击 **批量解密** 且进度条走完后，导出页面才会显示会话列表。

## 视频教程
<Douyin vid="7590668016951081307" />

<Douyin vid="7590759984041729957" />

## Star 历史
[![Stargazers over time](https://starchart.cc/ycccccccy/echotrace.svg?variant=adaptive)](https://starchart.cc/ycccccccy/echotrace)