# Playbook Development

Playbook is an automation task面向 Case in ASP.

## Script Location

When deploying with Compose, user-defined Playbooks are placed in:

```text
custom/playbooks/
```

During source code development, built-in examples are located at:

```text
backend/playbooks/
```

Each file needs to define a `Playbook` class that inherits from `BasePlaybook` and sets `NAME`, `DESC`, and `TAGS`.

## Basic Structure

```python
from apps.agentic.runtime.base import BasePlaybook


class Playbook(BasePlaybook):
    NAME = "Playbook Name"
    DESC = "What this playbook does."
    TAGS = ["System"]

    def run(self):
        if self.case is None:
            raise ValueError("Playbook requires a linked case.")

        # self.case is the trigger source Case
        # self.user_input is the supplementary description filled by the user at runtime
        return "Execution summary"
```

## Execution

After the user selects a Playbook from the Case detail page and submits, the backend creates a `Pending` Playbook record. The background worker picks up the task and executes the script:

```bash
python manage.py run_agentic_playbook_worker
```

After successful execution, the return value is written to the Playbook's `Remark`; on failure, exception information is written to the failure record.

After modifying a Playbook, click `Refresh / Validate` in `Custom` → `Playbooks` to view loading results. If the Playbook introduces new third-party packages, update `custom\requirements.txt` and reinstall dependencies first.

## Current Examples

- `investigation.py`
  - Triggers Case AI investigation and writes the report back to Case.
- `knowledge_extraction.py`
  - Extracts reusable knowledge from Cases that already have an analyst verdict.
- `threat_intelligence_enrichment.py`
  - Queries threat intelligence for Case-associated Artifact and writes to Artifact Enrichment.
- `custom\playbooks\cmdb_enrichment.py`
  - Queries CMDB for Case-associated Artifact and writes to Artifact Enrichment.
- `custom\playbooks\case_summary.py`
  - Reads `custom\data\playbooks\case_summary\System_<lang>.md`, calls LLM to generate Case Summary.

## Data Destinations

Playbook should not only output temporary text. It is recommended to write results back to:

- Case: Investigation reports, AI assessments, summaries.
- Knowledge: Reusable knowledge extracted from cases.
- Enrichment: Threat intelligence, assets, identity, or historical context.
- Playbook: Task status, remarks, and background task ID.

## Custom Prompts

Custom Playbooks can place prompts in:

```text
custom/data/playbooks/<playbook_slug>/System_en.md
custom/data/playbooks/<playbook_slug>/System_zh.md
```

Playbook reads the corresponding file via `self.read_prompt("System")` based on Runtime's Prompt Language. When the Prompt file is missing, the Playbook fails and writes the error to the task record.

## Design Recommendations

- Input围绕 Case。
- Output结构化。
- Failure原因写入任务记录。
- External query results写入 Enrichment，便于后续审计和复用。
- When需要生成报告或结构化判断时，优先写回 Case 或 Knowledge。
- 可以使用 [Playbook Creator](../../integrations/claude-code/skills/playbook-creator/) Skill 辅助生成 Playbook 草案。
