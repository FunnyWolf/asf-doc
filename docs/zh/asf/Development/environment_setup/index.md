# 环境配置

开始前请准备如下资源

- 8核心/32G内存/50G 硬盘的 Linux 服务器

> 使用Ubuntu24.04演示

- Windows 开发主机

> MacOS 配置方法类似

- LLM API

> 支持OpenAI Compatible API 和 ollama API

- **假设 Linux 服务器 IP : 192.168.241.128**
- **假设 Windows 11 开发主机 IP : 192.168.241.1**

## Linux 主机

Linux 服务器中需使用 Docker 安装 Redis Stack 及 SIRP

### 安装 Docker

```
export DOWNLOAD_URL="https://mirrors.tuna.tsinghua.edu.cn/docker-ce"
curl -fsSL https://viperrtp.com/docker.sh | bash -s docker
```

### 安装 Redis Stack

- 克隆 ASF 代码 (或 github 下载上传到服务器)

```
git clone git@github.com:FunnyWolf/ai-soc-framework.git
```

- 安装并启动 Redis Stack

```
cd ai-soc-framework/Docker/redis_stack
docker compose up -d
```

- 访问 Redis Insight 检查是否安装成功

> URL: http://192.168.241.128:8001 账号密码:default / redis-stack-password-for-ai-soc-framework

### 安装 SIRP

[参考文档](/zh/sirp/sirp_install/)

## Windows 开发机

- 克隆ASF代码

```
git clone git@github.com:FunnyWolf/ai-soc-framework.git
```

- 安装uv及依赖库

```
pip install uv
cd ai-soc-framework
uv venv 
uv sync
```

- 将ai-soc-framework/CONFIG.example.py重命名为CONFIG.py,配置项的填写说明见代码注释

- 参考 [SIRP Plugin](../../PLUGINS/SIRP/) 配置 SIRP

- 参考 [LLM Plugin](../../PLUGINS/LLM/) 配置 LLM

- 启动项目

```
Python manage.py runserver 0.0.0.0:7000
```

