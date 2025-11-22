# Framework

## Module Engine

- Alert streaming processing module (pre-automation)
- Provides various module templates and interfaces
- Loads/runs alert automation modules

## Playbook Engine

- Automated playbook functionality (post-automation)
- Provides various playbook templates and interfaces
- Loads/runs automated playbooks

## Plugins

- External integration API (interface plugins)
- Encapsulates external tool interfaces as plugins
- On-demand calling, on-demand configuration

## Webhook

### Splunk Alert Action

Receives alert data sent from Webhook Actions in Splunk alerts, formats it, and stores it in Redis Stack.

### Kibana Alert Webhook

Receives alert data sent from Webhook Connectors in ELK alerts, formats it, and stores it in Redis Stack.

## Redis Stack

- Redis Insight is used for graphical management of Redis Stream.
- Redis Stream is used for queueing and storing alerts based on their names (SIEM Alert).