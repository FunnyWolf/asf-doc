# Module Development Guide

Modules are used for **automated** streaming processing of alert data, converting raw SIEM alerts into user-readable [Case](../../../sirp/Feature/case/index.md) / [Alert](../../../sirp/Feature/alert/index.md) / [Artifact](../../../sirp/Feature/artifact/index.md) in SIRP.

## Data Flow

```
NDR/EDR/XDR → SIEM → Rule → Webhook → Forwarder → Redis Stream → Module → SIRP
```

- **No coding required for production** — configure Webhook Action or Index Action in SIEM to import alerts into Redis Stream
- Each module processes a single Redis Stream message queue
- The module name is the Stream name

### Data Noise Reduction

| Stage                      | Data Volume (Example) |
|----------------------------|----------------------|
| Raw logs                   | 10 million/day       |
| SIEM Rule triggered alerts | 1,000/day            |
| **Cases** after module processing | **10/day**    |

No critical information is lost during processing. AI Agents and analysts only need to handle the aggregated Cases.

## Module Structure

Each module is a Python file under the `MODULES/` directory, where the filename is the module name:

```
MODULES/
├── EDR-01-HOST-Vssadmin-Delete-Shadows.py
├── Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy.py
└── Mail-01-User-Report-Phishing-Mail.py
```

### Basic Framework

```python
from Lib.basemodule import BaseModule
from PLUGINS.SIRP.sirpapi import Alert, Case
from PLUGINS.SIRP.sirpcoremodel import AlertModel, CaseModel, ArtifactModel

class Module(BaseModule):
    def __init__(self):
        super().__init__()

    def run(self):
        # 1. Read raw alert from RedisStack Stream
        raw_alert = self.read_stream_message()

        # 2. Field extraction and data mapping
        # ...

        # 3. Build Artifact list (IOC)
        # artifacts = [ArtifactModel(...)]

        # 4. Correlation and aggregation
        # correlation_uid = Correlation.generate_correlation_uid(...)

        # 5. Create Alert and Case
        # alert_model = AlertModel(...)
        # saved_alert_row_id = Alert.create(alert_model)
        # Case.create(CaseModel(..., alerts=[saved_alert_row_id]))
        # Case.mark_analysis_requested(row_id=case_row_id, cooldown_minutes=3)
```

### Module Processing Steps

1. **Field Extraction** — Extract key fields from raw JSON, supporting both flat and nested formats
2. **Artifact Extraction** — Extract IOCs (users, hosts, IPs, hashes, etc.), label types and roles
3. **Correlation and Aggregation** — Aggregate by rules and time windows via `Correlation.generate_correlation_uid()`. Alerts with the same `correlation_uid` are linked to the same Case
4. **Alert Construction** — Populate MITRE ATT&CK mapping, severity, product information, etc.
5. **Case Processing** — Search for existing Cases by `correlation_uid`. If found, append the Alert; otherwise create a new Case. Upon completion, call `Case.mark_analysis_requested()` to trigger automated analysis

### Claude Code Skill

[Module Creator](../../PLUGINS/ClaudeCode/skills/module-creator/) Skill assists developers in quickly building Modules
