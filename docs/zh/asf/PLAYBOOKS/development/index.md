# 开发文档

剧本 (Playbook) 用于执行 **用户触发** 的自动化任务.

例如调用TI查询并更新Artifact的enrichment,或者分析Alert生成Suggestion等.

## 注册剧本脚本

- 在`PLAYBOOKS`目录创建剧本脚本文件
- 确保中的类名称为`Playbook`,并继承自`BasePlaybook`或`LanggraphPlaybook`
- 实现`run`函数,框架会自动执行该函数
- **推荐的方法是复制现有的脚本,根据需求进行修改**

## 调用剧本

- `api/v1/automation/playbook`接口POST请求调用剧本
- POST Data 中 `playbook` 为剧本的文件名称,例如 `Alert_Suggestion_Gen_By_LLM`
- 其他参数根据剧本需求传入,例如 `worksheet` 和 `rowid`
- 剧本代码中可以使用 `self.param("参数名称")` 获取传入的参数值

## 同步执行

- 调用接口后,等待剧本执行完成并直接通过REST API 的 Response 返回结果
- 可参考 [TI_Artifact_query_by_AlienVaultOTX](../TI_Artifact_query_by_AlienVaultOTX)

## 异步执行

- 调用接口后,立即返回任务ID,剧本中需要自行处理结果响应
- 可参考 [Alert_Suggestion_Gen_By_LLM](../Alert_Suggestion_Gen_By_LLM)
- **SIRP 中只支持异步执行剧本**

## SIRP 剧本

- 开发 SIRP 剧本的方法参考 [Alert_Suggestion_Gen_By_LLM](../Alert_Suggestion_Gen_By_LLM)