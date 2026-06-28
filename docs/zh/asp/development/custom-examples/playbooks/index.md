# Custom Playbook 示例

本页介绍源码仓库中的两个 custom Playbook 示例：Case Summary 和 CMDB Enrichment。它们展示了 Playbook 如何在 Case 生成后继续推进调查、富化或字段写回。

> Playbook 是 Case 触发的自动化任务。要测试 Playbook，需要在 Case 详情页点击 `Run Playbook`，并确保 Playbook Worker 正在运行。

## 示例文件

| 示例 | 源码路径 | 作用 |
| --- | --- | --- |
| Case Summary | `backend/custom/playbooks/case_summary.py` | 调用 LLM 生成分析师可读摘要，并写回 Case Summary 字段。 |
| Case Summary Prompt | `backend/custom/data/playbooks/case_summary/System_zh.md` / `System_en.md` | 提供 Case Summary Playbook 使用的系统提示词。 |
| CMDB Enrichment | `backend/custom/playbooks/cmdb_enrichment.py` | 查询 Case 关联 Artifact 的 CMDB 上下文，并写入 Enrichment。 |

## Case Summary

`case_summary.py` 的目标是把 Case 当前上下文整理成简洁摘要。

执行流程：

1. 读取当前 Case。
2. 使用 `serialize_case_for_investigation()` 序列化 Case 调查上下文。
3. 根据 Runtime Prompt Language 读取 `System_zh.md` 或 `System_en.md`。
4. 调用 LLM 生成 2 到 4 句摘要。
5. 将结果写回 Case 的 `summary` 字段。

Prompt 路径：

```text
custom/data/playbooks/case_summary/System_zh.md
custom/data/playbooks/case_summary/System_en.md
```

适用场景：

- Case 已经有 Alert / Artifact / Enrichment / Audit Log 等上下文。
- 分析师希望快速生成一个可以继续编辑的摘要。
- 想演示 custom Playbook 如何读取外部 prompt 文件。

## CMDB Enrichment

`cmdb_enrichment.py` 的目标是为 Case 关联 Artifact 查询资产或身份上下文。

执行流程：

1. 遍历 Case 关联 Alert 下的 Artifact。
2. 去重后调用 CMDB 查询接口。
3. 将支持的查询结果写入 Artifact Enrichment。
4. 返回执行统计，例如 alert 数、artifact 数、成功富化数量和错误数量。

适用场景：

- Case 中已经有主机、IP、账号、域名等 Artifact。
- 分析师需要了解这些实体对应的资产、业务系统、负责人或重要性。
- 想演示 custom Playbook 如何把外部查询结果写入 Enrichment。

## 运行和验证

1. 将 Playbook 文件放在 `custom/playbooks/`。
2. 如果使用 prompt 文件，将 prompt 放在 `custom/data/playbooks/<playbook_slug>/`。
3. 在 [Custom Console](../../custom-console/) → `Playbooks` 中执行 `Refresh / Validate`。
4. 在 Case 详情页点击 `Run Playbook`。
5. 启动 Playbook Worker：

```bash
python manage.py run_agentic_playbook_worker
```

6. 查看结果：
   - Case Summary：查看 Case 基础信息中的 Summary 字段。
   - CMDB Enrichment：查看 Case 关联 Artifact 的 Enrichment。
   - Playbook 记录：查看 Playbook 的状态和 Remark。

## 复制到 Compose 部署环境

源码路径到部署路径的对应关系：

```text
backend/custom/playbooks/*.py                    -> custom/playbooks/
backend/custom/data/playbooks/<slug>/*.md        -> custom/data/playbooks/<slug>/
```

如果 Playbook 引入新的第三方依赖，还需要更新 `custom/requirements.txt` 并重新安装依赖。

## 相关文档

- [Custom Examples 总览](../)
- [Playbook 开发](../../playbook/)
- [Custom Console](../../custom-console/)
- [Custom Module 示例](../modules/)
