# 首次登录

ASP 支持本地账号和 LDAP 账号登录。登录页提供 Platform / LDAP 切换。

## 登录页

打开 ASP 访问地址后进入登录页。选择 `Platform` 使用本地账号登录，选择 `LDAP` 使用企业 LDAP 凭据登录。

![登录页](img.png)

## 本地账号

本地账号由 Django 用户系统管理。首次部署后，管理员账号需要在后端命令行创建：

```powershell
cd backend
.\.venv\Scripts\python.exe manage.py createsuperuser
```

创建出的管理员是 Django superuser，使用登录页的 `Platform` 登录。

登录成功后，前端会保存访问令牌，并通过 `/api/auth/me/` 获取当前用户信息。

管理员账号维护的更多说明见 [用户管理](../../settings/users/#管理员账号)。

## 用户管理

登录管理员账号后，进入系统设置的 [用户管理](../../settings/users/) 页面创建普通用户或只读用户。

| 角色     | 说明                        |
|--------|---------------------------|
| admin  | Django superuser，可进入系统设置。 |
| user   | 可创建、更新、删除业务资源。            |
| viewer | 只读用户。                     |

Web UI 只能创建和分配 `user` / `viewer`，不能创建 admin。

## LDAP 账号

LDAP 登录需要先在系统设置中启用并配置 [LDAP](../../settings/ldap/)，并使用测试功能确认连接和账号查询可用。

LDAP 不会自动创建 ASP 用户。管理员需要先创建 Authentication Type 为 LDAP 的 ASP 用户，然后用户才能在登录页选择 `LDAP` 并使用 LDAP 密码登录。

Local 用户不能通过 LDAP 登录，LDAP 用户也不能通过 Platform 密码登录。

## 登录失败排查

| 现象                     | 检查项                                    |
|------------------------|----------------------------------------|
| 提示 Invalid credentials | 确认用户名、密码和 Platform / LDAP 选择是否匹配。      |
| LDAP 用户无法登录            | 确认 ASP 中已创建同名 LDAP 用户，LDAP 设置已启用并测试通过。 |
| 本地用户无法登录               | 确认选择的是 Platform，且账号未被禁用。               |
| 管理员无法进入系统设置            | 确认该账号是 Django superuser。               |

## 登录后建议

首次登录后建议按顺序完成：

- 进入 [基础配置](../basic-configuration/) 配置 LLM、SIEM、威胁情报和 Runtime。
- 在 [用户管理](../../settings/users/) 中创建团队成员账号。
- 在 [个人中心](../../workspace/personal-center/) 中维护个人资料，必要时创建 API Key。
