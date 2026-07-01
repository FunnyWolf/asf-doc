# Comment

Comment Skill 用于在 Case、Alert、Artifact 等资源上写入自然语言评论，也支持附件、回复和 @ 用户。

## 触发场景

- 需要把调查观察、交接说明或人工判断记录到资源 Comments。
- 需要在评论中 @ 用户，触发 Inbox 通知。
- 需要把已上传文件附加到评论，或通过 `file_key` 获取评论附件下载地址。

## 输入

| 输入 | 说明 |
| --- | --- |
| `target_id` | 目标资源 ID，例如 `case_000001`。 |
| `body` | 评论正文。可以为空，但必须同时提供附件 `file_keys`。 |
| `file_keys` | 可选，附件 `access_key` / `file_key` 列表。 |
| `parent_id` | 可选，回复同一资源下的评论。 |
| `mentions` | 可选，@ 用户列表。 |

## 输出

创建的 Comment 记录、目标资源确认，以及附件文件名和 `file_key`。读取附件时返回文件元数据和下载地址，不内联文件内容。

## 依赖

MCP 工具：`add_comment`、`get_file`。上传文件先通过 REST `POST /api/attachments/`，再把返回的 `access_key` 作为 `file_key` 传给 `add_comment`。
