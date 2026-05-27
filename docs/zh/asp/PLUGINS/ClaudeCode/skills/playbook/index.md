# Playbook

操作 SOAR Playbook:查看可执行的定义、对 Case 执行剧本、查看执行历史.

## 触发场景

- 查看有哪些 Playbook 可以执行
- 对某个 Case 运行自动化剧本
- 查看某个 Case 的 Playbook 执行记录

## 使用样例

<!-- 截图 + 说明 -->

## 输入

| 参数 | 说明 |
|------|------|
| playbook 定义名称 | `list_playbook_definitions` 返回的名称 |
| case_id | 执行目标 Case ID |
| user_input | 可选的额外自然语言指令 |
| 过滤条件 | playbook_id, job_status(Pending/Running/Success/Failed), case_id |

## 输出

- 定义列表: 可执行的 Playbook 名称
- 执行记录: Run ID、Case ID、Job Status、定义名称、更新时间

## 依赖

调用 MCP 工具: `list_playbook_definitions`, `execute_playbook`, `list_playbook_runs`.
