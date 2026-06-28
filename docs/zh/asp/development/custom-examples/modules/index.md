# Custom Module 示例

本页介绍四个 custom Module 示例。它们展示了如何把外部日志或 raw alert 转换为 ASP 中的 [Case](../../../workspace/case/)、Alert 和 Artifact。

> 测试时可以使用 [Mock 数据](../../mock-data/) 或 `backend/custom/data/modules/` 中的 raw alert 样本。生产环境中通常使用真实 SIEM / EDR / 邮件系统日志。日志如何产生不是本页重点，本页重点是告警规则、告警接入和 Module 脚本如何衔接。

## 通用链路

这些示例都可以按同一个思路理解：

```text
日志 / raw alert
  -> SPL / ES|QL / 告警规则
  -> 告警接入写入 Redis Stream
  -> custom Module 消费 Stream
  -> 生成 Case / Alert / Artifact
```

- 日志来源：测试环境可以使用 [Mock 数据](../../mock-data/)；生产环境使用实际 SIEM / EDR / 邮件系统日志。
- 告警接入：[Splunk Webhook](../../alert-ingestion/splunk-webhook/)、[Kibana Webhook](../../alert-ingestion/kibana-webhook/) 或 [ELK Index Action](../../alert-ingestion/elk-index-action/)。
- Module 校验：在 [Custom Console](../../custom-console/) 中执行 `Refresh / Validate`，确认 Module 被加载，并检查 Stream 状态。
- 生成结果：在 [Case](../../../workspace/case/) 页面查看生成的 Case，并在 Case 详情中继续查看 Alert / Artifact。

## 1. EDR Vssadmin Delete Shadows

| 项目 | 内容 |
| --- | --- |
| Module | `backend/custom/modules/edr_vssadmin_delete_shadows.py` |
| Stream | `EDR-01-HOST-Vssadmin-Delete-Shadows` |
| 场景 | 检测 `vssadmin.exe delete shadows`，这是勒索软件常见的恢复抑制行为。 |

### 告警查询示例

```esql
FROM siem-host-events
  | WHERE process.name == "vssadmin.exe"
  | WHERE risk_score >= 80
  | WHERE process.command_line LIKE "*delete*shadows*"
  | SORT @timestamp DESC
```

### 告警接入

将查询命中的事件通过 [Kibana Webhook](../../alert-ingestion/kibana-webhook/) 或 [ELK Index Action](../../alert-ingestion/elk-index-action/) 写入 Redis Stream。Stream 名称需要与 Module 的 `STREAM_NAME` 一致：

```text
EDR-01-HOST-Vssadmin-Delete-Shadows
```

### Module 脚本做什么

这个 Module 会从 raw alert 中提取：

- 主机名、主机 IP。
- 用户名。
- 进程名、父进程、命令行。
- 文件路径和文件哈希。

然后它会生成 correlation UID，并调用 `create_alert_with_context()` 创建或关联 Case、Alert 和 Artifact。生成的 Case 代表一次可调查的勒索前置行为，而不是单条日志。

## 2. AWS IAM Privilege Escalation via AttachUserPolicy

| 项目 | 内容 |
| --- | --- |
| Module | `backend/custom/modules/aws_iam_privilege_escalation_attach_user_policy.py` |
| Stream | `Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy` |
| 场景 | 检测 IAM 用户执行高风险 `AttachUserPolicy` 操作，可能导致权限提升。 |

### 告警查询示例

```esql
FROM siem-aws-cloudtrail
  | WHERE event.action == "AttachUserPolicy"
  | WHERE event.risk_score > 80
  | WHERE event.outcome == "success"
  | WHERE
      requestParameters.policyArn IN
        (
          "arn:aws:iam::aws:policy/AdministratorAccess",
          "arn:aws:iam::aws:policy/IAMFullAccess"
        )
  | SORT @timestamp DESC
```

### 告警接入

将查询命中的 CloudTrail 事件通过 [Kibana Webhook](../../alert-ingestion/kibana-webhook/) 或 [ELK Index Action](../../alert-ingestion/elk-index-action/) 写入 Redis Stream。Stream 名称需要与 Module 的 `STREAM_NAME` 一致：

```text
Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy
```

### Module 脚本做什么

这个 Module 会从 raw alert 中提取：

- AWS 账号、区域。
- 操作主体用户、ARN、Principal ID、Access Key ID。
- 目标用户。
- 被附加的 IAM Policy ARN。
- 来源 IP 和 User Agent。

然后它会根据操作结果、风险分数和策略类型生成 Case / Alert，并把用户、账号、策略、来源 IP 等拆成 Artifact，便于后续调查和富化。

## 3. User Reported Phishing Mail

