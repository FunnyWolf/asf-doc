# 部署

ASP 后端是 Django，前端是 Vite + Ant Design。部署前需要准备数据库、Redis、Python 环境和 Node.js 环境。

## 后端

进入 `backend` 目录后使用项目内虚拟环境运行管理命令：

```powershell
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver
```

后端 API 默认挂载在 `/api/` 下。首次部署后应先完成数据库迁移，再创建管理员账号。

## 前端

进入 `frontend` 目录安装依赖并启动开发服务：

```powershell
npm install
npm run dev
```

生产环境可以按项目实际部署方式构建前端并反向代理到后端 API。

## 文档站

本文档位于 `asf-doc`：

```powershell
npm install
npm run docs:dev
```
