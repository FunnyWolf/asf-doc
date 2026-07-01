# File

File Skill is used to fetch ASP file metadata and download URLs by `file_key`, and to explain the comment attachment upload flow.

## Trigger Scenarios

- The user has a `file_key` from a comment attachment or another MCP response and wants to download or inspect file information.
- The user needs to upload a local file to ASP and attach it to a comment.
- The user asks whether MCP can read files attached to comments.

## Input

| Input | Description |
|-------|-------------|
| `file_key` | Attachment `access_key`, returned by comment attachments or the upload endpoint. |
| Local file path | Optional, used when uploading a file. |

## Output

Filename, size, content type, and download URL. MCP does not return file body, bytes, or base64; if content parsing is needed, user code downloads `download_url` and handles the file type.

## Dependencies

MCP tool: `get_file`. File upload uses REST `POST /api/attachments/`, authenticated with the same `Authorization: Api-Key <key>` header.
