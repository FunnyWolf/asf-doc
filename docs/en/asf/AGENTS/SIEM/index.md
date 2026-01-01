# Development Guide

## Tool Binding

```python
from PLUGINS.Mock.SIEM_Splunk import splunk_search_tool
```

Change to the actual Splunk SPL interface.

## System Prompt

`DATA\Agent_SIEM\system_prompt.md`

Can be adjusted according to the actual situation of the internal SIEM.

`DATA\Agent_SIEM\splunk_datamodels.yml`

Fill the Splunk data model information into the yml file above.

## Notes

- In the actual testing process, LLM has limited understanding of complex SPL. Subsequent ASP will provide a more general solution without requiring LLM to understand SPL statements.
