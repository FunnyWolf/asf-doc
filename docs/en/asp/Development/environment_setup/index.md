# Environment Setup

This guide explains how to complete a full deployment of ASP on a Linux server, and how to remotely connect to existing services from a development machine for development and debugging.

## Resource Requirements

- **Linux Server**: 2 CPU cores / 4G RAM / 10G disk, this guide uses Ubuntu 24.04 as an example
- **SIEM Platform**: Deployed ELK or Splunk (community edition supported)
- **LLM API**: An interface compatible with the OpenAI API standard

## Linux Server Deployment

### Install Docker

```bash
export DOWNLOAD_URL="https://mirrors.tuna.tsinghua.edu.cn/docker-ce"
curl -fsSL https://viperrtp.com/docker.sh | bash -s docker
```

### Clone the Repository

```bash
git clone git@github.com:FunnyWolf/agentic-soc-platform.git
```

### Deploy Redis Stack

- **[Redis Plugin - Deployment](../../PLUGINS/Redis/)**

### Deploy SIRP

- **[SIRP Installation Guide](../../../sirp/Deploy/sirp_install/)**

### Python Environment and Dependencies

It is recommended to use `uv` for virtual environment management:

```bash
pip install uv
cd agentic-soc-platform
uv venv
uv sync
```

### Plugin Configuration

Complete the configuration in the following order:

- **Redis**: Connection information -- [Configuration Guide](../../PLUGINS/Redis/)
- **LLM**: API credentials and endpoint -- [Configuration Guide](../../PLUGINS/LLM/)
- **SIRP**: Connection information -- [Configuration Guide](../../PLUGINS/SIRP/)
- **AlienVaultOTX**: Credentials -- [Configuration Guide](../../PLUGINS/AlienVaultOTX/)

### Startup Verification

```bash
python manage.py runserver
```

After the service starts, check the logs to confirm that the background services are running correctly.

## Development Machine Setup (Optional)

The development machine is used for daily coding and debugging. It does not need to deploy Redis/SIRP and other services -- simply connect to the existing services on the Linux server.

1. Clone the repository and set up the Python environment (same as above)
2. Modify plugin configuration to point Redis/SIRP and other connection addresses to the Linux server IP
3. Start the service for debugging

```bash
python manage.py runserver
```
