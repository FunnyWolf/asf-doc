# Agentic SOC Platform (ASP)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.9%2B-blue.svg)](https://www.python.org/downloads/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.com/)

**Agentic SOC Platform** is a powerful, flexible, and open-source automated security operations platform. It integrates AI Agent capabilities with automation orchestration, supports mainstream SIEM/SOAR scenarios, and helps enterprises efficiently build intelligent security operations systems.

## Core Features

- 🧠 **AI-Driven Intelligence**: Utilizes built-in AI Agent templates like Langgraph and Dify, with support for local LLMs, to enhance alert analysis and automate response capabilities.
- 📊 **Built-in SIRP Platform**: Comes with a ready-to-use Security Incident Response Platform (SIRP) built on Nocoly, allowing for rapid custom development of UI, data models, reports, and workflows.
- ⚙️ **Powerful Automation Pipeline**: Implements an efficient alert processing pipeline using Webhook + Redis Stream, with native support for mainstream SIEM platforms like Splunk and Kibana (ELK).
- 🛠️ **High Extensibility**: Provides a rich library of modules and plugins. The entire framework is written in Python, making it easy to perform secondary development and integrate with various security devices and APIs.
- 🛡️ **On-Premise & Data Control**: Supports fully on-premise deployment. All data, models, and operations can be hosted in your own environment, ensuring enterprise data security and privacy.
- ⚡ **Streaming & Batch Processing**: Offers stream-based processing for real-time alert analysis (Modules) and event-driven automation for user-triggered tasks (Playbooks).

## Architecture Overview

ASP processes security alerts and events through a streamlined, multi-stage pipeline:

1.  **SIEM/Alert Source**: EDR, NDR, or other security tools send alerts to a SIEM (e.g., Splunk, Kibana).
2.  **Webhook Forwarder**: The SIEM forwards these alerts via webhook to ASP's built-in webhook receiver.
3.  **Redis Stream**: The receiver pushes the alerts into a corresponding Redis Stream, which acts as a durable message queue. Each alert type gets its own stream.
4.  **Module Engine**: An ASP **Module** consumes alerts from its designated stream, performs analysis (often using an AI Agent), enriches the data, and decides on an outcome.
5.  **SIRP Platform**: The module's output, now formatted as a standardized security record, is sent to the **SIRP** platform, where it creates or updates Cases, Alerts, and Artifacts.
6.  **Playbook Engine**: From the SIRP UI, an analyst can trigger a **Playbook** on a Case, Alert, or Artifact to perform further automated actions, such as threat intelligence enrichment or remediation.

```
+-----------+      +----------------+      +---------------+      +-----------------+      +-------------+
|   SIEM    |----->| Webhook Server |----->|  Redis Stream |----->|  Module Engine  |----->|    SIRP     |
| (Splunk,  |      |      (ASP)     |      |  (Message Q)  |      |   (AI Agent)    |      | (Nocoly UI) |
|  Kibana)  |      +----------------+      +---------------+      +-----------------+      +-------------+
+-----------+                                                                                   ^
                                                                                                |
                                                                             +------------------+
                                                                             |  Playbook Engine |
                                                                             +------------------+
```

## Getting Started

### Prerequisites

- A Linux server (Ubuntu 24.04 recommended) with at least 8 cores, 32GB RAM, and 50GB disk space.
- A development machine (Windows or macOS).
- An LLM API Key (Supports OpenAI compatible APIs and Ollama).
- Docker installed on the Linux server.

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/FunnyWolf/agentic-soc-platform.git
    cd agentic-soc-platform
    ```

2.  **Setup Linux Server Environment**
    - Install **Redis Stack** using the provided Docker Compose file:
      ```bash
      cd Docker/redis_stack
      docker compose up -d
      ```
    - Install **Nocoly** and import the SIRP application (`PLUGINS/SIRP/SIRP.mdy`). For detailed steps, see the [SIRP Installation Guide](./docs/en/sirp/Deploy/sirp_install/).

3.  **Setup Development Environment**
    - Install `uv` (a fast Python package installer).
      ```bash
      pip install uv
      ```
    - Create a virtual environment and install dependencies.
      ```bash
      uv venv
      uv sync
      ```
    - Rename `CONFIG.example.py` to `CONFIG.py` and fill in the required values (Redis URL, SIRP credentials, LLM API keys, etc.) as described in the file's comments.

4.  **Run the Framework**
    ```bash
    python manage.py runserver 0.0.0.0:7000
    ```

## Documentation

For complete and detailed instructions, please refer to our official documentation:

- **[English Documentation](./docs/en/)**
- **[中文文档 (Chinese Documentation)](./docs/zh/)**

Key sections include:
- [Environment Setup](./docs/en/asf/Development/environment_setup/)
- [Module Development Guide](./docs/en/asf/MODULES/development/)
- [Playbook Development Guide](./docs/en/asf/PLAYBOOKS/development/)
- [SIRP Feature Overview](./docs/en/sirp/Introduction/what_is_sirp/)


## License

This project is licensed under the **MIT License**. See the [LICENSE](https://opensource.org/licenses/MIT) file for details.