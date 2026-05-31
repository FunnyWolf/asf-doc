# SIEM 插件

统一的 SIEM 查询接口，支持 ELK 和 Splunk 后端。

## 工作机制

SIEM 插件**基于 YAML 配置工作**，而非直接连接 SIEM 搜索所有索引。用户需要先为需要搜索的索引创建 YAML 配置文件，插件加载这些配置后才能执行查询。

```
用户编写 YAML 配置 → 插件加载配置 → 了解可用索引/后端/字段 → 执行查询
```

这意味着：

- 只有配置了 YAML 的索引才能被搜索
- 未配置的索引不会出现在搜索范围内
- 搜索前需要先配置，这是使用本插件的前提

这样设计的原因：

- **查询性能** — 不需要每次搜索前先连接后端查找可用索引和字段，YAML 配置已在本地缓存了这些信息
- **发现性能** — 用户或 LLM 需要知道有哪些日志可用时，直接读取配置即可，无需实时查询后端
- **范围控制** — SIEM 中可能有大量索引，但 SOC 场景或 LLM 当前只需要关注其中一部分，YAML 配置可以精确控制搜索范围
- **补充元数据** — SIEM 本身不支持为字段或索引添加说明信息，而哪些字段是关键字段、字段含义是什么等元数据对 LLM 查询非常有价值，YAML 配置可以承载这些信息

## 配置方法

在 `DATA/PLUGINS/SIEM/` 目录下为每个索引创建一个 YAML 配置文件，插件根据 `backend` 字段自动选择后端。

### YAML 结构

```yaml
name: siem-network-traffic        # 索引名
backend: ELK                       # ELK 或 Splunk
description: Network traffic logs  # 描述

fields:
  - name: source.ip                # 字段名
    type: ip                       # 字段类型
    description: Source IP         # 描述
    is_key_field: true             # 是否为关键字段（用于聚合统计）
    sample_values: [ "10.0.0.19" ]   # 示例值
```

- `is_key_field: true` 的字段会作为查询时的默认聚合字段
- 示例值可选填写，用于辅助理解字段含义。

### 生成 YAML

推荐使用 Claude Code Skill [SIEM Index YAML](../ClaudeCode/skills/siem-index-yaml/) 辅助生成。该 Skill 会调用 `discover_index_fields` 从后端实时发现字段，自动生成配置文件。

### 测试配置

`DATA/PLUGINS/SIEM/` 中包含三个测试样例:

| 文件                          | 索引名                    | 说明                |
|-----------------------------|------------------------|-------------------|
| `siem-network-traffic.yaml` | `siem-network-traffic` | 网络流量日志            |
| `siem-host-events.yaml`     | `siem-host-events`     | 主机事件日志            |
| `siem-aws-cloudtrail.yaml`  | `siem-aws-cloudtrail`  | AWS CloudTrail 日志 |

可与 [Mock 插件](../Mock/index.md) 的 SIEM 模拟数据配合使用。生产环境应删除这三个测试配置，以免干扰查询。

## 使用方法

`SIEMToolKit` 提供四个方法：

| 方法                       | 说明                                |
|--------------------------|-----------------------------------|
| `explore_schema`         | 列出所有已配置的索引，或查看指定索引的字段定义           |
| `execute_adaptive_query` | 精确匹配查询，根据结果量自动选择返回模式              |
| `keyword_search`         | 关键词搜索，未指定索引时在已配置的索引中自动跨索引发现       |
| `discover_index_fields`  | 从后端实时发现索引字段（用于生成 YAML 配置，不用于日常搜索） |

### 自适应返回模式

`execute_adaptive_query` 和 `keyword_search` 根据命中数量自动调整返回内容：

| 模式        | 条件           | 返回内容         |
|-----------|--------------|--------------|
| `records` | <= 100 条     | 完整记录         |
| `sample`  | 100 ~ 1000 条 | 统计信息 + 5 条采样 |
| `summary` | > 1000 条     | 仅统计信息        |
