# Module Development

Module is used to automatically consume raw alerts from Redis Stream and convert them into Case / Alert / Artifact in the ASP workspace.

> A Module usually consumes Redis Streams written by [Alert Ingestion](../alert-ingestion/). To see complete raw alert → Module → Case / Alert / Artifact examples, read [Custom Module Examples](../custom-examples/modules/).

## Script Location

User-defined Modules are placed in:

```text
custom/modules/
```

Local development examples and raw alerts are located at:

```text
backend/custom/modules/
backend/custom/data/modules/
```

Module files are automatically discovered by the backend. Each file needs to define a `Module` class that inherits from `BaseModule` and sets `STREAM_NAME`.

## Basic Structure

```python
from apps.agentic.runtime.base import BaseModule


class Module(BaseModule):
    NAME = "Human readable name"
    DESC = "Short description"
    STREAM_NAME = "SIEM-Rule-Or-Stream-Name"
    THREAD_NUM = 1

    def run(self, message):
        # message is the raw alert dict read from Redis Stream
        ...
```

## Execution

The Module worker scans `custom\modules\*.py`, discovers `Module` classes inheriting from `BaseModule`, then consumes Redis Stream by `STREAM_NAME`.

```bash
python manage.py run_agentic_module_worker
```

The default consumer group is `agentic-modules`. The Stream names written by Webhook and ELK Index Action need to correspond to the Module's `STREAM_NAME`.

After modifying a Module, click `Refresh / Validate` in [Custom Console](../custom-console/) → `Modules` to view loading results and inspect the related Redis Stream status. If the Module introduces new third-party packages, update `custom\requirements.txt` and reinstall dependencies first.

## Processing Flow

1. Read raw alert.
2. Parse event time; prefer `parse_event_time()`.
3. Extract key fields and Artifact, such as IP, domain, account, host, file, process.
4. Design `correlation_uid`; prefer `generate_correlation_uid()`.
5. Use `create_alert_with_context()` to create or associate Case, Alert, Artifact, and Enrichment.
6. Trigger Case AI analysis when necessary.

## Current Examples

Example scripts in the source repository are located at `backend\custom\modules\`, raw alert samples are at `backend\custom\data\modules\`. The `custom/` in the release package is an empty template by default and does not include these test examples.

- `aws_iam_privilege_escalation_attach_user_policy.py`
  - Processes AWS CloudTrail `AttachUserPolicy` high-risk IAM behavior.
  - Example focus: Cloud account, subject identity, target user, permission policy, and source IP.
- `edr_vssadmin_delete_shadows.py`
  - Processes EDR `vssadmin delete shadows` type ransomware precursor behavior.
  - Example focus: Host, user, process, command line, and file hash.
- `mail_user_report_phishing.py`
  - Processes user-reported phishing emails.
  - Example focus: Sender, recipient, reporter, subject, URL, domain, and attachments.

## Recommended Data Destinations

Module should output or associate as much useful context as possible:

- Case: Disposition entry for the same incident.
- Alert: Detection context and raw logs.
- Artifact: IOC, account, host, file, process, and other entities.
- Enrichment: Reusable external context.

## Design Recommendations

- Keep `STREAM_NAME` consistent with SIEM Rule / Redis Stream name.
- Do not use random fields as aggregation keys, such as request id, session id, exact timestamps.
- One Case should represent one investigatable, disponsable security incident, not a single log.
- Split Artifacts into investigable atomic entities where possible.
- Store the original raw alert in Alert `raw_data`, and put valuable unmapped fields into `unmapped`.
- Use the [Module Creator](../../integrations/claude-code/skills/module-creator/) Skill to help draft Modules.
