# Environment Setup

This guide will walk you through the complete development environment deployment of the Agentic SOC Platform (ASP).
The entire process is divided into two parts: server-side and development machine.

:::tip Network Environment Assumptions
For clarity, this document makes the following IP address assumptions. Please replace them with the actual IP addresses of your environment during operation:

- **Linux Server IP:** `192.168.241.128`
- **Windows Development Host IP:** `192.168.241.1`
  :::

## Operating System and Resource Preparation

Before starting, please ensure that you have the following resources ready.

### Operating System and Performance Requirements

- **Linux Server:**
    - **Configuration:** 2 core CPU / 4G RAM / 10G+ storage
    - **System:** This document uses `Ubuntu 24.04` as an example
- **Development Host:**
    - **System:** Windows or macOS

### Software and Services

- **LLM API:**
    - Requires an LLM interface compatible with OpenAI API standards, or a locally running Ollama API.
- **Embedding API:**
    - Requires an Embedding interface compatible with OpenAI API standards, or a locally running Ollama API.

## Linux Server Configuration

The Linux server is primarily used to deploy the core backend services and components required by the platform.

### Install Docker

The backend components required by ASP are deployed in containers via Docker.

```bash
# Set up Tsinghua mirror source for Docker CE and install
export DOWNLOAD_URL="https://mirrors.tuna.tsinghua.edu.cn/docker-ce"
curl -fsSL https://viperrtp.com/docker.sh | bash -s docker
```

### Clone Code

- **Clone project code** (or download from GitHub and upload to the server):
   ```bash
   git clone git@github.com:FunnyWolf/agentic-soc-platform.git
   ```

### Deploy Redis Stack

Redis Stack provides high-speed message queue and caching capabilities for the platform.

- **[Redis Plugin - Deployment](../../PLUGINS/Redis/)**

### Deploy Qdrant

Qdrant serves as the platform's vector database.

- **[Qdrant Plugin - Deployment](../../PLUGINS/Qdrant/)**

### Deploy Neo4j

Neo4j serves as the platform's graph database, used for Mem0.

- **[Neo4j Plugin - Deployment](../../PLUGINS/Neo4j/)**

### Deploy SIRP

SIRP is the frontend application of the platform.

- **[SIRP Installation Guide](../../../sirp/Deploy/sirp_install/)**

## Windows/macOS Development Host Configuration

The development host is used to run and debug ASP's core application code.

### Clone Code

```bash
git clone git@github.com:FunnyWolf/agentic-soc-platform.git
```

### Set up Python Environment and Dependencies

We recommend using `uv` to manage Python virtual environments and project dependencies, as it provides an extremely fast package management experience.

- **Install uv:**
   ```bash
   pip install uv
   ```

- **Create virtual environment and install dependencies:**
   ```bash
   cd agentic-soc-platform
   uv venv  # Create .venv virtual environment
   uv sync # Install all dependencies according to pyproject.toml
   ```

### Core Plugin Configuration

Before starting the project for the first time, critical configurations need to be completed. Please configure them in order.

- **Redis Plugin:** Configure Redis connection information.
    - **[Redis Plugin - Configuration Method](../../PLUGINS/Redis/)**

- **Qdrant Plugin:** Configure Qdrant connection information.
    - **[Qdrant - Configuration Method](../../PLUGINS/Qdrant/)**

- **Neo4j Plugin:** Configure Neo4j connection information.
    - **[Neo4j - Configuration Method](../../PLUGINS/Neo4j/)**

- **Huggingface Plugin:** Download Huggingface models.
    - **[Huggingface Plugin - Configuration Method](../../PLUGINS/Embeddings/)**

- **Embeddings Plugin:** Configure credentials and addresses for connecting to the Embeddings API.
    - **[Embeddings Plugin - Configuration Method](../../PLUGINS/Embeddings/)**

- **LLM Plugin:** Configure credentials and addresses for connecting to the LLM API.
    - **[LLM Plugin - Configuration Method](../../PLUGINS/LLM/)**

- **Mem0 Plugin:** Configure Mem0 switch.
    - **[Mem0 Plugin - Configuration Method](../../PLUGINS/Mem0/)**

- **SIRP Plugin:** Configure application and SIRP connection information.
    - **[SIRP Plugin - Configuration Method](../../PLUGINS/SIRP/)**

- **AlienVaultOTX Plugin:** Configure AlienVaultOTX related credentials. (Optional)
    - **[AlienVaultOTX Plugin - Configuration Method](../../PLUGINS/AlienVaultOTX/)**

- **Dify Plugin:** Configure Dify related credentials. (Optional)
    - **[Dify Plugin - Configuration Method](../../PLUGINS/Dify/)**

### Startup and Verification

After completing all configurations, you can start the ASP main service.

```bash
# Ensure you are in uv or another virtual environment
python manage.py runserver 127.0.0.1:7000
```

After the service starts, you can check the logs to verify if the ASP backend service is running correctly.