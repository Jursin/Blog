---
title: 在安卓手机上使用 Unlock Music CLI 版
createTime: 2025/12/04 17:12:45
---

## 准备

::: steps
1. 
    - 下载 [Termux](./termux.md#下载-termux) 并安装
    - 下载并安装 [MT 管理器](https://mt2.cn/download/) <badge text="非必须，但推荐" type="tip" />
    - 下载 [Unlock Music CLI 版](https://git.um-react.app/um/cli/releases/latest)，选择 Linux arm64 版本

2. 解压 `um-linux-arm64-vx.x.xx.tar.gz` 并将 `um` 移动到系统目录
    - 解压 `um-linux-arm64-vx.x.xx.tar.gz`
      > 可用 MT 管理器解压 
    - 设置外部存储访问权限
      ```bash
      termux-setup-storage
      ```
    - 在 Termux 中运行以下命令：
      ```bash
      mv /storage/emulated/0/Download/um $PREFIX/bin/
      ```

      ::: note
      `/storage/emulated/0/Download/um` 是你解压 `um` 后的 `um` 实际文件路径
      :::
3. 授予执行权限
    ```bash
    chmod +x $PREFIX/bin/um
    ```
4. 检查是否安装成功
    ```bash
    um -h
    ```
:::

## 使用
```bash
um -i /storage/emulated/0/Download/KuGouLite/Music -o /storage/emulated/0/Music
```

::: tip
`-i` 参数指定你要解锁的歌曲目录，`-o` 参数指定你要输出的歌曲目录。
:::

## 扩展
下面是我自用的一个脚本，可以自动解锁酷狗概念版下载的歌曲并输出到指定目录，再自动删除源文件：

```bash title="um.sh"
#!/bin/bash

source_dir="/storage/emulated/0/Download/KuGouLite/Music/"
destination="/storage/emulated/0/Music/"

for file in "$source_dir"*; do
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    warning="\033[1;33mWARNING\033[0m"
    if [[ "$file" == *"_HQ"* ]] || [[ "$file" == *"_SQ"* ]]; then
        new_file="${file//_HQ/}"
        new_file="${new_file//_SQ/}"
        new_file="${new_file//.kgm.flac/.kgm}"
        mv -- "$file" "$new_file"
        um -i "$new_file" -o "$destination"
        if [[ "$file" == *.flac ]]; then
            mv -- "$new_file" "$destination"
            echo -e "$timestamp    $warning    successfully moved \"$new_file\" to \"$destination$(basename "$new_file")\""
        else
            rm "$new_file"
            echo -e "$timestamp    $warning    successfully removed \"$new_file\""
        fi
    elif [[ "$file" == *.mp3 ]]; then
        mv -- "$file" "$destination"
        echo -e "$timestamp    $warning    successfully moved \"$file\" to \"$destination$(basename "$file")\""
    fi
done
```

```mermaid
---
title: 脚本流程图
---
flowchart TD
    A([开始]) --> B[设置源目录和目标目录]
    B --> C[遍历源目录所有文件]
    C --> D{文件是否包含_HQ或_SQ?}
    
    D -->|是| E[移除_HQ和_SQ后缀<br>将.kgm.flac改为.kgm]
    E --> F[执行重命名文件]
    F --> G[使用um命令解锁文件并输出到目标目录]
    G --> H{原文件是.flac格式?}
    
    H -->|是| I[移动新文件到目标目录]
    H -->|否| J[删除新文件]
    
    D -->|否| K{文件是.mp3格式?}
    
    I --> L[记录移动成功日志]
    J --> M[记录删除成功日志]
    K -->|是| N[移动MP3文件到目标目录]
    K -->|否| O[跳过处理]
    
    N --> P[记录移动成功日志]
    O --> Q[继续下一个文件]
    L --> Q
    M --> Q
    P --> Q
    
    Q --> R{还有更多文件?}
    R -->|是| C
    R -->|否| S([结束])
```