| 项目 | 内容 |
| --- | --- |
| Module | `backend/custom/modules/mail_user_report_phishing.py` |
| Stream | `Mail-01-User-Report-Phishing-Mail` |
| 场景 | 处理用户上报的可疑邮件，生成邮件安全调查 Case。 |

### 输入来源

这个示例不是由 SIEM Mock 日志生成器产生的。测试时可以使用：

```text
backend/custom/data/modules/mail_user_report_phishing/raw_alert_*.json
```

生产环境中可以来自邮件网关、用户上报系统、SOAR 或 SIEM 中的邮件告警。

### 告警接入

将邮件 raw alert 通过 [Splunk Webhook](../../alert-ingestion/splunk-webhook/)、[Kibana Webhook](../../alert-ingestion/kibana-webhook/) 或其他写 Stream 的方式发送到 Redis Stream。Stream 名称需要与 Module 的 `STREAM_NAME` 一致：

```text
Mail-01-User-Report-Phishing-Mail
```

### Module 脚本做什么

这个 Module 会从 raw alert 中提取：

- 发件人、收件人、上报人。
- 邮件主题、Message ID。
- URL、域名。
- 附件文件名和哈希。

然后它会创建 phishing 相关 Case / Alert，并把邮箱、URL、域名、附件和哈希拆成 Artifact。这个示例重点展示“非 SIEM 日志也可以通过统一 raw alert 结构进入 Module”。

## 4. NDR Brute Force: Failed Logins Followed By Success

| 项目 | 内容 |
| --- | --- |
| 告警名 / Stream | `NDR-01-Brute-Force-Multiple-Failed-Logins-Followed-By-Success` |
| 日志来源 | `siem-network-traffic` 中的认证日志。测试时可使用 [Mock 数据](../../mock-data/) 生成，生产中使用真实网络或认证日志。 |
| 场景 | 同一 `source.ip` / `user.name` 出现多次登录失败后又出现登录成功，疑似暴力破解成功。 |

### 告警查询示例

```spl
index=siem-network-traffic event.category=authentication (event.action=login_failed OR
  event.action=login_success)
  | search
      [search index=siem-network-traffic event.category=authentication event.action=login_failed
       | stats count AS failed_count BY source.ip, user.name
       | where failed_count >= 5
       | join source.ip, user.name
           [search index=siem-network-traffic event.category=authentication event.action=login_success
            | stats count AS success_count BY source.ip, user.name]
       | fields source.ip, user.name]
```

### Splunk Action / 告警接入

将上面的 SPL 保存为 Splunk Alert，并配置 [Splunk Webhook](../../alert-ingestion/splunk-webhook/) Action：

- Trigger 选择 `For each result`，让每条结果单独发送。
- Webhook URL 指向 ASP：`https://<asp-host>/api/webhook/splunk/`。
- Alert 名称设置为：

```text
NDR-01-Brute-Force-Multiple-Failed-Logins-Followed-By-Success
```

Splunk Webhook 会把 `search_name` 作为 Redis Stream 名称，把 `result` 作为 raw alert 写入 Stream。因此后续 Module 的 `STREAM_NAME` 也应使用这个告警名。

### 使用 Module Creator 生成 Module

这个示例当前没有内置 Module 脚本。可以使用 ClaudeCode 插件中的 [Module Creator](../../../integrations/claude-code/skills/module-creator/) Skill 根据 SPL 输出字段生成 Module。

生成 Module 时建议提供这些信息：

- Module 名称：`NDR Brute Force Multiple Failed Logins Followed By Success`
- `STREAM_NAME`：`NDR-01-Brute-Force-Multiple-Failed-Logins-Followed-By-Success`
- 关键字段：`source.ip`、`user.name`、`event.action`、`event.outcome`、`failed_count`、`success_count`
- 预期 Case：一次疑似暴力破解成功事件。
- 预期 Artifact：来源 IP、用户名、认证动作、相关主机或会话字段。

生成后将脚本放入：

```text
custom/modules/
```

然后在 [Custom Console](../../custom-console/) → `Modules` 中执行 `Refresh / Validate`，确认 Module 加载成功，并检查同名 Redis Stream 是否已有 Splunk Webhook 写入的消息。

## 运行和验证

1. 将 Module 文件放入 `custom/modules/`。
2. 在 [Custom Console](../../custom-console/) 中执行 `Refresh / Validate`。
3. 确认 Module 列表中出现对应 `STREAM_NAME`。
4. 启动 Module Worker：

```bash
python manage.py run_agentic_module_worker
```

5. 通过告警接入或测试脚本写入 raw alert。
6. 在 [Case](../../../workspace/case/) 页面查看生成结果。

## 相关文档

- [Mock 数据](../../mock-data/)
- [告警接入](../../alert-ingestion/)
- [Module 开发](../../module-examples/)
- [Custom Console](../../custom-console/)
- [Custom Playbook 示例](../playbooks/)
