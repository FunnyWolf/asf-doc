# TI Enrichment (AlienVaultOTX)

## 注册名称

```
TI Enrichment (AlienVaultOTX)
```

## 剧本文件

```
PLAYBOOKS/TI_Enrichment_By_AlienVaultOTX.py
```

## 功能介绍

- 通过 AlienVaultOTX 插件为 Case 关联的所有 Artifact 执行威胁情报富化.
- 遍历 Case 下所有 Alert 中的 Artifact,去重后逐一查询 AlienVault OTX.
- 查询结果以 Enrichment 形式写入对应 Artifact,包含声誉评分、脉冲信息、攻击技术、恶意软件家族等.

## 执行流程

1. 加载 Case 完整数据 (含 Alert 和 Artifact 关联)
2. 收集所有 Artifact 并去重 (按 row_id)
3. 逐一通过 `TIToolKit.query()` 查询 AlienVault OTX
4. 将查询结果创建/更新为 Artifact 的 Enrichment 记录
5. 输出统计信息:告警数、Artifact 数、富化成功/失败数

## 支持的 Artifact 类型

- IP 地址
- URL
- 文件哈希 (MD5/SHA1/SHA256)

## 触发方式

- 在 SIRP 平台的 Case 详情页手动执行 Playbook
- 也可通过 MCP 工具 `execute_playbook` 触发

## 前置条件

- 需要配置 AlienVaultOTX 插件 (参见 [AlienVaultOTX 插件文档](../AlienVaultOTX/))
