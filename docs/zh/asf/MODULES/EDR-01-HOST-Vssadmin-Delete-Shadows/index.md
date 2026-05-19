# 卷影副本删除检测 (EDR-01)

- 检测 Windows 主机上执行 `vssadmin delete shadows` 命令的行为,这是勒索软件加密前的典型操作.
- 基于 MITRE ATT&CK 技术 **T1490 - Inhibit System Recovery** (抑制系统恢复).

## 字段映射

从 EDR 告警中提取以下字段:

| 原始字段 | ASP 字段 |
|---------|---------|
| `@timestamp` | event_time |
| `host.name` | host_name |
| `user.name` | user_name |
| `process.command_line` | process_cmd |
| `process.hash.sha256` | process_hash |
| `process.parent.name` | parent_name |
| `risk_score` | risk_level |

## Artifact 提取

| Artifact 类型 | 角色 | 说明 |
|-------------|------|------|
| USER_NAME | ACTOR | 执行命令的用户 |
| HOSTNAME | AFFECTED | 受影响主机 |
| HASH | RELATED | 进程哈希 (SHA256/MD5) |
| COMMAND_LINE | RELATED | 完整命令行 |

## 告警聚合

- 使用 `Correlation` 按 **同一主机 + 同一用户** 在 **24 小时** 内聚合为一个 Case.
- 同一主机上同一用户的多次卷影副本删除操作会合并到同一案件中,减少分析师工作量.

## 严重程度

- 默认严重程度为 **Critical**,因为卷影副本删除是勒索软件的强指标.
- 风险评分 >= 90 映射为 Critical,>= 70 为 High,>= 40 为 Medium.

## MITRE ATT&CK

- **Tactic**: Impact
- **Technique**: T1490 - Inhibit System Recovery
- **缓解措施**: 通过 AppLocker/WDAC 限制 vssadmin.exe 使用,监控卷影副本删除行为,维护离线备份.
