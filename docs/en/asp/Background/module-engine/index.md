# Module Engine

`ModuleEngine` (`Lib/moduleengine.py`) is responsible for automatically discovering, loading, and continuously running alert processing modules.

## Discovery Mechanism

At startup, it scans all `.py` files under the `MODULES/` directory (excluding those starting with `_`). The filename serves as the module name and also as the Redis Stream name.

## Run Model

1. For each module, read `THREAD_NUM` (default 1) to determine the number of concurrent threads
2. Each thread creates an independent Module instance and runs as a daemon thread
3. Threads loop calling `instance.run()`, continue after exception capture, with a 100ms interval

```
ModuleEngine.start()
  └── _load_initial_modules()
        └── MODULES/*.py → importlib dynamic loading → Module class
              └── range(THREAD_NUM):
                    instance = Module()
                    Thread(target=run_loop, daemon=True).start()
```

## Message Consumption

`BaseModule.read_stream_message()` provides two modes:

| Mode | Condition | Redis Command | Behavior |
|------|-----------|--------------|----------|
| Normal Mode | `debug_message_id` is empty | XREADGROUP (block 5s, count=1, noack=True) | Blocks waiting for new messages |
| Debug Mode | `debug_message_id` has a value | XRANGE (exact ID) | Non-blocking, reads the specified message |

- Consumer Group: `AI_SOC_FRAMEWORK_GROUP`, auto-created
- Consumer Name: Thread name (e.g. `Cloud-01-..._thread_0`), independent per thread within the same module
- `noack=True`: Fire-and-forget messages, no retries

## Concurrency Configuration

Modules can set `THREAD_NUM` in the class to control concurrency:

```python
class Module(BaseModule):
    THREAD_NUM = 3  # Start 3 consumer threads
```
