# Product Architecture

At its core, ASP is a combination of "Ingestion Layer + Resource Layer + Automation Layer + Interaction Layer": external alerts enter the platform and are converted into unified resources such as Case / Alert / Artifact, then driven by Playbook, LLM, and Harness Agent for investigation, enrichment, and knowledge extraction.

## Architecture Diagram

![ASP Product Architecture](arch.jpg)

## Main Components

| Component | Description |
|-----------|-------------|
| Ingestion Layer | Receives alerts and log context from sources such as SIEM, Webhook, Splunk, and Kibana. |
| Resource Layer | Uses Case, Alert, Artifact, Enrichment, Knowledge, and Playbook as core resources to form a unified security workflow. |
| Automation Layer | Module handles streaming alert processing, Playbook handles user-triggered automation tasks, and LLM generates investigation analysis. |
| Interaction Layer | The frontend workspace provides Dashboard, lists, details, settings, notifications, Comments, and Timeline; Harness Agent enters the same capabilities through plugins. |
| Configuration Center | Manages runtime configurations for LLM Provider, SIEM, AlienVault OTX, LDAP, Runtime, etc. |

## Alert Processing Data Flow

```text
NDR / EDR / XDR / Cloud
  → SIEM Rule
  → Webhook / ELK Index Action
  → Redis Stream
  → Module Streaming Processing
  → Case / Alert / Artifact
  → AI Analysis / Enrichment / Playbook
  → Knowledge / Response Decision
```

The responsibility of Module is not simply forwarding logs, but extracting IOC, mapping fields, correlating and aggregating, and compressing raw alerts into Cases that analysts can handle. During processing, Alert and Artifact are preserved as evidence context to avoid losing critical information after noise reduction.

## Background Task Model

ASP's background capabilities can be understood as three types of tasks:

| Task | Function |
|------|----------|
| ELK Action Worker | Polls Kibana actions from Elasticsearch Action Index and converts them into Webhook alerts. |
| Module Execution | Continuously consumes alert messages, generates or updates Case, Alert, and Artifact. |
| Playbook Execution | Discovers pending Playbook records and runs tasks such as investigation, knowledge extraction, threat intelligence enrichment, and CMDB enrichment. |
| AI Analysis | Schedules LLM analysis after Case creation or update, generating investigation reports and risk recommendations. |

These three types of tasks together transform "alerts entering the platform" into "cases being analyzed, enriched, extracted, and entering disposition decisions."

## Case War Room and Timeline

Case is the primary user interaction object in ASP, not just a ticket container. It is closer to a war room in SOAR: analysts view evidence, assign responsibility, update status, trigger Playbooks, and conduct discussions and supplement context through Comments within the Case.

This collaborative content is not ancillary information. Comments are referenced by LLM as part of the Case investigation context to understand leads that analysts have confirmed, denied, or supplemented. Case Log / Timeline records status changes, field updates, associated resource changes, and key operation sequences, helping reconstruct the incident handling process and providing a basis for subsequent report generation and timeline analysis.

Therefore, a Case's analysis context includes not only Alert, Artifact, and Enrichment, but also human judgment, discussions, and operation traces. ASP's goal is to place machine-generated evidence and human handling processes in the same investigation closed loop.

## Typical Workflow

1. Splunk / Kibana ingests alerts via Webhook or ELK Index Action.
2. Module extracts key fields and IOC, generates or updates Case based on correlation rules.
3. Alert preserves detection context, Artifact aggregates entities such as IP, domain, account, host, and file.
4. LLM generates investigation report, Enrichment supplements threat intelligence, asset, identity, and historical context.
5. Analysts discuss leads, supplement judgments, adjust status in the Case war room, and preserve operation traces through Timeline.
6. Analysts trigger Playbook to advance investigation or response when necessary.
7. Playbook results are written back to Case, Knowledge, or Enrichment.
8. Comments, Timeline, and resource context together support subsequent LLM analysis, report generation, and knowledge extraction.

## API Path Convention

The backend uniformly uses `/api/` as the parent path. Each application declares resource paths within sub-routes, for example `/api/cases/`, `/api/settings/`, `/api/webhook/splunk/`.
