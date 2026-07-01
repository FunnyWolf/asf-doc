# Case

Case Skill is used to view, update, and review ASP security cases.

## Trigger Scenarios

- View a Case's status, risk, disposition, assignee, and context.
- List Cases matching conditions.
- Update Case manual fields, such as status, assignee, verdict, summary.

## Usage Example

![Case Skill](img.png)

![Case Update](img_1.png)

## Input

| Input | Description |
|-------|-------------|
| `case_id` | Readable case ID, e.g., `case_000001`. |
| `status` | Case status. |
| `severity` / `confidence` / `impact` / `priority` | Manual assessment fields. |
| `verdict` | Manual disposition. |
| `include_comments` | Optional, explicitly fetch recent comments. Attachments return filename, `file_key`, and download URL only. |

## Output

Case summary, key evidence, AI analysis, optional comments, timeline, and actionable next steps. `include_related` does not implicitly return comments; use `include_comments` when comments are needed.

## Dependencies

MCP tools: `list_cases`、`update_case`.
