# 开发指南

## 工具绑定

```python
from PLUGINS.Mock.SIEM_Splunk import splunk_search_tool
```

修改为实际的Splunk SPL接口.

## 系统提示词

`DATA\Agent_SIEM\system_prompt.md`

可根据内部SIEM的实际情况进行调整.

`DATA\Agent_SIEM\splunk_datamodels.yml`

将Splunk数据模型信息填写到上述yml文件中.

## 注意事项

- 实际测试过程中,LLM 对复杂 SPL 的理解能力有限,后续 ASP 会提供更加通用的方案,无需 LLM 理解 SPL 语句.