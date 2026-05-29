# Auto Analysis

Case auto analysis is accomplished through the collaboration of two background tasks: the scheduler sends due Cases to the queue, and the Worker consumes the queue and invokes the LLM to generate investigation reports.

## Trigger Entry

Called by a Module or Playbook after a Case is created/updated:

```python
Case.mark_analysis_requested(row_id=case_row_id, cooldown_minutes=3)
```

This method does not enqueue directly, but writes to the `analysis_next_run_at` scheduling time.

## Scheduling Model

Scheduling is driven by 4 fields on the Case, with no explicit state machine:

| Field | Meaning |
|-------|---------|
| `analysis_next_run_at` | Earliest time the Case can be enqueued |
| `analysis_queue_message_id` | Non-empty indicates a queue message already represents this Case |
| `analysis_last_started_at` | Time the most recent analysis started |
| `analysis_last_completed_at` | Time the most recent analysis completed |

## Scheduling Flow

```
Module/Playbook
  └── Case.mark_analysis_requested(cooldown_minutes=3)
        ├── Calculate: max(now + cooldown, last_completed + cooldown)
        └── Write analysis_next_run_at (first request takes priority, not delayed by subsequent requests)

subscribe_case_analysis_scheduler (periodic polling)
  └── Case.promote_due_analysis_cases()
        ├── Query: analysis_next_run_at <= now AND queue_message_id is empty
        └── Send to CASE_ANALYSIS_QUEUE Redis Stream

subscribe_case_analysis_queue (x3 Worker threads)
  └── run_case_analysis(case_row_id, trigger, queue_message_id)
        ├── Validate message validity (expired messages are discarded)
        ├── mark_analysis_started() clears scheduling state
        ├── LLM generates InvestigationReport
        └── mark_analysis_completed() records completion time
```

## Scheduling Guarantees

- **Cooldown Debounce**: At least `cooldown_minutes` interval between analyses
- **First Request Priority**: When a pending schedule exists, subsequent requests will not delay the execution time
- **Expired Message Discard**: Skips execution when queue_message_id does not match
- **No Retry on Failure**: Analysis failure only releases the queue occupation, without automatic rescheduling
