# Mock Plugin

Before deploying ASP to production, use this plugin to simulate CMDB, SIEM, and SIRP data sources for testing the Agent architecture and data flow.

## CMDB

Simulates the enterprise CMDB asset query interface, used to obtain asset context information during alert investigation.

### Usage

```python
from PLUGINS.Mock.CMDB.CMDB import cmdb_instance

result = cmdb_instance.lookup(artifact_type, artifact_value)
```

### Supported Artifact Types

| Type | Returns |
|------|---------|
| `HOSTNAME` / `ENDPOINT` / `DEVICE` / `IP_ADDRESS` | Asset information: IP, MAC, status, environment, network zone, responsible person, installed software |
| `USER_NAME` / `USER` / `ACCOUNT` | Identity information: user ID, department, position, privilege level, associated endpoints |
| `EMAIL_ADDRESS` / `EMAIL` | Email + identity information |
| `PORT` | Port exposure information: protocol, common services, exposure level |
| `SUBNET` | Subnet information: CIDR, zone, asset count |
| `RESOURCE_UID` / `RESOURCE` | Cloud resource information: type, cloud provider, region, status |
| `MAC_ADDRESS` / `SERIAL_NUMBER` | Asset information |

CMDB is based on SHA-256 deterministic hashing; the same input always returns the same result.

## SIEM

Generates three types of simulated logs: network traffic, host events, and AWS CloudTrail, with support for sending to ELK and Splunk.

### Configuration

1. Copy `PLUGINS/Mock/SIEM/CONFIG.example.py` to `CONFIG.py`
2. Set the enable switches for ELK and Splunk:

```python
ELK_ENABLED = True
SPLUNK_ENABLED = True
```

3. SIEM credentials are read from `PLUGINS/ELK/CONFIG` and `PLUGINS/Splunk/CONFIG` respectively

### Runtime Parameters

Configure in `settings.py`:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `EPS` | 10 | Events generated per second |
| `BATCH_SIZE` | 100 | Batch send size |
| `MALICIOUS_PERCENTAGE` | 0.05 | Malicious log injection ratio (5%) |

### Log Generators

| Generator | Index Name | Description |
|-----------|------------|-------------|
| `NetworkGenerator` | `siem-network-traffic` | Network traffic logs, including source/destination IP, port, protocol |
| `HostGenerator` | `siem-host-events` | Host event logs, including process creation, file operations, registry changes |
| `CloudGenerator` | `siem-aws-cloudtrail` | AWS CloudTrail logs, including IAM, S3, EC2 operations |

### Attack Scenarios

Each generator has corresponding attack scenarios, injected with a 5% probability:

| Scenario | Associated Generator | Description |
|----------|---------------------|-------------|
| `BruteForceScenario` | Network | 5-10 failed SSH/RDP logins + 1 successful login, attacker IP `45.95.11.22` |
| `RansomwareScenario` | Host | Three phases: delete shadow copies -> encrypt and rename 20 files -> create ransom note file |
| `CloudPrivilegeEscalationScenario` | Cloud | Full AWS kill chain: reconnaissance -> privilege enumeration -> create backdoor user -> privilege escalation -> AssumeRole |

### Running

```bash
python PLUGINS/Mock/SIEM/main.py
```

Generated logs can be used with the `siem-network-traffic.yaml`, `siem-host-events.yaml`, and `siem-aws-cloudtrail.yaml` configuration files in the [SIEM Plugin](../SIEM/).

## SIRP

Generates complete Case, Alert, Artifact, and Enrichment test data with automatic inter-data linking.

### Creating Mock Data

```bash
python PLUGINS/Mock/SIRP/main.py
```

### Cleaning Up Mock Data

```bash
python PLUGINS/Mock/SIRP/delete_all.py
```

### Mock Data Overview

| Data Type | Count | Description |
|-----------|-------|-------------|
| Case | 13 | Covers phishing, lateral movement, ransomware, brute force, data exfiltration, cloud misconfiguration, and other scenarios |
| Alert | 16 | Includes MITRE ATT&CK mapping, data sources, remediation suggestions, linked to SIEM attack scenarios |
| Artifact | 37 | IOC data: IP, domain, hash, process, user, etc., linked to Enrichment |
| Enrichment | 24 | Multi-vendor intelligence: OTX, VirusTotal, AbuseIPDB, CrowdStrike, Shodan, etc. |

Developers can refer to files such as `mock_case.py` and `mock_alert.py` to understand how SIRP data models are constructed.
