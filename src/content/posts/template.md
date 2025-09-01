---
title: 文章示例
published: 2024-05-01
updated: 2025-08-29
description: '了解文章的基本语法。'
image: ''
tags: [示例, Markdown]
category: '示例'
draft: false 
---

## GitHub仓库卡片

::github{repo="Jursin/Blog"}


```markdown
::github{repo="Jursin/Blog"}
```

## 提示框

支持以下类型的提示框：`note` `tip` `important` `warning` `caution`

:::note[注意]
突出显示用户应考虑的信息，即使是在快速浏览时。
:::

:::tip[提示]
帮助用户更成功的可选信息。
:::

:::important[重要]
用户成功所需的关键信息。
:::

:::warning[警告]
由于潜在风险需要用户立即关注的关键内容。
:::

:::caution[危险]
行动的潜在负面后果。
:::

```markdown
:::note
突出显示用户应考虑的信息，即使是在快速浏览时。
:::

:::tip[提示]
这是一个带自定义标题的提示框。
:::
```

### GitHub 提示框

> [!TIP]
> [GitHub语法](https://github.com/orgs/community/discussions/16925)也支持。

```markdown
> [!TIP]
> GitHub语法也支持。
```

### 隐藏内容

你可以在文本中添加隐藏内容。文本也支持 **Markdown** 语法。

内容 :spoiler[被隐藏了 **哈哈**]!

```markdown
内容 :spoiler[被隐藏了 **哈哈**]!
```
### 视频组件

<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV17CekzXEEh&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>