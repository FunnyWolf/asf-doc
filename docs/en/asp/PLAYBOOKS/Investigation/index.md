# Investigation

Perform AI investigation analysis on a specified Case, generate a structured investigation report, and write it back to the Case's AI analysis fields.

## Registered Name

`Investigation`

## Execution Flow

1. Load complete Case data
2. Extract knowledge keywords and search the knowledge base for matching records
3. Retrieve Case discussion records
4. Call LLM to generate a structured investigation report (including verdict, severity, impact assessment, summary, attack chain, IOC, remediation recommendations, etc.)
5. Write the report back to the Case's AI analysis fields

## Trigger Methods

- Manually execute Playbook from the SIRP platform Case detail page
- Trigger via MCP tool `execute_playbook`
