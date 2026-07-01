# File

File Skill 用于根据 ASP `file_key` 获取文件元数据和下载地址，也用于说明评论附件的上传流程。

## 触发场景

- 用户从评论附件或其他 MCP 响应中拿到了 `file_key`，希望下载或查看文件信息。
- 用户需要把本地文件上传到 ASP，再附加到评论。
- 用户询问 MCP 是否能读取评论中的附件文件。

## 输入

| 输入 | 说明 |
| --- | --- |
| `file_key` | 附件 `access_key`，由评论附件或上传接口返回。 |
| 本地文件路径 | 可选，上传文件时使用。 |

## 输出

文件名、大小、内容类型和下载地址。MCP 不返回文件正文、bytes 或 base64；需要解析内容时，由用户代码通过 `download_url` 下载后自行处理。

## 依赖

MCP 工具：`get_file`。上传文件使用 REST `POST /api/attachments/`，认证方式同样是 `Authorization: Api-Key <key>`。
