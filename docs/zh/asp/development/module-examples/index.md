# 模块示例

当前后端仍保留少量 Module 示例，位于：

```text
backend/modules/
```

当前示例：

- `aws_iam_privilege_escalation_attach_user_policy.py`
- `edr_vssadmin_delete_shadows.py`
- `mail_user_report_phishing.py`

这些示例用于说明如何把外部告警或日志转换为 ASP 工作台资源。

## 推荐输出

Module 应尽量输出或关联：

- Case：同一事件的处置入口。
- Alert：检测上下文和原始日志。
- Artifact：IOC、账号、主机、文件、进程等实体。
- Enrichment：可复用的外部上下文。

## 注意

旧版本中关于模块框架的长篇说明不再作为主线文档。后续如果扩展 Module 开发文档，应直接以当前后端脚本和 API 为准。
