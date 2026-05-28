# Playbook 执行

`subscribe_pending_playbook` 后台任务负责发现和执行待运行的 Playbook.

## 发现机制

`PlaybookLoader` (`Lib/playbookloader.py`) 启动时扫描 `PLAYBOOKS/` 目录,动态导入每个 `.py` 文件,读取 `Playbook` 类的 `NAME` 和 `DESC` 属性,缓存到 `Xcache`.

## 执行流程

```
API/MCP 创建 Playbook 记录 (job_status=PENDING)
  └── subscribe_pending_playbook 轮询发现
        ├── 查找 Xcache 中的 Playbook 配置
        ├── importlib 动态加载 Playbook 类
        ├── 设置 job_status=RUNNING, 生成 job_id
        └── thread_module_manager.start_task() 分派线程
              └── playbook.execute() → playbook.run()
                    └── 完成后回调 on_playbook_task_finished()
```

## 状态兜底

`on_playbook_task_finished` 回调确保 Playbook 一定有终态:

- 如果业务代码已通过 `update_playbook_status()` 设置了终态,回调跳过
- 如果业务代码未设置,回调自动写入 SUCCESS 或 FAILED

## 关键 API

Playbook 基类 (`Lib/baseplaybook.py`) 提供:

| API | 说明 |
|-----|------|
| `self.param_source_row_id` | 触发 Playbook 的 Case row_id |
| `self.param_user_input` | 用户附加输入 |
| `self.update_playbook_status(status, remark)` | 更新任务状态 |
| `self.send_notice(title, body)` | 向用户发送通知 |
