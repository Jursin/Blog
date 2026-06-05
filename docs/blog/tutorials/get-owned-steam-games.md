---
title: 通过 Steam Web API 获取玩家所拥有游戏的列表
createTime: 2026/06/05 13:32:42
tags:
  - Steam
---

> 通过官方接口获取自己的 ==Steam 游戏库==列表方便展示在自己的网站上

<!-- more -->

[详情请阅读 **Steam Web API** 文档](https://partner.steamgames.com/doc/webapi_overview){.readmore}

## 获取用户密钥
- 同意 [Steam Web API 使用条款](http://steamcommunity.com/dev/apiterms)
- 在 [Steam 社区注册页面](https://steamcommunity.com/dev/apikey)创建用户 Web API 密钥

::: important
请**妥善保管**好自己的 **Steam Web API 密钥**，不要暴露在任何**前端页面**或**公共仓库**，建议使用云函数等服务**代理接口**。
:::

## 获取 Steam ID
- 访问 [主页 > 帐户](https://store.steampowered.com/account/)，复制显示的 Steam ID
- 访问个人资料页面，URL 中 `https://steamcommunity.com/profiles/xxxxx/` 的最后一段即为 Steam ID

## 请求 GetOwnedGames 接口
```
GET https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/
```

### 参数
:::: field-group
::: field name="key" type="string" required
Steamworks Web API 用户验证密钥。
:::

::: field name="steamid" type="uint64" required
要查询的玩家。
:::

::: field name="include_appinfo" type="bool" optional
如果我们需要各游戏的更多信息（如名称、图标等），为 true。
:::

::: field name="include_played_free_games" type="bool" optional
默认不包含免费游戏。若设置，将返回用户玩过的免费游戏。
:::

::: field name="appids_filter" type="uint32" optional
若设置，将结果集限制在传入的应用。
:::
::::

### 示例
```
GET https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=your_web_api_key&steamid=your_steamid&include_appinfo=true&include_played_free_games=true
```

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