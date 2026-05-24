# Development Guide

## Tool Binding

The Agent has been bound with three Tools provided by the [SIEM Plugin](../../PLUGINS/SIEM/)

```python
tools = [SIEMToolKit.explore_schema, SIEMToolKit.execute_adaptive_query, SIEMToolKit.keyword_search]
```

By default, you only need to configure the SIEM Plugin to use the Agent.

## System Prompt

`DATA\Agent_SIEM\system_prompt.md`

You can adjust it based on the actual situation of your internal SIEM.
