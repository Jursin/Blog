---
title: Markdown 扩展
createTime: 2024/03/05 22:49:39
tags:
  - Markdown
cover: /images/markdown.png
order: 1
---

> VitePress 内置及本博客的 Markdown 扩展。

<!-- more -->

::: info
大部分内容来自 [Markdown 扩展 | VitePress](https://vitepress.dev/zh/guide/markdown)，部分扩展功能参考 [VuePress Theme Plume](https://theme-plume.vuejs.press)。
:::

## 标题锚点

标题会自动应用锚点。

### 自定义锚点 {#my-anchor}

要为标题指定自定义锚点而不是使用自动生成的锚点，请向标题添加后缀：

```md
# 自定义锚点 {#my-anchor}
```

这允许将标题链接为 `#my-anchor`，而不是默认的 `#自定义锚点`。

## 链接

内部和外部链接都会被特殊处理。

### 内部链接

内部链接将转换为单页导航的路由链接。此外，子目录中包含的每个 `index.md` 都会自动转换为 `index.html`，并带有相应的 URL `/`。支持绝对路径与相对路径。

```md
[首页](/) <!-- 将用户导航至根目录下的 index.html -->

[Markdown 基础](/blog/tutorials/markdown-basic) <!-- 可以省略扩展名 -->

[Markdown 基础](./markdown-basic.md) <!-- 可以添加 .md -->

[Markdown 基础](./markdown-basic.html) <!-- 可以添加 .html -->
```

渲染为：

[首页](/)

[Markdown 基础](./markdown-basic.md)

[Markdown 基础](/blog/tutorials/markdown-basic)

### 页面后缀

默认情况下，生成的页面和内部链接带有 `.html` 后缀。

#### 外部链接

外部链接带有 `target="_blank" rel="noreferrer"` ：

[VitePress](https://vitepress.dev/)

## frontmatter

[YAML 格式的 frontmatter](https://jekyllrb.com/docs/front-matter/) 开箱即用：

```yaml
---
title: Markdown 基础
lang: zh-CN
---
```

此数据将可用于页面的其余部分，以及所有自定义和主题组件。

更多信息，参见 [frontmatter](https://vitepress.dev/zh/reference/frontmatter-config)。

## Github风格的表格

**输入：**

```md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**输出：**

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Emoji :tada:

**输入：**

```md
:tada: :100:
```

**输出：**

:tada: :100:

这里可以找到 [所有支持的 emoji 列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)。

## 目录表

**输入：**

```md
[[TOC]]
```

**输出：**

[[TOC]]

## 自定义容器

自定义容器可以通过它们的类型、标题和内容来定义。

### 默认标题

**输入：**

```md
::: note
这是一个注意容器。
:::

::: info
这是一个信息容器。
:::

::: tip
这是一个提示容器。
:::

::: important
这是一个重要容器。
:::

::: warning
这是一个警告容器。
:::

::: caution
这是一个危险容器。
:::

::: danger
这是一个危险容器。
:::

::: details
这是一个详细信息容器。
:::
```

**输出：**

::: note
这是一个注意容器。
:::

::: info
这是一个信息容器。
:::

::: tip
这是一个提示容器。
:::

::: important
这是一个重要容器。
:::

::: warning
这是一个警告容器。
:::

::: caution
这是一个危险容器。
:::

::: danger
这是一个危险容器。
:::

::: details
这是一个详细信息容器。
:::

### 自定义标题

可以通过在容器的 "type" 之后附加文本来设置自定义标题。

**输入：**

````md
::: caution STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::
````

**输出：**

::: caution STOP
危险区域，请勿继续
:::

::: details 点我查看代码

```js
console.log('Hello, VitePress!')
```

:::

## GitHub 风格的警报

VitePress 同样支持以标注的方式渲染 [GitHub 风格的警报](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)。它们和[自定义容器](#自定义容器)的渲染方式相同。

**输入：**

```md
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!INFO]
> 用户可能需要的信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

> [!DANGER]
> 行为可能带来的负面影响。
```

**输出：**

> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!INFO]
> 用户可能需要的信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

> [!DANGER]
> 行为可能带来的负面影响。

## 代码块中的语法高亮

VitePress 使用 [Shiki](https://github.com/shikijs/shiki) 在 Markdown 代码块中使用彩色文本实现语法高亮。

**输入：**

````
```js
export default {
  name: 'MyComponent',
  // ...
}
```
````

````
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
````

**输出：**

```js
export default {
  name: 'MyComponent',
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

在 Shiki 的代码仓库中，可以找到 [合法的编程语言列表](https://shiki.style/languages)。

还可以在全局配置中自定义语法高亮主题、配置语言别名和自定义语言标签。有关详细信息，参见 [`markdown` 选项](https://vitepress.dev/zh/reference/site-config#markdown)得到更多信息。

## 在代码块中实现行高亮

**输入：**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出：**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了单行之外，还可以指定多个单行、多行，或两者均指定：

- 多行：例如 `{5-8}`、`{3-10}`、`{10-17}`
- 多个单行：例如 `{4,7,9}`
- 多行与单行：例如 `{4,7-13,16,23-27,40}`

**输入：**

````
```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
````

**输出：**

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```

也可以使用 `// [!code highlight]` 注释实现行高亮。

**输入：**

````
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [\!code highlight]
    }
  }
}
```
````

**输出：**

```js
export default {
  data() {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```

## 代码块中聚焦

在某一行上添加 `// [!code focus]` 注释将聚焦它并模糊代码的其他部分。

此外，可以使用 `// [!code focus:<lines>]` 定义要聚焦的行数。

**输入：**

````
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [\!code focus]
    }
  }
}
```
````

**输出：**

```js
export default {
  data() {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

## 代码块中的颜色差异

在某一行添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff，同时保留代码块的颜色。

**输入：**

````
```js
export default {
  data () {
    return {
      remove: 'Removed', // [\!code --]
      add: 'Added' // [\!code ++]
    }
  }
}
```
````

**输出：**

```js
export default {
  data() {
    return {
      remove: 'Removed', // [!code --]
      add: 'Added' // [!code ++]
    }
  }
}
```

## 高亮“错误”和“警告”

在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。

**输入：**

````
```js
export default {
  data () {
    return {
      error: 'Error', // [\!code error]
      warning: 'Warning' // [\!code warning]
    }
  }
}
```
````

**输出：**

```js
export default {
  data() {
    return {
      error: 'Error', // [!code error]
      warning: 'Warning' // [!code warning]
    }
  }
}
```

## 行号

可以通过以下配置为每个代码块启用行号：

```js
export default {
  markdown: {
    lineNumbers: true
  }
}
```

查看 [`markdown` 选项](https://vitepress.dev/zh/reference/site-config#markdown) 获取更多信息。

可以在代码块中添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖在配置中的设置。

还可以通过在 `:line-numbers` 之后添加 `=` 来自定义起始行号，例如 `:line-numbers=2` 表示代码块中的行号从 2 开始。

**输入**

````md
```ts:no-line-numbers {1}
// 禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```
````

**输出**

```ts:no-line-numbers {1}
// 禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

## 代码块中词高亮 <Badge type="tip" text="参考 Plume 实现" />

**输入：**

````
```ts
export function foo() { // [\!code word:Hello]
  const msg = 'Hello World'
  console.log(msg) // prints Hello World
}
```
````

**输出：**

```ts
export function foo() { // [!code word:Hello]
  const msg = 'Hello World'
  console.log(msg) // prints Hello World
}
```

你还可以指定高亮显示的次数，例如 `[!code word:options:2]` 会高亮显示近两个 `options`。

**输入：**

````
```ts
// [\!code word:options:2]
const options = { foo: 'bar' }
options.foo = 'baz'
console.log(options.foo) // 这个不会被高亮显示
```
````

**输出：**

```ts
// [!code word:options:2]
const options = { foo: 'bar' }
options.foo = 'baz'
console.log(options.foo) // 这个不会被高亮显示
```

## 导入代码片段

可以通过下面的语法来从现有文件中导入代码片段：

```md
<<< @/filepath
```

此语法同时支持[行高亮](#在代码块中实现行高亮)：

```md
<<< @/filepath{highlightLines}
```

**输入**

```md
<<< @/snippets/snippet.js{2}
```

**Code file**

```js
export default function () {
  // ..
}
```

**输出**

```js
export default function () { 
  // .. // [!code highlight]
}
```

::: tip
`@` 的值对应于源代码根目录，默认情况下是 VitePress 项目根目录，除非配置了 `srcDir`。或者也可以从相对路径导入：

```md
<<< ../snippets/snippet.js
```

:::

也可以使用 [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding) 来只包含代码文件的相应部分。可以在文件目录后面的 `#` 符号后提供一个自定义的区域名：

**输入**

```md
<<< @/snippets/snippet-with-region.js#snippet{1}
```

**Code file**

```js
// #region snippet
function foo() {
  // ..
}
// #endregion snippet

export default foo
```

**输出**

```js
function foo() { // [!code highlight]
  // ..
}
```

也可以像这样在大括号内(`{}`)指定语言：

```md
<<< @/snippets/snippet.cs{c#}

<!-- 带行高亮: -->

<<< @/snippets/snippet.cs{1,2,4-6 c#}

<!-- 带行号: -->

<<< @/snippets/snippet.cs{1,2,4-6 c#:line-numbers}
```

如果无法从文件扩展名推测出源语言，这将会很有帮助

## 代码组

可以像这样对多个代码块进行分组：

**输入**

````md
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
````

**输出**

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

也可以在代码组中[导入代码片段](#导入代码片段)：

**输入**

```md
::: code-group

<!-- 文件名默认用作标题 -->

<<< @/snippets/snippet.js

<!-- 也可以提供定制的代码组 -->

<<< @/snippets/snippet-with-region.js#snippet{1,2 ts:line-numbers} [snippet with region]

:::
```

**输出**

::: code-group

```js [snippet.js]
export default function () {
  // ..
}
```

```ts{1,2} [snippet with region]
function foo() {
  // ..
}
```

:::

## 包含 markdown 文件

可以像这样在一个 markdown 文件中包含另一个 markdown 文件，甚至是内嵌的。

::: tip
也可以使用 `@`，它的值对应于源代码根目录，默认情况下是 VitePress 项目根目录，除非配置了 `srcDir`。
:::

例如，可以这样用相对路径包含 Markdown 文件：

**输入**

```md
# Docs

## Basics

<!--@@include: ./parts/basics.md-->
```

**Part file** (`parts/basics.md`)

```md
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**等价代码**

```md
# Docs

## Basics

Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

它还支持选择行范围：

**输入**

```md
# Docs

## Basics

<!--@@include: ./parts/basics.md{3,}-->
```

**Part file** (`parts/basics.md`)

```md
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**等价代码**

```md
# Docs

## Basics

### Configuration

Can be created using `.foorc.json`.
```

所选行范围的格式可以是： `{3,}`、 `{,10}`、`{1,10}`

::: warning
如果指定的文件不存在，这将不会产生错误。因此，在使用这个功能的时候请保证内容按预期呈现。
:::

## 数学方程

**输入：**

````
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**Maxwell's equations:**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |
````

**输出：**

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**Maxwell's equations:**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |

## 马克笔 <Badge type="tip" text="参考 Plume 实现" />

使用 `== ==` 进行标记。

`==Default==` - ==Default==

内置了以下的配置方案：

- `==Info=={.info}` - ==Info=={.info}
- `==Note=={.note}` - ==Note=={.note}
- `==Tip=={.tip}` - ==Tip=={.tip}
- `==Warning=={.warning}` - ==Warning=={.warning}
- `==Danger=={.danger}` - ==Danger=={.danger}
- `==Caution=={.caution}` - ==Caution=={.caution}
- `==Important=={.important}` - ==Important=={.important}

## 隐秘文本 <Badge type="tip" text="参考 Plume 实现" />

**输入：**

```md
!!需要隐秘的内容!!
```

**输出：**

!!需要隐秘的内容!!

## 上下角标 <Badge type="tip" text="参考 Plume 实现" />

- 使用 `^ ^` 进行上角标标注。
- 使用 `~ ~` 进行下角标标注。

**输入：**

```md
- 19^th^
- H~2~O
```

**输出：**

- 19^th^
- H~2~O

## 属性支持

你可以使用特殊标记为 Markdown 元素添加属性。

**为图片添加属性：**

这将为图片添加 一个 名为 `full-width` 的 class 属性，以及一个 `width` 属性，值为 `100%`。

```md
![](/avatar.png){.full-width width="100%"}
```

同时也支持其他属性:

```md
一个包含文字的段落。 {#p .a .b align=center customize-attr="content with spaces"}
```

这将被渲染为：

```html
<p id="p" class="a b" align="center" customize-attr="content with spaces">
  一个包含文字的段落。
</p>
```

::: tip
链接后面添加 `{.readmore}`  可以显示为特殊样式：<Badge type="tip" text="参考 Plume 样式" />

**输入：**

```md
[更多信息请阅读 **VitePress** 文档](https://vitepress.dev/zh/){.readmore}
```

**输出：**

[更多信息请阅读 **VitePress** 文档](https://vitepress.dev/zh/){.readmore}

:::

## 任务列表

**输入：**

````md
- [ ] 任务 1
- [x] 任务 2
- [ ] 任务 3
````

**输出：**

- [ ] 任务 1
- [x] 任务 2
- [ ] 任务 3
