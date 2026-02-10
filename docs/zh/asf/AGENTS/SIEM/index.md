# 开发指南

## 工具绑定

Agent 已经绑定 [SIEM 插件](../../PLUGINS/SIEM/) 中提供的三个 Tools

```python
tools = [SIEMToolKit.explore_schema, SIEMToolKit.execute_adaptive_query, SIEMToolKit.keyword_search]
```

默认只需要配置 SIEM 插件,即可使用 Agent.

## 系统提示词

`DATA\Agent_SIEM\system_prompt.md`

可根据内部SIEM的实际情况进行调整.
