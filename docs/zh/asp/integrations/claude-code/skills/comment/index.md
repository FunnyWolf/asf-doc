# Comment

Comment Skill 用于在 Case、Alert、Artifact 等资源上写入自然语言评论。

## 触发场景

- 需要把调查观察、交接说明或人工判断记录到资源 Comments。
- 需要在评论中 @ 用户，触发 Inbox 通知。

## 输入

| 输入 | 说明 |
| --- | --- |
| `target_id` | 目标资源 ID，例如 `case_000001`。 |
| `body` | 评论正文。 |
| `mentions` | 可选，@ 用户列表。 |

## 输出

创建的 Comment 记录和目标资源确认。

## 依赖

MCP 工具：Comments 相关工具。
