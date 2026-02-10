# SIEM 插件

当前支持 `ELK` 和 `Splunk`,插件提供易于 LLM 使用的 API (Tools)

## 配置方法

- 将 CONFIG.example.py 重命名为 CONFIG.py,并根据代码注释填写配置项
- 如只使用了 `ELK` 和 `Splunk` 中的一种,请无删除或注释掉另一种的配置项,直接使用默认值即可
- DATA/Indexes 目录中包含 `siem-aws-cloudtrail.yaml` `siem-host-events.yaml` `siem-network-traffic.yaml` 三个 index 日志配置样例, 与 Mock 插件生成的测试数据配合使用
- 新的 SIEM 日志配置可参考上述三个 yaml 文件编写,并放置在 DATA/Indexes 目录下
- 生产环境中需要将三个测试 yaml 删除,以免影响 LLM 查询结果

## 使用方法

- 插件提供三个函数 `SIEMToolKit.explore_schema` `SIEMToolKit.execute_adaptive_query` `SIEMToolKit.keyword_search`
- debug.py 包含测试相关代码
- Agent 调用可参考 [Agent SIEM](../../AGENTS/SIEM/)