# TI Enrichment (Mock)

## 注册名称

```
TI Enrichment (Mock)
```

## 剧本文件

```
PLAYBOOKS/TI_Enrichment_By_Mock.py
```

## 功能介绍

- 使用模拟数据为 Artifact 执行威胁情报富化,用于框架测试和功能演示.
- 不执行真实的情报查询,而是返回预定义的 Mock 数据.
- 适用于开发环境验证 Playbook 执行流程.

## 执行流程

1. 加载 Case 完整数据
2. 收集所有 Artifact 并去重
3. 根据 Artifact 类型(IP/Hash/URL)返回对应的 Mock 情报数据
4. 将 Mock 结果创建/更新为 Artifact 的 Enrichment 记录

## 支持的 Mock 类型

- **IP 地址**: 返回恶意 IP 评分和描述
- **文件哈希**: 返回恶意软件样本评分和描述
- **URL**: 返回恶意 URL 评分和描述

## 触发方式

- 在 SIRP 平台的 Case 详情页手动执行 Playbook
- 也可通过 MCP 工具 `execute_playbook` 触发

## 注意

- 此剧本仅用于测试,不提供真实威胁情报.
- 生产环境请使用 `TI Enrichment (AlienVaultOTX)`.
