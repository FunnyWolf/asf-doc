# 插件开发指南

插件以 Python 包的形式集成外部服务，无需修改 ASP 核心代码即可扩展功能。

## 目录结构

在 `PLUGINS/<PluginName>/` 下创建以下文件:

```
PLUGINS/MyPlugin/
├── __init__.py            # 空文件,包标记
├── CONFIG.example.py      # 配置模板(提交到版本控制)
├── CONFIG.py              # 实际配置(gitignore,用户从 example 复制)
├── client.py              # 连接客户端(需要连接池时)
├── tools.py               # 业务逻辑,暴露给 LLM/MCP 调用
└── models.py              # Pydantic 数据模型
```

- `__init__.py` 始终为空，不进行 re-export
- 不是所有文件都必须，按需创建

## 配置规范

`CONFIG.example.py` 使用模块级变量，命名规则为 `<PLUGINNAME_UPPER>_<SETTING>`：

```python
MYPLUGIN_HOST = "10.10.10.10"
MYPLUGIN_PORT = 8080
MYPLUGIN_API_KEY = "your-api-key"
```

其他插件通过绝对路径导入配置：

```python
from PLUGINS.MyPlugin.CONFIG import MYPLUGIN_HOST, MYPLUGIN_API_KEY
```

## 常用模式

### 连接客户端（单例）

对外部服务的连接使用类变量单例：

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

### 业务逻辑（ToolKit）

对外暴露的能力封装为 ToolKit 类，使用 `@classmethod`：

```python
from PLUGINS.MyPlugin.client import MyPluginClient

class MyPluginToolKit:
    @classmethod
    def query(cls, input_data):
        client = MyPluginClient.get_client()
        return client.search(...)
```

### 数据模型

使用 Pydantic `BaseModel` 定义输入输出，放在 `models.py`：

```python
from pydantic import BaseModel, Field

class QueryInput(BaseModel):
    keyword: str = Field(..., description="搜索关键词")
    time_range_start: str = Field(..., description="开始时间")
```

## 注册 LLM 工具

如需让 LLM 调用插件功能，在 `PLUGINS/MCP/llmfunc.py` 中定义函数并注册：

```python
from typing import Annotated
from PLUGINS.MyPlugin.tools import MyPluginToolKit

def my_search(
    keyword: Annotated[str, "搜索关键词"],
) -> str:
    """搜索 XXX 数据"""
    return MyPluginToolKit.query(keyword)

REGISTERED_MCP_TOOLS = [
    # ... 已有工具
    my_search,
]
```

函数签名使用 `Annotated[type, "描述"]` 标注参数说明。

## 插件间依赖

通过绝对路径导入，不使用相对导入：

```python
from PLUGINS.ELK.client import ELKClient
from PLUGINS.Redis.redis_stream_api import RedisStreamAPI
```
