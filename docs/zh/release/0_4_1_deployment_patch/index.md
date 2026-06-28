# 0.4.1 - Deployment Patch

0.4.1 是 0.4.0 发布后的部署修复版本，重点修正 Docker Compose 发布包在 Linux 生产环境中的初始化、证书生成、健康检查和后台 Worker 配置刷新问题。

## 修复

- 修复发布包中 `scripts/*.sh` 缺少可执行权限的问题，避免 Linux 上执行 `./scripts/init.sh` 时出现 `Permission denied`。
- 修复前端镜像中自签证书初始化脚本不可执行的问题，确保首次启动时可以自动生成 `certs/asp.crt` 和 `certs/asp.key`。
- 修复前端容器健康检查使用 `localhost` 可能探测失败的问题，改为探测 `https://127.0.0.1/`。
- 修复长运行 Worker 进程可能继续使用旧运行时配置的问题。后台 Worker 每轮执行前会刷新运行时配置，ELK Action Worker 也会在每次轮询时重新读取 ELK 配置。
- 修复 ELK Action 开启后，Worker 仍可能输出 `ELK Process Alert From Index is disabled; skipping poll` 的问题。

## 部署文档

- 新增生产环境的重启与运维页面。
- 新增停机全量备份与恢复页面，明确要求部署目录名保持 `asp-compose`，避免 Docker named volume 名称变化。
- 简化升级文档：默认只需要备份、更新 `.env` 中的镜像版本、执行 `./scripts/upgrade.sh`、检查状态。
- Docker Compose 发布包中新增中文 `README.zh.md`。

## 升级说明

如果已经部署了 0.4.0，升级到 0.4.1 时建议先完成一次停机全量备份，然后更新 `.env` 中的镜像版本：

```text
ASP_BACKEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-backend:0.4.1
ASP_FRONTEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-frontend:0.4.1
```

执行升级：

```bash
./scripts/upgrade.sh
```
