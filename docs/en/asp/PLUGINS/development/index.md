# Plugin Development Guide

Plugins integrate external services as Python packages, extending functionality without modifying ASP core code.

## Directory Structure

Create the following files under `PLUGINS/<PluginName>/`:

```
PLUGINS/MyPlugin/
├── __init__.py            # Empty file, package marker
├── CONFIG.example.py      # Configuration template (committed to version control)
├── CONFIG.py              # Actual configuration (gitignored, users copy from example)
├── client.py              # Connection client (when connection pooling is needed)
├── tools.py               # Business logic, exposed for LLM/MCP calls
└── models.py              # Pydantic data models
```

- `__init__.py` is always empty, no re-exports
- Not all files are required; create as needed

## Configuration Convention

`CONFIG.example.py` uses module-level variables with the naming convention `<PLUGINNAME_UPPER>_<SETTING>`:

```python
MYPLUGIN_HOST = "10.10.10.10"
MYPLUGIN_PORT = 8080
MYPLUGIN_API_KEY = "your-api-key"
```

Other plugins import configuration via absolute paths:

```python
from PLUGINS.MyPlugin.CONFIG import MYPLUGIN_HOST, MYPLUGIN_API_KEY
```

## Common Patterns

### Connection Client (Singleton)

Connections to external services use a class variable singleton:

```python
import some_sdk

from PLUGINS.MyPlugin.CONFIG import MYPLUGIN_HOST, MYPLUGIN_API_KEY

class MyPluginClient:
    _instance = None

    @classmethod
    def get_client(cls):
        if cls._instance is None:
            cls._instance = some_sdk.connect(host=MYPLUGIN_HOST, api_key=MYPLUGIN_API_KEY)
        return cls._instance
```

### Business Logic (ToolKit)

Externally exposed capabilities are encapsulated as a ToolKit class using `@classmethod`:

```python
from PLUGINS.MyPlugin.client import MyPluginClient

class MyPluginToolKit:
    @classmethod
    def query(cls, input_data):
        client = MyPluginClient.get_client()
        return client.search(...)
```

### Data Models

Use Pydantic `BaseModel` to define inputs and outputs, placed in `models.py`:

```python
from pydantic import BaseModel, Field

class QueryInput(BaseModel):
    keyword: str = Field(..., description="Search keyword")
    time_range_start: str = Field(..., description="Start time")
```

## Registering LLM Tools

To let LLM call plugin functionality, define functions in `PLUGINS/MCP/llmfunc.py` and register them:

```python
from typing import Annotated
from PLUGINS.MyPlugin.tools import MyPluginToolKit

def my_search(
    keyword: Annotated[str, "Search keyword"],
) -> str:
    """Search XXX data"""
    return MyPluginToolKit.query(keyword)

REGISTERED_MCP_TOOLS = [
    # ... existing tools
    my_search,
]
```

Function signatures use `Annotated[type, "description"]` to annotate parameter descriptions.

## Inter-Plugin Dependencies

Use absolute paths for imports; do not use relative imports:

```python
from PLUGINS.ELK.client import ELKClient
from PLUGINS.Redis.redis_stream_api import RedisStreamAPI
```
