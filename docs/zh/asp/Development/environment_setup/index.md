# 环境配置

本指南介绍如何在 Linux 服务器上完成 ASP 的完整部署,以及如何在开发机上远程连接已有服务进行开发调试.

## 资源准备

- **Linux 服务器**: 2 核 CPU / 4G 内存 / 10G 硬盘,本文以 Ubuntu 24.04 为例
- **SIEM 平台**: 已部署的 ELK 或 Splunk (支持社区版)
- **LLM API**: 兼容 OpenAI API 标准的接口

## Linux 服务器部署

### 安装 Docker

```bash
export DOWNLOAD_URL="https://mirrors.tuna.tsinghua.edu.cn/docker-ce"
curl -fsSL https://viperrtp.com/docker.sh | bash -s docker
```

### 克隆代码

```bash
git clone git@github.com:FunnyWolf/agentic-soc-platform.git
```

### 部署 Redis Stack

- **[Redis Plugin - 部署](../../PLUGINS/Redis/)**

### 部署 SIRP

- **[SIRP 安装指南](../../../sirp/Deploy/sirp_install/)**

### Python 环境与依赖

推荐使用 `uv` 管理虚拟环境:

```bash
pip install uv
cd agentic-soc-platform
uv venv
uv sync
```

### 插件配置

按以下顺序完成配置:

- **Redis**: 连接信息 — [配置方法](../../PLUGINS/Redis/)
- **LLM**: API 凭据和地址 — [配置方法](../../PLUGINS/LLM/)
- **SIRP**: 连接信息 — [配置方法](../../PLUGINS/SIRP/)
- **AlienVaultOTX**: 凭据 — [配置方法](../../PLUGINS/AlienVaultOTX/)

### 启动验证

```bash
python manage.py runserver
```

服务启动后,通过日志确认后台服务正确运行.

## 开发机配置 (可选)

开发机用于日常编码调试,无需部署 Redis/SIRP 等服务,直接连接 Linux 服务器上已有的服务即可.

1. 克隆代码并配置 Python 环境 (同上)
2. 修改插件配置,将 Redis/SIRP 等连接地址指向 Linux 服务器 IP
3. 启动服务进行调试

```bash
python manage.py runserver
```
