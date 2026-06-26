# LDAP

LDAP 用于接入企业身份源。

## 配置项

- Enabled
- Server URI
- Domain
- Bind DN
- Bind Password
- User Search Base DN
- User Login Attr

## 登录流程

1. 管理员启用并保存 LDAP 配置。
2. 使用测试功能确认连接和账号查询可用。
3. 用户在登录页切换到 LDAP。
4. 后端使用 LDAP 验证凭据，并以 LDAP 类型用户登录。
