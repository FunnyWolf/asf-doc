# Mock 插件

## 配置方法

- 该插件无需额外配置,安装后即可使用.
- 在将 ASP 部署在生产环境前,建议通过该插件测试 Agent 的架构和数据流.

## 功能介绍

### CMDB

模拟企业CMDB API接口

### SIEM

通过LLM接口模拟SIEM数据查询接口,入参为自然语言的查询请求,返回模拟的SIEM日志数据. 使用方法参考`if __name__ == "__main__":`代码

### Threat Intelligence

模拟威胁情报查询接口

### SIRP

生成各种类型设备的 Alert 数据,使用内置聚合规则,生成 Case