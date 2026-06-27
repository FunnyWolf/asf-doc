# Comment

Comment Skill is used to write natural language comments on resources such as Case, Alert, and Artifact.

## Trigger Scenarios

- Need to record investigation observations, handover instructions, or manual judgments to resource Comments.
- Need to @ users in comments to trigger Inbox notifications.

## Input

| Input | Description |
|-------|-------------|
| `target_id` | Target resource ID, e.g., `case_000001`. |
| `body` | Comment body. |
| `mentions` | Optional, @ user list. |

## Output

Created Comment record and target resource confirmation.

## Dependencies

MCP tool: Comments-related tools.
