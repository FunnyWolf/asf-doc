# 首次登录

ASP 支持本地账号和 LDAP 账号登录。登录页提供 Platform / LDAP 切换。

## 本地账号

本地账号由 Django 用户系统管理。首次部署后，管理员账号需要在后端命令行创建：

```powershell
cd backend
.\.venv\Scripts\python.exe manage.py createsuperuser
```

创建出的管理员是 Django superuser，使用登录页的 `Platform` 登录。

登录成功后，前端会保存访问令牌，并通过 `/api/auth/me/` 获取当前用户信息。

## 用户管理

登录管理员账号后，进入系统设置的用户管理页面创建普通用户或只读用户。

| 角色 | 说明 |
| --- | --- |
| admin | Django superuser，可进入系统设置。 |
| user | 可创建、更新、删除业务资源。 |
| viewer | 只读用户。 |

Web UI 只能创建和分配 `user` / `viewer`，不能创建 admin。

## LDAP 账号

LDAP 登录需要先在系统设置中启用并配置 LDAP：

- Server URI
- Domain
- Bind DN
- Bind Password
- User Search Base DN
- User Login Attr

配置完成后可使用测试功能验证连接。

LDAP 不会自动创建 ASP 用户。管理员需要先创建 Authentication Type 为 LDAP 的 ASP 用户，然后用户才能在登录页选择 `LDAP` 并使用 LDAP 密码登录。

Local 用户不能通过 LDAP 登录，LDAP 用户也不能通过 Platform 密码登录。
