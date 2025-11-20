# Alert_Suggestion_Gen_By_LLM

## 注册剧本脚本

- 在`PLAYBOOKS`目录创建剧本脚本文件
- 确保中的类名称为`Playbook`,并继承自`BasePlaybook`或`LanggraphPlaybook`
- 实现`run`函数,框架会自动执行该函数
- **推荐的方法是复制现有的脚本,根据需求进行修改**

## 调用剧本

- `api/v1/automation/playbook`接口POST请求调用剧本

## 同步执行

- 调用接口后,等待剧本执行完成并直接通过REST API 的 Response 返回结果

## 异步执行

- 调用接口后,立即返回任务ID,剧本中需要自行处理结果响应
- **SIRP 中只支持异步执行剧本**

## SIRP 剧本

### 准备

- 首先确认剧本用于何种数据类型(Alert/Case/Artifact等)
- 新建或拷贝并重命名已有剧本文件

### 获取输入参数

- 每个剧本与一类数据类型绑定,剧本执行时会传入该数据类型对应的worksheet和rowId(可以理解为数据库表和主键ID),剧本执行过程中可以通过接口获取一条完整的数据.
- 通过接口还可以获取数据记录的关联数据,例如通过 Case 的 rowId 获取该 Case 关联的 Alerts 列表.Alerts 列表中每一条 Alert 也可以通过接口获取 Artifact 列表.
- 实现代码可以参考`preprocess_node`节点代码
- **此种方式的好处是用户执行剧本时无需输入参数,剧本可以通过接口获取所需的所有数据**
- 获取worksheet/rowId/user/playbook_rowid的代码

```python
self.param("worksheet")
self.param("rowid")
self.param("user")
self.param("playbook_rowid")
```

### 更新任务结果并发送通知

- SIRP 每次执行剧本都会在 Playbook 的 worksheet中创建一条记录

![img.png](img.png)

- 每次执行完成后建议通过如下代码更新任务结果

```python
from PLUGINS.SIRP.sirpapi import Playbook as SIRPPlaybook
SIRPPlaybook.update_status_and_remark(self.param("playbook_rowid"), "Success", "Get suggestion by ai agent completed.")  # Success/Failed 
```

- 推荐在执行完成后通过 Notice.send 向执行脚本的用户发送通知

```python
from PLUGINS.SIRP.sirpapi import Notice
Notice.send(self.param("user"), "Alert_Suggestion_Gen_By_LLM output_node Finish", f"rowid：{self.param('rowid')}")
```

![img_1.png](img_1.png)


### SIRP 注册
