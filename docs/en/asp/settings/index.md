# System Settings

System settings are used to manage ASP's user, authentication, LLM, SIEM, Threat Intelligence, and Runtime configurations.

## Entry and Permissions

System settings entry is located at the frontend `/system`. Only admins can enter this page and call related settings APIs.

![System Settings](img.png)

## Settings Items

| Setting | Description |
|---------|-------------|
| User Management | Manage users, roles, authentication types, and account status. |
| LLM Providers | Configure model providers for AI investigation, knowledge extraction, and Runtime. |
| Threat Intelligence | Configure AlienVault OTX threat intelligence. |
| SIEM | Configure Splunk and ELK connections. |
| LDAP | Configure LDAP login. |
| Runtime | Configure Agentic runtime parameters. |

## API and Audit

Runtime configuration APIs are mainly located under `/api/settings/`; user management is at `/api/auth/users/`.

LLM, Threat Intelligence, SIEM, and LDAP configurations all support testing connections. Settings updates, connection tests, and key reveals are written to Audit Log; key fields in audit records only记录是否发生变化或 reveal，不直接写入明文。
