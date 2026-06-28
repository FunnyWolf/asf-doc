# Custom Examples

Custom Examples 用于说明源码仓库中的 custom 示例如何使用。它不是新的扩展机制，而是把示例分成两类：Custom Module 和 Custom Playbook。

> 发布包中的 `custom/` 默认是空模板，不会自带这些测试示例。源码仓库中的 `backend/custom/` 可以作为本地开发参考；如果要在 Compose 部署环境中测试，可以按需复制到部署目录的 `custom/`。

## 两类示例

| 类型 | 源码路径 | 重点 |
| --- | --- | --- |
| [Custom Module 示例](modules/) | `backend/custom/modules/` | 四个 Module 示例如何把日志或 raw alert 转换为 Case / Alert / Artifact。 |
| [Custom Playbook 示例](playbooks/) | `backend/custom/playbooks/` | 两个 Playbook 如何在 Case 上写回 Summary 或补充 Enrichment。 |

Custom Module 的通用链路：

```text
日志 / raw alert
  -> 告警规则
  -> 告警接入
  -> Redis Stream
  -> Custom Module
  -> Case / Alert / Artifact
```

Custom Playbook 的通用链路：

```text
Case
  -> Run Playbook
  -> Custom Playbook
  -> Summary / Enrichment / Remark
```

## 推荐阅读顺序

1. [Custom Module 示例](modules/)：逐个理解四个 Module 示例如何从日志或 raw alert 生成 Case。
2. [Custom Playbook 示例](playbooks/)：理解 Case 生成后如何用 Playbook 写回 Summary 或补充 Enrichment。
3. [Custom Console](../custom-console/)：在运行时确认 Module 和 Playbook 是否加载成功。

## 复制到 Compose 部署环境

如果要在 Compose 发布包中测试这些示例，可以按需复制：

```text
backend/custom/modules/*.py                 -> custom/modules/
backend/custom/playbooks/*.py               -> custom/playbooks/
backend/custom/data/siem/*.yaml             -> custom/data/siem/
backend/custom/data/modules/<slug>/*.json   -> custom/data/modules/<slug>/
backend/custom/data/playbooks/<slug>/*.md   -> custom/data/playbooks/<slug>/
```

复制后：

- 在 [Custom Console](../custom-console/) 中对 Modules / Playbooks / SIEM YAML 执行 `Refresh / Validate`。
- 如果新增了 Python 依赖，先更新 `custom/requirements.txt` 并重新安装依赖。
- 要让 Module 自动消费 raw alert，需要运行 Module Worker，并确保 Redis Stream 名称和 Module 的 `STREAM_NAME` 一致。
