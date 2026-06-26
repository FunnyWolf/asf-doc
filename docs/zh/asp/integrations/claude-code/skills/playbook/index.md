# Playbook

Playbook Skill 用于查看可运行的 Playbook Definition、执行 Playbook，以及回溯 Playbook Run。

## 触发场景

- 查看当前有哪些 Playbook 可以运行。
- 从某个 Case 执行 Investigation、Knowledge Extraction、Threat Intelligence Enrichment 或 CMDB Enrichment。
- 查看某次 Playbook Run 的状态和执行结果。

## 使用样例

![Playbook Skill](img.png)

## 输入

| 输入 | 说明 |
| --- | --- |
| `case_id` | 触发来源 Case。 |
| `name` | Playbook 名称。 |
| `user_input` | 可选的自然语言补充要求。 |
| `playbook_id` | Playbook Run ID。 |

## 输出

可运行 Playbook 列表、创建的 Playbook Run 或执行详情。

## 依赖

MCP 工具：`list_playbook_definitions`、`execute_playbook`、`list_playbooks`。
