# Knowledge

Knowledge 用于沉淀可复用的安全经验。

## 来源

当前支持两类来源：

| 来源 | 说明 |
| --- | --- |
| Manual | 手动创建的知识。 |
| Case | 从 Case 提取的知识。 |

Case 来源的 Knowledge 必须关联一个 Case；Manual 来源的 Knowledge 不关联 Case。

## 关键字段

- Knowledge ID：系统生成的可读 ID。
- Title：标题。
- Body：正文。
- Source：来源。
- Tags：标签。
- Expires At：过期时间，空表示长期有效。

## 使用建议

- 将重复出现的处置经验写入 Knowledge。
- 关闭关键 Case 后，通过 Playbook 提取知识。
- 在后续调查中参考相似经验。
