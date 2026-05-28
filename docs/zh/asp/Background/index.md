# 后台服务

`MainMonitor` (`Lib/monitor.py`) 是平台的后台服务入口,启动时加载 Playbook 配置并启动以下三类后台任务:

| 后台任务 | 职责 |
|---------|------|
| [模块运行框架](module-engine/) | 持续消费 Redis Stream,将原始告警处理为 Alert/Case |
| [Playbook 执行](playbook-execution/) | 轮询待执行的 Playbook 记录,分派到线程池运行 |
| [自动化分析](auto-analysis/) | 调度到期 Case 并调用 LLM 生成调查报告 |

## 关键文件

| 文件 | 作用 |
|------|------|
| `Lib/monitor.py` | 后台服务入口,编排所有后台任务 |
| `Lib/moduleengine.py` | 模块发现、加载和运行循环 |
| `Lib/basemodule.py` | 模块基类,提供消息消费接口 |
| `Lib/playbookloader.py` | Playbook 发现和配置加载 |
| `Lib/threadmodulemanager.py` | 通用线程任务执行器 |
| `PLUGINS/SIRP/analysis.py` | Case 分析流水线 (LLM 调用) |
| `PLUGINS/SIRP/sirpapi.py` | Case 调度模型 (mark/promote) |
