# LLM 插件

## 配置方法

1. 将 `PLUGINS/LLM/CONFIG.example.py` 重命名为 `CONFIG.py`
2. 在 `LLM_CONFIGS` 列表中添加一个或多个 LLM 配置

每个配置项包含以下字段：

| 字段         | 说明                       |
|------------|--------------------------|
| `api_key`  | API 密钥，本地模型可填 `"ollama"` |
| `base_url` | OpenAI 兼容的 API 地址        |
| `model`    | 模型名称                     |
| `proxy`    | 代理地址，不需要则填 `None`        |
| `tags`     | 标签列表，用于按场景选择配置           |

## 通过 Tag 选择模型

```python
from PLUGINS.LLM.CONFIG import get_model

# 使用第一个包含 "fast" 标签的配置
client = get_model(tag="fast")

# 使用同时包含 "powerful" 和 "function_calling" 标签的配置
client = get_model(tag=["powerful", "function_calling"])

# 不提供 tag 时默认使用列表中第一个配置
client = get_model()
```

## 内置标签

ASP 中使用的标签（可自由定制）：

- `cheap` — 低成本模型
- `fast` — 快速响应模型
- `powerful` — 高性能模型
- `function_calling` — 支持函数调用
- `structured_output` — 支持结构化输出

## 代理格式

`proxy` 字段支持以下格式：

```python
"proxy": "http://192.168.1.100:3128"                          # HTTP
"proxy": "http://user:pass@192.168.1.100:3128"                # HTTP 带认证
"proxy": "socks5://192.168.1.100:1080"                        # SOCKS5
"proxy": "socks5://user:pass@192.168.1.100:1080"              # SOCKS5 带认证
```

## 配置示例

```python
LLM_CONFIGS = [
    {
        "api_key": "ollama",
        "base_url": "http://localhost:11434/v1",
        "model": "qwen3.5:9b",
        "proxy": None,
        "tags": ["fast", "cheap", "function_calling", "structured_output"]
    },
    {
        "api_key": "sk-xxx",
        "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "model": "qwen3-max",
        "proxy": None,
        "tags": ["powerful", "function_calling", "structured_output"]
    },
]
```
