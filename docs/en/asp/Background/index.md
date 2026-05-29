# Background Services

`MainMonitor` (`Lib/monitor.py`) is the background service entry point of the platform. It loads Playbook configurations at startup and launches the following three types of background tasks:

| Background Task | Responsibility |
|----------------|----------------|
| [Module Engine](module-engine/) | Continuously consumes Redis Streams, processing raw alerts into Alert/Case |
| [Playbook Execution](playbook-execution/) | Polls pending Playbook records and dispatches them to the thread pool for execution |
| [Auto Analysis](auto-analysis/) | Schedules due Cases and invokes LLM to generate investigation reports |

## Key Files

| File | Purpose |
|------|---------|
| `Lib/monitor.py` | Background service entry point, orchestrates all background tasks |
| `Lib/moduleengine.py` | Module discovery, loading, and run loop |
| `Lib/basemodule.py` | Module base class, provides message consumption interface |
| `Lib/playbookloader.py` | Playbook discovery and configuration loading |
| `Lib/threadmodulemanager.py` | Generic thread task executor |
| `PLUGINS/SIRP/analysis.py` | Case analysis pipeline (LLM invocation) |
| `PLUGINS/SIRP/sirpapi.py` | Case scheduling model (mark/promote) |
