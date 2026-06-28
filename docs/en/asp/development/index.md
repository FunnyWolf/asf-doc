# Custom Development

Custom development explains how to extend ASP based on your own security operations scenarios.

The main extension points currently open for user custom development are Alert Ingestion, SIEM YAML, Module, and Playbook. The source repository also includes [Custom Examples](custom-examples/) that show how Mock SIEM logs, Alert Ingestion, SIEM YAML, Modules, and Playbooks work together.

## Target Audience

- Developers who need to ingest new SIEM Rule alerts into ASP.
- Developers who need to orchestrate automated investigation, enrichment, or response actions for Case.
- Developers who need to supplement SIEM index field descriptions for Agent / MCP queries.

## Extension Points

| Extension Point | Location | Purpose |
| --- | --- | --- |
| Alert Ingestion | Webhook / ELK Index Action | Writes SIEM alerts into Redis Stream as Module input. |
| SIEM YAML | `custom\data\siem\*.yaml` | Describes Splunk / ELK indexes, fields, and default aggregation fields for Agent / MCP queries. |
| Module | `custom\modules\*.py` | Consumes raw alerts from Redis Stream, generates Case / Alert / Artifact. |
| Playbook | `custom\playbooks\*.py` / `backend\playbooks\*.py` | Triggers user-initiated automation tasks from Case. |

In production, only `custom/` is loaded by default for Module and SIEM YAML. The `backend\custom\` in the source repository can serve as local development examples; the `custom/` in the release package is an empty template by default. Playbook preserves built-in product capabilities and also allows appending or overriding through `custom\playbooks\*.py`.

## Data Flow

```text
Mock Data / SIEM Rule
  → Alert Ingestion (Webhook / ELK Index Action)
  → Redis Stream
  → Module
  → Case / Alert / Artifact
  → Playbook / Enrichment / Knowledge
```

Alert Ingestion writes SIEM detections into Streams; Module reduces noise and standardizes raw alerts so analysts can work around Cases; Playbook advances investigation, enrichment, knowledge extraction, or other automation on Cases; SIEM YAML enables Agents to understand and query external logs.

## Refresh and Dependencies

After modifying Module, Playbook, or SIEM YAML, click `Refresh / Validate` in the corresponding [Custom Console](custom-console/) tab to rescan and view loading results. Loading failures display file path and exception information, and write to Audit Log.

If new or upgraded Python dependencies are added, first update `custom\requirements.txt`, then execute:

```bash
docker compose run --rm asp-custom-deps --index-url https://pypi.org/simple
```

After dependency packages or common helper module changes, related containers need to be restarted; simple script definition or YAML changes can be confirmed through refresh/validate.

## Current Examples

The backend currently includes the following Module examples in `backend\custom\modules\`:

- `aws_iam_privilege_escalation_attach_user_policy.py`
- `edr_vssadmin_delete_shadows.py`
- `mail_user_report_phishing.py`

The backend currently includes the following Playbook examples:

- `investigation.py`
- `knowledge_extraction.py`
- `threat_intelligence_enrichment.py`
- `cmdb_enrichment.py`

## Recommended Reading Order

1. [Environment Setup](environment-setup/): Prepare source development environment and custom directory.
2. [Mock Data](mock-data/): Generate workspace data or SIEM test logs.
3. [Alert Ingestion](alert-ingestion/): Learn how Webhook / ELK Index Action writes SIEM alerts into Redis Stream.
4. [SIEM YAML](siem-yaml/): Learn how to maintain index configuration for Agent / MCP queries.
5. [Module Development](module-examples/): Learn how to convert Stream alerts into ASP resources.
6. [Playbook Development](playbook/): Learn how to write Case-triggered automation tasks.
7. [Custom Console](custom-console/): Learn how to inspect and validate definitions loaded in the current environment.
8. [Custom Examples](custom-examples/): Understand how Mock Data, Alert Ingestion, SIEM YAML, Modules, and Playbooks connect through runnable examples.

The [Module Creator](../integrations/claude-code/skills/module-creator/) and [Playbook Creator](../integrations/claude-code/skills/playbook-creator/) Skills in the ClaudeCode plugin can assist in generating code drafts.
