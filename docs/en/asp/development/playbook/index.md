# Playbook Development

Playbook is a Case-oriented automation task in ASP.

> To see the source-tree Case Summary and CMDB Enrichment custom Playbook examples, read [Custom Playbook Examples](../custom-examples/playbooks/).

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

After modifying a Playbook, click `Refresh / Validate` in [Custom Console](../custom-console/) → `Playbooks` to view loading results. If the Playbook introduces new third-party packages, update `custom\requirements.txt` and reinstall dependencies first.

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
- Comment: Natural-language execution summaries, handoff notes, or information that should remain in the resource discussion.
- Playbook: Task status, remarks, and background task ID.

## Reading Comment Attachments

Custom Playbooks run inside the backend process, so they do not need MCP `get_file` to read comment attachments. Use Django ORM to fetch Comments on the target resource, then read any file type with `attachment.file.open("rb")`:

```python
from django.contrib.contenttypes.models import ContentType

from apps.comments.models import Comment


content_type = ContentType.objects.get_for_model(self.case, for_concrete_model=False)
comments = (
    Comment.objects
    .filter(content_type=content_type, object_id=str(self.case.pk))
    .prefetch_related("attachments")
)

for comment in comments:
    for attachment in comment.attachments.all():
        with attachment.file.open("rb") as file_obj:
            content = file_obj.read()
        filename = attachment.filename
        size = attachment.size
```

Attachments are not restricted by file type. The Playbook should choose parsing logic based on filename, size, and actual content instead of assuming text, image, or JSON.

## Custom Prompts

Custom Playbooks can place prompts in:

```text
custom/data/playbooks/<playbook_slug>/System_en.md
custom/data/playbooks/<playbook_slug>/System_zh.md
```

Playbook reads the corresponding file via `self.read_prompt("System")` based on Runtime's Prompt Language. When the Prompt file is missing, the Playbook fails and writes the error to the task record.

## Design Recommendations

- Keep input centered on the Case.
- Produce structured output.
- Write failure reasons to the task record.
- Write external query results to Enrichment for later audit and reuse.
- When generating reports or structured judgments, prefer writing them back to Case or Knowledge.
- Use the [Playbook Creator](../../integrations/claude-code/skills/playbook-creator/) Skill to help draft Playbooks.
