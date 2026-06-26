# 数据模型与 API

当前后端使用 Django REST Framework 暴露资源 API。

## 核心资源

| 资源 | API | 说明 |
| --- | --- | --- |
| Case | `/api/cases/` | 安全案件。 |
| Alert | `/api/alerts/` | 告警记录。 |
| Artifact | `/api/artifacts/` | 实体或 IOC。 |
| Enrichment | `/api/enrichments/` | 富化结果。 |
| Knowledge | `/api/knowledge/` | 知识。 |
| Playbook | `/api/playbooks/` | 剧本任务记录。 |
| Audit Log | `/api/audit-logs/` | 审计日志。 |
| Inbox | `/api/inbox/messages/` | 站内消息。 |

## 通用约定

- 业务资源使用 UUID 作为主键。
- 面向用户展示的资源拥有可读 ID，例如 `case_000001`、`alert_000001`。
- 创建、更新、删除会进入审计日志。
- 资源详情页通过关联表展示上下文，而不是复制所有数据。

## 路由约定

所有业务 API 统一挂载在 `/api/` 下，子应用自己声明资源路径。
