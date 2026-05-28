# 模块运行框架

`ModuleEngine` (`Lib/moduleengine.py`) 负责自动发现、加载和持续运行告警处理模块.

## 发现机制

启动时扫描 `MODULES/` 目录下所有 `.py` 文件 (排除 `_` 开头),文件名即模块名,同时作为 Redis Stream 名称.

## 运行模型

1. 对每个模块,读取 `THREAD_NUM` (默认 1) 决定并发线程数
2. 每个线程创建独立的 Module 实例,以守护线程方式运行
3. 线程循环调用 `instance.run()`,异常捕获后继续,间隔 100ms

```
ModuleEngine.start()
  └── _load_initial_modules()
        └── MODULES/*.py → importlib 动态加载 → Module 类
              └── range(THREAD_NUM):
                    instance = Module()
                    Thread(target=run_loop, daemon=True).start()
```

## 消息消费

`BaseModule.read_stream_message()` 提供两种模式:

| 模式 | 条件 | Redis 命令 | 行为 |
|------|------|-----------|------|
| 正常模式 | `debug_message_id` 为空 | XREADGROUP (block 5s, count=1, noack=True) | 阻塞等待新消息 |
| 调试模式 | `debug_message_id` 有值 | XRANGE (精确 ID) | 非阻塞,读取指定消息 |

- Consumer Group: `AI_SOC_FRAMEWORK_GROUP`,自动创建
- Consumer Name: 线程名 (如 `Cloud-01-..._thread_0`),同模块多线程各自独立
- `noack=True`: 消息即发即忘,不重试

## 并发配置

模块可在类中设置 `THREAD_NUM` 控制并发:

```python
class Module(BaseModule):
    THREAD_NUM = 3  # 启动 3 个消费线程
```
