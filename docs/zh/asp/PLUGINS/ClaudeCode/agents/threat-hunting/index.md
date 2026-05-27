# Threat Hunting

假设驱动的威胁猎杀编排 Agent,最多 3 轮迭代调查后输出结构化报告.

## 触发场景

- "这个主机有没有被入侵?"
- "检查横向移动迹象"
- "对这个 Case 做威胁猎杀"

## 使用样例

<!-- 截图 + 说明 -->

## 输入

| 参数 | 说明 |
|------|------|
| Case ID / 猎杀目标 | Case ID 或描述要验证的假设 |

## 工作方式

每轮循环: OBSERVE(现状) → PLAN(1-3 个问题) → ACT(调用工具) → ASSESS(是否够了),最多 3 轮.

## 输出

Threat Hunting Report:

- `Verdict`: Compromised / Suspicious / Benign
- `Confidence`: High / Medium / Low
- `Investigation Process`: 调查过程和推理
- `Key Findings & Evidence`: 发现和证据
- `IOCs`: 提取的 IOC 列表
- `Recommendations`: 建议行动

## 依赖

底层调用: `asp-siem-search-en/zh`, `asp-case-en/zh`, `asp-artifact-en/zh`, `asp-enrichment-en/zh`
