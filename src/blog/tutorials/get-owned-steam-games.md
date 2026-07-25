---
title: 通过 Steam Web API 获取玩家游戏列表并展示在个人网站
createTime: 2026/06/05 13:32:42
tags:
  - Steam
---

> 通过 Steam 官方接口获取游戏库列表并展示在个人网站，需用云函数代理解决 **CORS 跨域**和 **API Key 暴露**等问题。

<!-- more -->

[详情请阅读 **Steam Web API** 文档](https://partner.steamgames.com/doc/webapi_overview){.readmore}

## 架构概览

```
前端组件 → 云函数代理 → Steam API
```

- **前端**：只请求自己的云函数，不直接接触 Steam API
- **云函数**：持有 API Key，转发请求到 Steam，返回结果给前端
- **Steam API**：官方数据源，只接受带 Key 的服务端请求

这样做解决两个核心问题：
1. **CORS**：浏览器直接请求 `api.steampowered.com` 会被拦截，云函数配置 CORS 头中转即可
2. **API Key 暴露**：Key 只存在于云函数，不会出现在前端代码或仓库中

## 前置准备

### 获取 Steam Web API 密钥

1. 同意 [Steam Web API 使用条款](http://steamcommunity.com/dev/apiterms)
2. 在 [Steam 社区注册页面](https://steamcommunity.com/dev/apikey)创建用户 Web API 密钥

::: important
需**妥善保管**密钥，不要出现在前端代码、公共仓库或浏览器网络请求中。
:::

### 获取 Steam ID

两种方式任选：
- 访问 [主页 > 帐户](https://store.steampowered.com/account/)，页面显示有 Steam ID
- 个人资料 URL 中 `https://steamcommunity.com/profiles/xxxxx/` 的 `xxxxx` 即为 Steam ID

## 搭建云函数代理

使用如阿里云函数计算 (FC)、腾讯云云函数 (SCF)、Cloudflare Workers、Vercel Functions、Netlify Functions 等。

### 核心逻辑

拼接参数并携带 Key 和 ID → 请求 Steam API → 返回结果给前端

```
https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${KEY}&steamid=${ID}&include_appinfo=true&include_played_free_games=true
```

### 关键实现

- **隐藏 API Key**：云函数提前携带 Key 参数完成认证，前端请求不感知 Key
- **CORS 配置**：云函数需返回正确响应头，并对 OPTIONS 预检请求返回 204：

  ```
  Access-Control-Allow-Origin: https://your_domain
  Access-Control-Allow-Methods: GET, OPTIONS
  ```

## 前端组件

前端仅需请求云函数地址，附上 Steam API 参数即可。

```
GET ${PROXY}/IPlayerService/GetOwnedGames/v1/?include_appinfo=true&include_played_free_games=true
```

### 参数

| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| include_appinfo | boolean | 否 | `false` | 如果需要各游戏的更多信息（如名称、图标等），为 true |
| include_played_free_games | boolean | 否 | `false` | 默认不包含免费游戏。若设置，将返回用户玩过的免费游戏 |
| appids_filter | uint32 | 否 | — | 若设置，将结果集限制在传入的应用。格式为 `appids_filter[0]=xxx`，一次传一个 |

### 示例响应
```json
{
  "response": {
    "game_count": 2,
    "games": [
      {
        "appid": 105600,
        "name": "Terraria",
        "playtime_forever": 213,
        "img_icon_url": "858961e95fbf869f136e1770d586e0caefd4cfac",
        "has_community_visible_stats": true,
        "playtime_windows_forever": 213,
        "playtime_mac_forever": 0,
        "playtime_linux_forever": 0,
        "playtime_deck_forever": 0,
        "rtime_last_played": 1772289546,
        "playtime_disconnected": 2
      },
      {
        "appid": 413150,
        "name": "Stardew Valley",
        "playtime_forever": 198,
        "img_icon_url": "35d1377200084a4034238c05b0c8930451e2fb40",
        "has_community_visible_stats": true,
        "playtime_windows_forever": 198,
        "playtime_mac_forever": 0,
        "playtime_linux_forever": 0,
        "playtime_deck_forever": 0,
        "rtime_last_played": 1759891823,
        "playtime_disconnected": 5
      }
    ]
  }
}
```

#### 数据字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| response.games.appid | integer | 游戏唯一标识 ID |
| response.games.name | string | 游戏名称 |
| response.games.playtime_2weeks | integer | 过去 2 周游玩时间（分钟） |
| response.games.playtime_forever | integer | 总游玩时间（分钟） |
| response.games.img_icon_url | string | 游戏图标的文件名 |
| response.games.has_community_visible_stats | boolean | 是否公开社区统计数据 |
| response.games.playtime_windows_forever | integer | Windows 平台总游玩时间（分钟） |
| response.games.playtime_mac_forever | integer | Mac 平台总游玩时间（分钟） |
| response.games.playtime_linux_forever | integer | Linux 平台总游玩时间（分钟） |
| response.games.playtime_deck_forever | integer | Steam Deck 平台总游玩时间（分钟） |
| response.games.rtime_last_played | integer | 上次游玩的 Unix 时间戳 |
| response.games.playtime_disconnected | integer | 离线状态下游玩的分钟数 |