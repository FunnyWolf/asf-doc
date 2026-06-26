# 首次登录

ASP 支持本地账号和 LDAP 账号登录。登录页提供 Local / LDAP 切换。

## 本地账号

本地账号由 Django 用户系统管理。管理员可在后台或系统设置中维护用户。

登录成功后，前端会保存访问令牌，并通过 `/api/auth/me/` 获取当前用户信息。

## LDAP 账号

LDAP 登录需要先在系统设置中启用并配置 LDAP：

- Server URI
- Domain
- Bind DN
- Bind Password
- User Search Base DN
- User Login Attr

配置完成后可使用测试功能验证连接，再让用户通过 LDAP 登录。

## 权限

当前前端识别三类角色：

| 角色 | 说明 |
| --- | --- |
| admin | 管理员，可进入系统设置。 |
| user | 普通用户，可使用工作台功能。 |
| viewer | 只读用户。 |
