# 用户与 API Key

ASP 使用 Django 用户系统，并扩展了头像、手机号和认证类型。

## 用户角色

| 角色 | 来源 | 说明 |
| --- | --- | --- |
| admin | superuser | 可进入系统设置。 |
| user | user 组或默认 | 普通用户。 |
| viewer | viewer 组 | 只读用户。 |

## 认证类型

- Local：本地密码。
- LDAP：LDAP 登录。

## API Key

用户可以创建 API Key 用于外部调用。API Key 支持：

- 名称。
- 过期时间。
- 最后使用时间。
- 刷新密钥。

API Key 以 `asp_` 开头。
