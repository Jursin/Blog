---
title: 通过 Steam Web API 获取玩家游戏列表并展示在个人网站
createTime: 2026/06/05 13:32:42
tags:
  - Steam
---

> 通过 Steam 官方接口获取游戏库列表并展示在个人网站，需要通过云函数解决 **CORS 跨域**和 **API Key 暴露**等问题。

<!-- more -->

[详情请阅读 **Steam Web API** 文档](https://partner.steamgames.com/doc/webapi_overview){.readmore}

## 整体思路

```
前端组件 → 云函数代理 → Steam API
```

- **前端**：组件负责展示，只请求自己的云函数
- **云函数**：持有 API Key，转发请求到 Steam，再返回结果
- **Steam API**：官方数据源，只接受带 Key 的服务端请求

这样做的两个好处：
1. **解决 CORS**：浏览器直接请求 `api.steampowered.com` 会被拦截，通过配置了 CORS 的云函数中转即可
2. **隐藏 API Key**：Key 只存在于云函数中，前端代码和仓库中完全不出现

## 获取 Steam Web API 用户密钥

1. 同意 [Steam Web API 使用条款](http://steamcommunity.com/dev/apiterms)
2. 在 [Steam 社区注册页面](https://steamcommunity.com/dev/apikey)创建用户 Web API 密钥

::: important
**妥善保管**密钥，不要出现在前端代码、公共仓库或浏览器网络请求中。
:::

## 获取 Steam ID

两种方式任选：
- 访问 [主页 > 帐户](https://store.steampowered.com/account/)，页面显示有 Steam ID
- 访问个人资料页面，URL 中 `https://steamcommunity.com/profiles/xxxxx/` 的 `xxxxx` 即为 Steam ID

## 搭建云函数代理

如阿里云函数计算 (FC)、腾讯云云函数 (SCF)、Cloudflare Workers、Vercel Functions、Netlify Functions 等

### 核心逻辑

接收前端请求 → 拼接 Steam API 参数 → 转发 → 返回结果

```
前端 GET ${PROXY}/IPlayerService/GetOwnedGames/v1/?include_appinfo=true&include_played_free_games=true
       ↓
云函数拼接完整 URL：
https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key={KEY}&steamid={ID}&include_appinfo=true&include_played_free_games=true
       ↓
请求 Steam API，返回 JSON 给前端
```

### 关键设计

- **隐藏 API Key**

  提前携带 Key 参数，完成认证且避免暴露

- **CORS 响应头**

  云函数需要返回正确的 CORS 头，否则浏览器会拦截响应：

  ```
  Access-Control-Allow-Origin: https://your_domain
  Access-Control-Allow-Methods: GET, OPTIONS
  ```

  对于预检请求（OPTIONS 方法），直接返回 204 空响应即可

## 前端组件

组件只请求自己的云函数地址，不直接接触 Steam API：

```
GET ${PROXY}/IPlayerService/GetOwnedGames/v1/?include_appinfo=true&include_played_free_games=true
```

### 参数
:::: field-group
::: field include_appinfo
@type boolean
@optional
@default `false`
如果我们需要各游戏的更多信息（如名称、图标等），为 true。
:::

::: field include_played_free_games
@type boolean
@optional
@default `false`
默认不包含免费游戏。若设置，将返回用户玩过的免费游戏。
:::

::: field appids_filter
@type uint32
@optional
若设置，将结果集限制在传入的应用。格式为 `appids_filter[0]=xxx`，一次传一个。
:::
::::

### 示例响应
```json
{
  "response": {
    "game_count": 5,
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
        "appid": 255710,
        "name": "Cities: Skylines",
        "playtime_forever": 62,
        "img_icon_url": "6cf7b10dd29db28448ef79698ed2118a03617d63",
        "has_community_visible_stats": true,
        "playtime_windows_forever": 62,
        "playtime_mac_forever": 0,
        "playtime_linux_forever": 0,
        "playtime_deck_forever": 0,
        "rtime_last_played": 1754831594,
        "playtime_disconnected": 0
      },
      {
        "appid": 322330,
        "name": "Don't Starve Together",
        "playtime_forever": 113,
        "img_icon_url": "a80aa6cff8eebc1cbc18c367d9ab063e1553b0ee",
        "playtime_windows_forever": 113,
        "playtime_mac_forever": 0,
        "playtime_linux_forever": 0,
        "playtime_deck_forever": 0,
        "rtime_last_played": 1772286418,
        "playtime_disconnected": 1
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
      },
      {
        "appid": 431960,
        "name": "Wallpaper Engine",
        "playtime_2weeks": 58,
        "playtime_forever": 100,
        "img_icon_url": "72edaed9d748c6cf7397ffb1c83f0b837b9ebd9d",
        "has_community_visible_stats": true,
        "playtime_windows_forever": 100,
        "playtime_mac_forever": 0,
        "playtime_linux_forever": 0,
        "playtime_deck_forever": 0,
        "rtime_last_played": 1779675749,
        "playtime_disconnected": 3
      }
    ]
  }
}
```

#### 数据说明

:::: field-group
::: field response.games.appid
@type integer
游戏唯一标识 ID
:::

::: field response.games.name
@type string
游戏名称
:::

::: field response.games.playtime_2weeks
@type integer
过去 2 周游玩时间（分钟）
:::

::: field response.games.playtime_forever
@type integer
总游玩时间（分钟）
:::

::: field response.games.img_icon_url
@type string
游戏图标的文件名
:::

::: field response.games.has_community_visible_stats
@type boolean
是否公开社区统计数据
:::

::: field response.games.playtime_windows_forever
@type integer
Windows 平台总游玩时间（分钟）
:::

::: field response.games.playtime_mac_forever
@type integer
Mac 平台总游玩时间（分钟）
:::

::: field response.games.playtime_linux_forever
@type integer
Linux 平台总游玩时间（分钟）
:::

::: field response.games.playtime_deck_forever
@type integer
Steam Deck 平台总游玩时间（分钟）
:::

::: field response.games.rtime_last_played
@type integer
上次游玩的 Unix 时间戳
:::

::: field response.games.playtime_disconnected
@type integer
离线状态下游玩的分钟数
:::
::::