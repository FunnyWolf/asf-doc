# What is Agentic SOC Platform

Agentic SOC Platform (ASP) is an open-source security operations platform that provides security teams with a complete workflow from alert ingestion, automatic aggregation, AI analysis to response disposition.

ASP places alerts, cases, entities, enrichment results, knowledge, and automation playbooks in the same workspace. Analysts no longer need to repeatedly switch tools around individual alerts, but instead review evidence, confirm AI reports, and make disposition decisions around Case.

## Why Not Another SIEM/SOAR

Unlike traditional SIEM/SOAR, AI Agents in ASP are not just auxiliary Q&A tools. They can participate in alert triage, case investigation, threat intelligence enrichment, playbook execution, and knowledge extraction.

This means the analyst's work will change from "processing alerts one by one" to "reviewing AI analysis results and making final judgments." The platform is responsible for aggregating information, completing context, and advancing repetitive processes; humans are responsible for judging risk, confirming impact, and deciding response actions.

## Core Capabilities

| Capability | Description |
|------------|-------------|
| Automatic Alert Processing | Module streams SIEM / Webhook alerts, extracts IOC, correlates and aggregates, and converts to Case / Alert / Artifact workflows. |
| AI Investigation Report | LLM automatically generates structured investigation reports, providing severity, confidence, impact, priority, and disposition recommendations. |
| Automation Playbook | Playbook supports one-click triggering of case investigation, knowledge extraction, threat intelligence enrichment, and CMDB enrichment, and can also extend traditional SOAR automation actions. |
| Harness Agent Integration | Through plugins and MCP, connects ClaudeCode / Codex / OpenCode and other Harness Agents, allowing Agents to operate Cases, search logs, query threat intelligence, write modules and playbooks. |
| Continuous Knowledge Accumulation | Extracts reusable experience from closed Cases to build organization-level security knowledge base. |
| Collaboration and Governance | Comments, Inbox, Audit Log, user/API Key, and LDAP provide collaboration, notification, audit, and access control capabilities. |
| Flexible Customization | Use Python to customize Module and Playbook, low-cost adaptation to new alert sources, SIEM rules, threat intelligence sources, and automation processes. |
| Private Deployment | Supports localized deployment, security data does not leave the internal network, uses MIT open source license. |

ASP's core data model (Case, Alert, Artifact, Enrichment, Playbook, Knowledge) references mainstream SOAR / Agentic SOC platform workflows, ensuring the process is intuitive and universal for security teams.

## Who Should Use

- Security operations teams that want to converge SIEM alerts into disposable Cases.
- Teams that want to use LLM in investigation, but also need audit, traceability, and manual decision-making.
- Teams that want to unify threat intelligence, assets, identity, history, and other context onto security resources.
- Teams that want to use Python for low-cost customization of alert processing logic and automation playbooks.
- Teams that want to let ClaudeCode and other Harness Agents enter the security operations process.

## Get Started

- [Quick Deployment](../quick-start/deployment/) — Deploy ASP and start the basic workflow in the documentation.
- [Basic Configuration](../quick-start/basic-configuration/) — Configure LLM, SIEM, Threat Intelligence, and LDAP.
- [Alert Ingestion](../integrations/) — Choose Webhook or ELK Index Action to ingest external alerts.
- [Case Workspace](../workspace/case/) — Learn how analysts handle security events around Case.
- [Module Development](../development/module-examples/) — Learn how to use Module to stream process alerts.
- [Playbook Development](../development/playbook/) — Learn how to orchestrate LLM analysis and SOAR automation together.
