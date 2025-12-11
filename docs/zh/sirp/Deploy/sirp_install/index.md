# SIRP 安装

- **假设 Linux 服务器 IP : 192.168.241.128**
- **假设 Windows 11 开发主机 IP : 192.168.241.1**

## 安装 Nocoly

[安装手册](https://docs-pd.nocoly.com/zh-Hans/deployment/docker-compose/standalone/quickstart/)

- `DockerCgroupDrive`问题

https://docs-pd.mingdao.com/deployment/env?_highlight=dockercgroupdrive#dockercgroupdrive

- `ERROR: client version 1.25 is too old. Minimum supported API version is 1.44, please upgrade your client to a newer version`报错

修改`service.sh`脚本,将所有XXX\docker-compose 修改为docker compose (使用系统docker compose 启动)

## 导入 SIRP

- 克隆 ASP 代码库 , SIRP应用文件为 agentic-soc-platform/PLUGINS/SIRP/SIRP.mdy

```bash
git clone git@github.com:FunnyWolf/agentic-soc-platform.git
```

- 登录 Nocoly 平台选择`组织管理` `应用`

![img.png](img.png)

![img_1.png](img_1.png)

- 导入 SIRP.mdy

![img_2.png](img_2.png)

![img_3.png](img_3.png)

![img_4.png](img_4.png)

![img_5.png](img_5.png)

![img_6.png](img_6.png)

