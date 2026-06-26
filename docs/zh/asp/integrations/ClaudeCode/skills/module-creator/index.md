# Module Creator

为 SIEM Rule 创建告警处理模块，将原始告警转换为 Case/Alert/Artifact。

## 触发场景

- 新建一个 SIEM Rule 的处理模块
- 编写告警处理脚本
- 将 SIEM 告警接入 ASP 的 SIRP 管道

## 使用样例

![img.png](img.png)

## 输入

| 参数           | 说明                                               |
|--------------|--------------------------------------------------|
| Rule 名称      | SIEM Rule 全名，同时也是模块文件名和 Redis Stream 名称          |
| raw_alert 样本 | 从 Redis Stream/文件/Redis Insight 获取的原始告警 JSON |

## 输出

- `MODULES/<rule-name>.py`: 处理模块代码
- `TEST/test_module_<slug>.py`: 测试脚本

## 依赖

底层依赖：`BaseModule`、`PLUGINS.SIRP.sirpapi`（Alert、Case）、`PLUGINS.SIRP.sirpcoremodel`（数据模型）、`PLUGINS.SIRP.correlation`（关联聚合）。

> 文件名必须与 SIEM Rule 名称完全一致（区分大小写）。先获取 raw_alert 样本再写代码，不要猜测字段结构。
