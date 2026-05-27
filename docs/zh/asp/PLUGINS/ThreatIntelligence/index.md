# 威胁情报插件

## 功能介绍

- 多 Provider 威胁情报查询工具插件,提供统一查询接口.
- 支持注册多个情报源,一次查询返回聚合结果.
- 自动根据各 Provider 结果计算聚合风险等级 (high/medium/low).

## 架构

TI 插件采用 Provider 注册模式:

```
TIToolKit.query(indicator, provider=None)
  └── PROVIDERS["AlienVaultOTX"]  →  AlienVaultOTX.query()
  └── PROVIDERS["NewProvider"]    →  NewProvider.query()    # 可扩展
```

- `PROVIDERS` 字典注册所有可用的情报源
- 默认注册了 **AlienVaultOTX** 作为 Provider
- 可通过添加新的 Provider 函数扩展

## 扩展新 Provider

1. 创建 `PLUGINS/NewProvider/` 目录,实现客户端代码和 `CONFIG.example.py`
2. 实现 `query(indicator: str) -> dict` 函数
3. 在 `PLUGINS/TI/tools.py` 的 `PROVIDERS` 字典中注册:

```python
from PLUGINS.NewProvider.client import NewProvider

PROVIDERS: Dict[str, Callable[[str], dict]] = {
    "AlienVaultOTX": AlienVaultOTX.query,
    "NewProvider": NewProvider.query,
}
```

## 使用方式

```python
from PLUGINS.TI.tools import TIToolKit

# 查询所有 Provider
result = TIToolKit.query("8.8.8.8")

# 指定 Provider 查询
result = TIToolKit.query("8.8.8.8", provider="AlienVaultOTX")
```

## 配合使用

- [AlienVaultOTX 插件](../AlienVaultOTX/) — 默认注册的威胁情报源
- [TI Enrichment 剧本](../../PLAYBOOKS/Threat_Intelligence_Enrichment/) — 使用 TI 插件执行情报富化
