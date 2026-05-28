# 自动化分析

Case 自动化分析由两个后台任务协作完成:调度器将到期 Case 送入队列,Worker 消费队列并调用 LLM 生成调查报告.

## 触发入口

模块或 Playbook 在 Case 创建/更新后调用:

```python
Case.mark_analysis_requested(row_id=case_row_id, cooldown_minutes=3)
```

该方法不直接入队,而是写入 `analysis_next_run_at` 调度时间.

## 调度模型

调度由 Case 上的 4 个字段驱动,无显式状态机:

| 字段 | 含义 |
|------|------|
| `analysis_next_run_at` | 最早可入队时间 |
| `analysis_queue_message_id` | 非空表示已有队列消息代表该 Case |
| `analysis_last_started_at` | 最近一次分析开始时间 |
| `analysis_last_completed_at` | 最近一次分析完成时间 |

## 调度流程

```
Module/Playbook
  └── Case.mark_analysis_requested(cooldown_minutes=3)
        ├── 计算: max(now + cooldown, last_completed + cooldown)
        └── 写入 analysis_next_run_at (首次请求优先,不被后续请求推迟)

subscribe_case_analysis_scheduler (定期轮询)
  └── Case.promote_due_analysis_cases()
        ├── 查询: analysis_next_run_at <= now 且 queue_message_id 为空
        └── 发送到 CASE_ANALYSIS_QUEUE Redis Stream

subscribe_case_analysis_queue (×3 Worker 线程)
  └── run_case_analysis(case_row_id, trigger, queue_message_id)
        ├── 校验消息有效性 (过期消息丢弃)
        ├── mark_analysis_started() 清除调度状态
        ├── LLM 生成 InvestigationReport
        └── mark_analysis_completed() 记录完成时间
```

## 调度保证

- **Cooldown 防抖**: 至少间隔 `cooldown_minutes` 才会执行一次分析
- **首次请求优先**: 已有 pending 调度时,后续请求不会推迟执行时间
- **过期消息丢弃**: queue_message_id 不匹配时跳过执行
- **失败不重试**: 分析失败仅释放队列占用,不自动重新调度
