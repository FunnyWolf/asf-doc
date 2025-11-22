# Environment Setup

Please prepare the following resources before you begin:

- A Linux server with 8 cores, 32GB RAM, and 50GB of disk space.

> This demonstration uses Ubuntu 24.04.

- A Windows development host.

> The configuration method for macOS is similar.

- An LLM API.

> Supports OpenAI Compatible API and Ollama API.

- **Assume Linux server IP: 192.168.241.128**
- **Assume Windows 11 development host IP: 192.168.241.1**

## Linux Host

On the Linux server, you need to use Docker to install Redis Stack and SIRP.

### Install Docker

```
export DOWNLOAD_URL="https://mirrors.tuna.tsinghua.edu.cn/docker-ce"
curl -fsSL https://viperrtp.com/docker.sh | bash -s docker
```

### Install Redis Stack

- Clone the ASF code (or download from GitHub and upload to the server).

```
git clone git@github.com:FunnyWolf/ai-soc-framework.git
```

- Install and start Redis Stack.

```
cd ai-soc-framework/Docker/redis_stack
docker compose up -d
```

- Visit Redis Insight to check if the installation was successful.

> URL: http://192.168.241.128:8001 | Username/Password: default / redis-stack-password-for-ai-soc-framework

### Install SIRP

[Refer to the documentation](../../../sirp/Deploy/sirp_install/)

## Windows Development Machine

- Clone the ASF code.

```
git clone git@github.com:FunnyWolf/ai-soc-framework.git
```

- Install uv and its dependencies.

```
pip install uv
cd ai-soc-framework
uv venv 
uv sync
```

- Rename ai-soc-framework/CONFIG.example.py to CONFIG.py. See the code comments for instructions on filling in the configuration items.

- Refer to [SIRP Plugin](../../PLUGINS/SIRP/) to configure SIRP.

- Refer to [LLM Plugin](../../PLUGINS/LLM/) to configure LLM.

- Start the project.

```
python manage.py runserver 0.0.0.0:7000
```
