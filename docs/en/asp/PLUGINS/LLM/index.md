# LLM Plugin

## Configuration

1. Rename `PLUGINS/LLM/CONFIG.example.py` to `CONFIG.py`
2. Add one or more LLM configurations in the `LLM_CONFIGS` list

Each configuration item contains the following fields:

| Field       | Description                                          |
|-------------|------------------------------------------------------|
| `api_key`   | API key; use `"ollama"` for local models             |
| `base_url`  | OpenAI-compatible API endpoint                       |
| `model`     | Model name                                           |
| `proxy`     | Proxy address; use `None` if not needed              |
| `tags`      | Tag list for selecting configurations by scenario    |

## Selecting Models by Tag

```python
from PLUGINS.LLM.CONFIG import get_model

# Use the first configuration with the "fast" tag
client = get_model(tag="fast")

# Use the first configuration with both "powerful" and "function_calling" tags
client = get_model(tag=["powerful", "function_calling"])

# When no tag is provided, the first configuration in the list is used by default
client = get_model()
```

## Built-in Tags

Tags used in ASP (freely customizable):

- `cheap` — Low-cost model
- `fast` — Fast response model
- `powerful` — High-performance model
- `function_calling` — Supports function calling
- `structured_output` — Supports structured output

## Proxy Format

The `proxy` field supports the following formats:

```python
"proxy": "http://192.168.1.100:3128"                          # HTTP
"proxy": "http://user:pass@192.168.1.100:3128"                # HTTP with authentication
"proxy": "socks5://192.168.1.100:1080"                        # SOCKS5
"proxy": "socks5://user:pass@192.168.1.100:1080"              # SOCKS5 with authentication
```

## Configuration Example

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
