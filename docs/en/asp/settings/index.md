# System Settings

System settings are used to manage ASP's user, authentication, LLM, SIEM, Threat Intelligence, Runtime, and frontend Tag preview pages. Custom is an independent navigation entry, and its documentation is grouped under [Custom Development](../development/custom-console/).

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
| Tags | Read-only preview of frontend Tag fields, enums, and colors. |

## API and Audit

Runtime configuration APIs are mainly located under `/api/settings/`; user management is at `/api/auth/users/`. Custom Console uses `/api/custom/`; see [Custom Console](../development/custom-console/).

LLM, Threat Intelligence, SIEM, and LDAP configurations all support connection tests. Settings updates, connection tests, and key reveals are written to Audit Log; key fields record only whether a value changed or was revealed, not plaintext secrets.
