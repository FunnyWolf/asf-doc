# Playbook Execution

The `subscribe_pending_playbook` background task is responsible for discovering and executing pending Playbooks.

## Discovery Mechanism

`PlaybookLoader` (`Lib/playbookloader.py`) scans the `PLAYBOOKS/` directory at startup, dynamically imports each `.py` file, reads the `NAME` and `DESC` properties of the `Playbook` class, and caches them in `Xcache`.

## Execution Flow

```
API/MCP creates Playbook record (job_status=PENDING)
  └── subscribe_pending_playbook polls and discovers
        ├── Looks up Playbook configuration in Xcache
        ├── importlib dynamically loads the Playbook class
        ├── Sets job_status=RUNNING, generates job_id
        └── thread_module_manager.start_task() dispatches thread
              └── playbook.execute() → playbook.run()
                    └── On completion, callback on_playbook_task_finished()
```

## Status Fallback

The `on_playbook_task_finished` callback ensures that every Playbook reaches a terminal state:

- If the business code has already set a terminal state via `update_playbook_status()`, the callback skips
- If the business code has not set one, the callback automatically writes SUCCESS or FAILED

## Key APIs

The Playbook base class (`Lib/baseplaybook.py`) provides:

| API | Description |
|-----|-------------|
| `self.param_source_row_id` | The Case row_id that triggered the Playbook |
| `self.param_user_input` | Additional user input |
| `self.update_playbook_status(status, remark)` | Update task status |
| `self.send_notice(title, body)` | Send a notification to the user |
