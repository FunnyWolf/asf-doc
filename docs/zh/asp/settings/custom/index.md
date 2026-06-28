# Custom

Custom 是 ASP 自定义扩展的管理入口，用于查看和校验当前运行环境加载的 Module、Playbook 和 SIEM YAML。

## 入口

Custom 位于左侧导航栏，只有管理员可以访问。

![Custom 页面](img.png)

> 图片占位符：展示 Custom 页面中的 Modules、Playbooks、SIEM YAML 三个 Tab，以及 Modules 详情抽屉中的 Stream 消息查看。

## 管理对象

| Tab | 说明 |
| --- | --- |
| Modules | 展示加载到的 Module、文件路径、对应 Redis Stream、线程数和 Stream 基础状态。 |
| Playbooks | 展示可运行 Playbook Definition、来源、标签、描述和文件路径。 |
| SIEM YAML | 展示 SIEM 索引 YAML、后端类型、字段数量、关键字段数量和字段明细。 |

Playbooks Tab 会区分 `official` 和 `custom` 来源。Module 和 SIEM YAML 没有 official 来源概念，不展示来源字段。

## Refresh / Validate

每个 Tab 都有独立的 `Refresh / Validate`：

- Modules：重新扫描 Module 脚本并显示加载错误。
- Playbooks：重新扫描内置和自定义 Playbook 脚本并显示加载错误。
- SIEM YAML：重新扫描 YAML，并刷新 SIEM registry cache。

手动执行 `Refresh / Validate` 会写入 Audit Log。打开页面自动加载当前状态时不会写入 Audit Log。

## Module Stream Inspection

Modules Tab 可以查看每个 Module 对应的 Redis Stream 状态：

- Stream 是否存在。
- Stream 长度。
- 第一条和最后一条消息 ID。
- Consumer group 摘要。
- 最近消息 JSON。
- 按 message ID 读取指定消息。

该功能只读，不会写入 Stream、消费消息、删除 Stream，也不会触发 Module 运行。

## Playbook

Playbooks Tab 只展示 Playbook Definition，不在 Custom 页面直接运行 Playbook。需要测试 Playbook 时，仍从 Case 页面使用 `Run Playbook`。

Prompt 文件不是 Custom 的管理对象。Playbook 可以把 prompt 写在代码中，也可以自行调用 `self.read_prompt("System")` 读取文件；Custom 页面不会校验 prompt 文件是否存在。

## SIEM YAML

SIEM YAML Tab 展示每个 YAML 的 index 名称、后端类型、描述、字段数量和字段表。字段表包含字段名、类型、是否关键字段、描述和示例值。

新建或修改 YAML 建议通过 Claude Code / Skill 或代码仓库工作流完成，Custom 页面只负责展示和校验。

## 依赖与重启

单纯修改 Module、Playbook 或 SIEM YAML 文件后，可以使用对应 Tab 的 `Refresh / Validate` 确认加载结果。

如果修改了 `custom\requirements.txt`、第三方 Python 包或公共 helper module，需要重新安装依赖并重启相关容器。
