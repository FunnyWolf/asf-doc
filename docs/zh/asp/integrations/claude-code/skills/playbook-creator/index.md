# Playbook Creator

Playbook Creator Skill 用于创建 ASP 后端 Playbook 脚本。

## 触发场景

- 需要新增 LLM 分析类 Playbook。
- 需要新增 SOAR 自动化处理类 Playbook。
- 需要参考现有 `backend/playbooks/` 实现生成新脚本。

## 输入

| 输入 | 说明 |
| --- | --- |
| Playbook 类型 | LLM 分析类或 SOAR 自动化类。 |
| 目标 | 需要完成的自动化任务。 |
| 输入上下文 | Case、Artifact、Enrichment 或外部系统需求。 |

## 输出

建议的 Playbook 文件、实现思路、注册与执行说明。

## 依赖

- `backend/playbooks/`
- `BasePlaybook`
- 现有 Playbook 示例
