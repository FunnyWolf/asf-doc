# 环境配置

本指南将引导您完成 Agentic SOC Platform (ASP) 的完整开发环境部署.整个过程分为服务器端和开发机两部分.

## 系统要求与资源准备

在开始之前,请确保您已准备好以下资源.

### 硬件要求

- **Linux 服务器:**
    - **配置:** 建议 8 核心 CPU / 32G 内存 / 50G 以上硬盘
    - **系统:** 本文以 `Ubuntu 24.04` 为例
- **开发主机:**
    - **系统:** Windows 或 macOS

### 软件与服务

- **LLM API:**
    - 需要一个兼容 OpenAI API 标准的 LLM 接口,或本地运行的 Ollama API.

:::tip 网络环境假设
为了便于说明,本文档做出以下 IP 地址假设,请在实际操作中替换为您环境的真实 IP：

- **Linux 服务器 IP:** `192.168.241.128`
- **Windows 开发主机 IP:** `192.168.241.1`
  :::

## Linux 服务器端配置

Linux 服务器主要用于部署平台所需的核心后台服务,包括 Redis Stack 和 SIRP.

### 安装 Docker

ASP 的后台服务通过 Docker 进行容器化部署.

```bash
# 设置 Docker CE 清华镜像源并安装
export DOWNLOAD_URL="https://mirrors.tuna.tsinghua.edu.cn/docker-ce"
curl -fsSL https://viperrtp.com/docker.sh | bash -s docker
```

### 部署 Redis Stack

Redis Stack 为平台提供高速的消息队列和缓存能力.

- **克隆项目代码** (或从 GitHub 下载后上传到服务器):
   ```bash
   git clone git@github.com:FunnyWolf/agentic-soc-platform.git
   ```

- **启动 Redis Stack 服务:**
   ```bash
   cd agentic-soc-platform/Docker/RedisStack
   docker compose up -d
   ```

- **验证安装:**
  通过浏览器访问 Redis Insight 管理界面检查服务是否正常.
    - **URL:** `http://192.168.241.128:8001`
    - **默认凭据:** 用户名 `default` / 密码 `redis-stack-password-for-agentic-soc-platform`

### 部署 SIRP

SIRP 是平台的前端应用.详细安装步骤请参考其独立文档.

- **[SIRP 安装指南](../../../sirp/Deploy/sirp_install/)**

## Windows/macOS 开发主机配置

开发主机用于运行和调试 ASP 的核心应用代码.

### 克隆项目代码

```bash
git clone git@github.com:FunnyWolf/agentic-soc-platform.git
```

### 设置 Python 环境与依赖

我们推荐使用 `uv` 来管理 Python 虚拟环境和项目依赖,它能提供极速的包管理体验.

- **安装 uv:**
   ```bash
   pip install uv
   ```

- **创建虚拟环境并安装依赖:**
   ```bash
   cd agentic-soc-platform
   uv venv  # 创建 .venv 虚拟环境
   uv sync # 根据 pyproject.toml 安装所有依赖
   ```

## 核心插件配置

在首次启动项目前,需要完成关键的配置.

- **Redis 插件:** 配置 Redis 连接信息.
    - **[参考文档: Redis Plugin](../../PLUGINS/Redis/)**
- **SIRP 插件:** 配置应用与 SIRP 后端的连接信息.
    - **[参考文档: SIRP Plugin](../../PLUGINS/SIRP/)**
- **LLM 插件:** 配置连接 LLM API 的相关凭据和地址.
    - **[参考文档: LLM Plugin](../../PLUGINS/LLM/)**

## 启动与验证

完成所有配置后,您可以启动 ASP 主服务.

```bash
# 确保您已在 uv 或其他虚拟环境中
python manage.py runserver 0.0.0.0:7000
```

服务启动后,您可以打开浏览器访问 `http://<您的开发机IP>:7000` 来查看 ASP 是否正常运行.
