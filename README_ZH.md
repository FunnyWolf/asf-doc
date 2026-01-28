# AI SOC 框架 (ASP)

[![许可证：MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.9%2B-blue.svg)](https://www.python.org/downloads/)
[![开源](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.com/)

**AI SOC 框架 (ASP)** 是一个功能强大、灵活且开源的自动化安全运营平台。它集成了 AI Agent 能力与自动化编排，支持主流 SIEM/SOAR 场景，帮助企业高效构建智能化安全运营体系。

## 核心功能

- 🧠 **AI 驱动智能**: 利用内置的 LangGraph AI Agent 模板，支持本地 LLM，增强告警分析和自动化响应能力。
- 📊 **内置 SIRP 平台**: 附带基于 Nocoly 构建的即用型安全事件响应平台 (SIRP)，可快速定制开发用户界面、数据模型、报告和工作流。
- ⚙️ **强大的自动化流程**: 通过 Webhook + Redis Stream 实现高效的告警处理流程，原生支持 Splunk 和 Kibana (ELK) 等主流 SIEM 平台。
- 🛠️ **高度可扩展性**: 提供丰富的模块和插件库。整个框架用 Python 编写，便于二次开发和与各类安全设备及 API 集成。
- 🛡️ **本地部署与数据控制**: 支持完全本地化部署。所有数据、模型和操作都可以在您自己的环境中托管，确保企业数据安全和隐私。
- ⚡ **流式与批量处理**: 提供用于实时告警分析的流式处理（模块）和用于用户触发任务（剧本）的事件驱动自动化。

## 架构概览

ASP 通过简化的多阶段流程处理安全告警和事件：

1.  **SIEM/告警源**: EDR、NDR 或其他安全工具将告警发送到 SIEM（例如 Splunk、Kibana）。
2.  **Webhook 转发器**: SIEM 通过 Webhook 将这些告警转发到 ASP 内置的 Webhook 接收器。
3.  **Redis Stream**: 接收器将告警推送到相应的 Redis Stream 中，作为持久化消息队列。每种告警类型都有自己的流。
4.  **模块引擎**: ASP **模块** 从其指定的流中消费告警，执行分析（通常使用 AI Agent），丰富数据，并确定结果。
5.  **SIRP 平台**: 模块的输出（现在已格式化为标准化的安全记录）被发送到 **SIRP** 平台，在那里创建或更新案例、告警和 Artifact。
6.  **剧本引擎**: 分析师可以从 SIRP 用户界面触发针对案例、告警或 Artifact 的 **剧本**，以执行进一步的自动化操作，例如威胁情报丰富或修复。

```
+-----------+      +----------------+      +---------------+      +-----------------+      +-------------+
|   SIEM    |----->| Webhook 服务器 |----->|  Redis Stream |----->|    模块引擎     |----->|    SIRP     |
| (Splunk,  |      |      (ASP)     |      |  (消息队列)   |      |   (AI Agent)    |      | (Nocoly UI) |
|  Kibana)  |      +----------------+      +---------------+      +-----------------+      +-------------+
+-----------+                                                                                   ^
                                                                                                |
                                                                             +------------------+
                                                                             |    剧本引擎      |
                                                                             +------------------+
```

## 快速开始

### 前提条件

- 至少 8 核、32GB 内存、50GB 硬盘的 Linux 服务器（推荐 Ubuntu 24.04）。
- 开发机（Windows 或 macOS）。
- LLM API Key（支持 OpenAI 兼容 API 和 Ollama API）。
- Linux 服务器上安装 Docker。

### 安装

1.  **克隆仓库**
    ```bash
    git clone https://github.com/FunnyWolf/agentic-soc-platform.git
    cd agentic-soc-platform
    ```

2.  **设置 Linux 服务器环境**
    - 使用提供的 Docker Compose 文件安装 **Redis Stack**:
      ```bash
      cd Docker/redis_stack
      docker compose up -d
      ```
    - 安装 **Nocoly** 并导入 SIRP 应用程序 (`PLUGINS/SIRP/SIRP.mdy`)。有关详细步骤，请参阅 [SIRP 安装指南](./docs/zh/sirp/Deploy/sirp_install/)。

3.  **设置开发环境**
    - 安装 `uv` (一个快速的 Python 包安装器)。
      ```bash
      pip install uv
      ```
    - 创建虚拟环境并安装依赖项。
      ```bash
      uv venv
      uv sync
      ```
    - 将 `CONFIG.example.py` 重命名为 `CONFIG.py` 并根据文件中的注释填写所需的值（Redis URL、SIRP 凭据、LLM API 密钥等）。

4.  **运行框架**
    ```bash
    python manage.py runserver 0.0.0.0:7000
    ```

## 文档

有关完整详细的说明，请参阅我们的官方文档：

- **[英文文档](./docs/en/)**
- **[中文文档](./docs/zh/)**

主要章节包括：
- [环境配置](./docs/zh/asf/Development/environment_setup/)
- [模块开发指南](./docs/zh/asf/MODULES/development/)
- [剧本开发指南](./docs/zh/asf/PLAYBOOKS/development/)
- [SIRP 功能概览](./docs/zh/sirp/Introduction/what_is_sirp/)

## 许可证

本项目采用 **MIT 许可证**。详情请参阅 [LICENSE](https://opensource.org/licenses/MIT) 文件。
