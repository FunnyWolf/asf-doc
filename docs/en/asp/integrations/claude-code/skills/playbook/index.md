# Playbook

Playbook Skill is used to view runnable Playbook Definitions, execute Playbooks, and追溯 Playbook Runs.

## Trigger Scenarios

- View which Playbooks are currently available to run.
- Execute Investigation, Knowledge Extraction, Threat Intelligence Enrichment, or CMDB Enrichment from a Case.
- View the status and execution result of a Playbook Run.

## Usage Example

![Playbook Skill](img.png)

## Input

| Input | Description |
|-------|-------------|
| `case_id` | Trigger source Case. |
| `name` | Playbook name. |
| `user_input` | Optional natural language supplementary requirements. |
| `playbook_id` | Playbook Run ID. |
| `include_comments` | Optional, explicitly fetch recent Playbook Run comments and attachment metadata. |

## Output

Runnable Playbook list, created Playbook Run, or execution details.

## Dependencies

MCP tools: `list_playbook_templates`、`execute_playbook`、`list_playbooks`.
