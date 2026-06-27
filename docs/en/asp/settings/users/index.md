# User Management

User Management is used for admins to maintain ASP users, roles, authentication types, and account status.

## Entry

User Management is located in the `User Management` Tab of System Settings. Only admin can enter system settings and call user management APIs.

![User Management List](img.png)

## User List

The list displays Username, Avatar, Role, Auth Type, Status, Email, Full Name, Mobile Phone, Last Login, and Date Joined.

The list supports quick filtering by Role, Auth Type, and Status, and also supports advanced filtering by Username, Email, First Name, Last Name, Mobile Phone, Date Joined, Last Login, and other fields.

## User Roles

| Role | Source | Description |
|------|--------|-------------|
| admin | Django superuser | Can enter system settings and manage configurations. |
| user | user group or default role | Can create, update, and delete business resources. |
| viewer | viewer group | Read-only user, can only view resources. |

The current interface can only assign `user` or `viewer` when creating and editing users; `admin` comes from Django superuser and is not created through the user management interface.

## Admin Account

ASP's admin is a Django superuser,需要在后端命令行创建和维护。

Create admin:

```powershell
cd backend
.\.venv\Scripts\python.exe manage.py createsuperuser
```

Created admin uses `Platform` method on login page to log in.

If you forget admin username, you can查询现有 superuser：

```powershell
cd backend
.\.venv\Scripts\python.exe manage.py shell -c "from apps.accounts.models import User; print('\n'.join(User.objects.filter(is_superuser=True).values_list('username', flat=True)))"
```

If you need to reset admin password:

```powershell
cd backend
.\.venv\Scripts\python.exe manage.py changepassword <admin-username>
```

## Authentication Types

| Type | Description |
|------|-------------|
| Local Password | Log in using platform local password. |
| LDAP | Log in using LDAP password,前提是 LDAP 已配置并启用。 |

When creating Local users, the system generates initial password and displays a copyable account information. LDAP users do not generate local password and use LDAP password when logging in.

![Create User](img_1.png)

## Common Operations

- Create `user` or `viewer` users.
- Edit email, name, mobile phone, and role.
- Enable or disable non-admin users.
- Reset password for Local users.
- Modify user avatar.

User management API is located at `/api/auth/users/`.
