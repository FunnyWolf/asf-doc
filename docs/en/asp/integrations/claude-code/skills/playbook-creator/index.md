# Playbook Creator

Playbook Creator Skill is used to create ASP backend Playbook scripts.

## Trigger Scenarios

- Need to add LLM analysis type Playbook.
- Need to add SOAR automation processing type Playbook.
- Need to reference existing `backend/playbooks/` implementation to generate new scripts.

## Input

| Input | Description |
|-------|-------------|
| Playbook type | LLM analysis type or SOAR automation type. |
| Target | Automation task to be completed. |
| Input context | Case, Artifact, Comment, comment attachments, Enrichment, or external system requirements. |

## Output

Recommended Playbook file, implementation approach, registration and execution instructions.

## Dependencies

- `backend/playbooks/`
- `BasePlaybook`
- `apps.comments.models.Comment`
- Existing Playbook examples
