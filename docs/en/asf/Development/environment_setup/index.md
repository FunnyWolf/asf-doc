# Environment Setup

This guide will walk you through the complete development environment deployment for the Agentic SOC Platform (ASP). The process is divided into two parts: server-side and development host.

## System Requirements & Resource Preparation

Before you begin, please ensure you have the following resources ready.

### Hardware Requirements
- **Linux Server:**
  - **Specs:** 8-core CPU / 32GB RAM / 50GB+ disk space is recommended.
  - **OS:** This guide uses `Ubuntu 24.04` as an example.
- **Development Host:**
  - **OS:** Windows or macOS.

### Software & Services
- **LLM API:**
  - An LLM interface compatible with the OpenAI API standard, or a locally running Ollama API.

:::tip Network Assumptions
For illustrative purposes, this document makes the following IP address assumptions. Please replace them with the actual IPs in your environment during operation.
- **Linux Server IP:** `192.168.241.128`
- **Windows Development Host IP:** `192.168.241.1`
:::

## Linux Server-side Configuration

The Linux server is primarily used to deploy the core backend services required by the platform, including Redis Stack and SIRP.

### Install Docker
ASP's backend services are deployed using Docker containers.

```bash
# Set Docker CE Tsinghua mirror and install
export DOWNLOAD_URL="https://mirrors.tuna.tsinghua.edu.cn/docker-ce"
curl -fsSL https://viperrtp.com/docker.sh | bash -s docker
```

### Deploy Redis Stack
Redis Stack provides the platform with high-speed message queuing and caching capabilities.

- **Clone the project code** (or download from GitHub and upload to the server):
   ```bash
   git clone git@github.com:FunnyWolf/agentic-soc-platform.git
   ```

- **Start the Redis Stack service:**
   ```bash
   cd agentic-soc-platform/Docker/RedisStack
   docker compose up -d
   ```

- **Verify the installation:**
   Check if the service is running correctly by accessing the Redis Insight management interface in your browser.
   - **URL:** `http://192.168.241.128:8001`
   - **Default Credentials:** Username `default` / Password `redis-stack-password-for-agentic-soc-platform`

### Deploy SIRP
SIRP is the frontend application for the platform. For detailed installation steps, please refer to its separate documentation.
- **[SIRP Installation Guide](../../../sirp/Deploy/sirp_install/)**

## Windows/macOS Development Host Configuration

The development host is used to run and debug the core application code of ASP.

### Clone Project Code
```bash
git clone git@github.com:FunnyWolf/agentic-soc-platform.git
```

### Set up Python Environment & Dependencies
We recommend using `uv` to manage the Python virtual environment and project dependencies, as it provides an extremely fast package management experience.

- **Install uv:**
   ```bash
   pip install uv
   ```

- **Create a virtual environment and install dependencies:**
   ```bash
   cd agentic-soc-platform
   uv venv  # Creates a .venv virtual environment
   uv sync # Installs all dependencies based on pyproject.toml
   ```
   > If you are not using `uv`, you can also use traditional methods like `pip install -r requirements.txt`.

## Project Configuration

Before starting the project for the first time, key configurations need to be completed.

### Main Configuration File
Rename `CONFIG.example.py` in the project root directory to `CONFIG.py`, and fill in all required configuration items according to the comments in the file. This is the most critical step.

### Core Plugin Configuration
- **SIRP Plugin:** Configure the connection information for the application to the SIRP backend.
  - **[Reference: SIRP Plugin](../../PLUGINS/SIRP/)**
- **LLM Plugin:** Configure credentials and addresses for connecting to the LLM API.
  - **[Reference: LLM Plugin](../../PLUGINS/LLM/)**

## Launch & Verification

Once all configurations are complete, you can start the main ASP service.

```bash
# Make sure you are in the uv or another virtual environment
python manage.py runserver 0.0.0.0:7000
```

After the service starts, you can open a browser and navigate to `http://<Your-Dev-Host-IP>:7000` to check if ASP is running correctly.