# Mock Data

Mock data is used to experience the ASP workspace, verify Module / Playbook flows, or write simulated logs to SIEM when there are no real alert sources.

The backend currently provides two types of Mock:

| Type | Location | Purpose |
| --- | --- | --- |
| ASP Workspace Mock Data | `backend\mock\import_mock_data.py` | Directly writes Case, Alert, Artifact, Enrichment, Knowledge, and Playbook examples to the ASP database. |
| SIEM Mock Logs | `backend\mock\siem\` | Generates network, host, and cloud logs, and sends them to ELK or Splunk. |

## Import ASP Workspace Mock Data

Execute in the `backend` directory:

```powershell
.\.venv\Scripts\python.exe manage.py shell -c "from mock.import_mock_data import run; run()"
```

This script can be run repeatedly. Each run creates a new mock batch and does not overwrite or clean up historical mock data.

After import, you can see in the workspace:

- Multiple Cases of different categories, such as EDR, IAM, NDR, Email, DLP, WAF, Proxy, Threat Intelligence.
- Associated Alerts.
- Artifacts.
- Enrichments.
- Knowledge.
- Playbook execution records.

Cases will contain realistic TTD, TTA, TTR timeline information and cover statuses such as New, In Progress, On Hold, Resolved, and Closed.

The script creates the following example users, all with password `mockpass`:

| User | Description |
| --- | --- |
| `alice.chen` | Analyst example user. |
| `bob.li` | Analyst example user. |
| `maya.singh` | Analyst example user. |
| `automation` | Automation operation example user. |

## Generate SIEM Mock Logs

SIEM Mock is used to write simulated logs to ELK or Splunk. It continuously generates three types of index data:

| Index | Scenario |
| --- | --- |
| `siem-network-traffic` | Network traffic and brute force scenarios. |
| `siem-host-events` | Host events and ransomware behavior scenarios. |
| `siem-aws-cloudtrail` | Cloud logs and privilege escalation scenarios. |

First copy and edit the configuration:

```powershell
Copy-Item .\mock\siem\.env.example .\mock\siem\.env
```

`.env` example:

```text
MOCK_SIEM_ELK_ENABLED=true
MOCK_SIEM_ELK_HOST=http://localhost:9200
MOCK_SIEM_ELK_KEY=replace-me

MOCK_SIEM_SPLUNK_ENABLED=true
MOCK_SIEM_SPLUNK_HEC_URL=http://localhost:8088/services/collector
MOCK_SIEM_SPLUNK_TOKEN=replace-me
```

Start the generator:

```powershell
.\.venv\Scripts\python.exe -m mock.siem.main
```

The generator will batch send logs to ELK `_bulk` or Splunk HEC according to configuration.

## Runtime Parameters

The basic runtime parameters for SIEM Mock are in `backend\mock\siem\settings.py`:

| Parameter | Default | Description |
| --- | --- | --- |
| `EPS` | `10` | Events per second. |
| `BATCH_SIZE` | `100` | Number generated per batch. |
| `MALICIOUS_PERCENTAGE` | `0.05` | Probability of injecting anomaly scenarios. |

## Usage Recommendations

- To quickly experience the workspace: first import ASP Workspace Mock Data.
- To verify SIEM queries, SIEM YAML, Module, or alert ingestion: use SIEM Mock Logs.
- SIEM Mock continuously sends data, remember to stop the process after testing.
- Do not import Mock data or run Mock log generators in production environments.
