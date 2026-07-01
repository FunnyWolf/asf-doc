# Comment

Comment Skill is used to write natural language comments on resources such as Case, Alert, and Artifact. It also supports attachments, replies, and @mentions.

## Trigger Scenarios

- Need to record investigation observations, handover instructions, or manual judgments to resource Comments.
- Need to @ users in comments to trigger Inbox notifications.
- Need to attach already-uploaded files to a comment, or fetch a comment attachment download URL by `file_key`.

## Input

| Input | Description |
|-------|-------------|
| `target_id` | Target resource ID, e.g., `case_000001`. |
| `body` | Comment body. It may be empty only when attachment `file_keys` are provided. |
| `file_keys` | Optional attachment `access_key` / `file_key` list. |
| `parent_id` | Optional reply target on the same resource. |
| `mentions` | Optional, @ user list. |

## Output

Created Comment record, target resource confirmation, and attachment filenames / `file_key` values. Reading an attachment returns file metadata and a download URL, not inline content.

## Dependencies

MCP tools: `add_comment`, `get_file`. Upload files first through REST `POST /api/attachments/`, then pass the returned `access_key` as `file_key` to `add_comment`.
