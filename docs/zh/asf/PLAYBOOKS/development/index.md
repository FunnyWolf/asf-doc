# 开发指南

剧本 (Playbook) 用于执行 **用户触发** 的自动化任务.

例如:

- 调用 TI 查询并更新 Artifact 的 enrichment,
- 分析 Alert 生成 Suggestion
- 针对 Case 进行威胁狩猎.

Alert_Analysis_Agent 是 SIRP 剧本的模板样例,以此剧本介绍如何开发 SIRP 剧本.

## 注册剧本

- 首先确认剧本用于何种数据类型(Alert/Case/Artifact等)
- 在`PLAYBOOKS`目录创建剧本脚本文件
- 确保中的类名称为`Playbook`,并继承自`BasePlaybook`或`LanggraphPlaybook`
- 实现`run`函数,框架会自动执行该函数
- **推荐的方法是复制现有的脚本,根据需求进行修改**

## 获取输入参数

- 每个剧本与一类数据类型绑定,剧本执行时会传入该数据类型对应的 worksheet 和 rowid (可以理解为数据库表和主键 ID),剧本执行过程中可以通过接口获取一条完整的数据.
- 通过接口还可以获取数据记录的关联数据,例如通过 Case 的 rowid 获取该 Case 关联的 Alerts 列表.Alerts 列表中每一条 Alert 也可以通过接口获取 Artifact 列表.
- 实现代码可以参考`preprocess_node`节点代码
- **此种方式的好处是用户执行剧本时无需输入参数,剧本可以通过接口获取所需的所有数据**
- 获取输入参数代码

```python
@property
def param_rowid(self):
    return self.param("rowid")

@property
def param_source_rowid(self):
    return self.param("source_rowid")

@property
def param_source_worksheet(self):
    return self.param("source_worksheet")

@property
def param_user(self):
    return self.param("user")

@property
def param_user_input(self):
    return self.param("user_input")
```

## 更新任务结果并发送通知

- SIRP 每次执行剧本都会在 Playbook 的 worksheet中创建一条记录

![img.png](img.png)

- 每次执行完成后建议通过如下代码更新任务结果

```python
self.update_playbook("Success", "Get suggestion by ai agent completed.") # Success/Failed 
```

- 推荐在执行完成后通过 send_notice 向执行脚本的用户发送通知

```python
self.send_notice("Alert_Suggestion_Gen_By_LLM output_node Finish", f"rowid:{self.param_source_rowid}")
```

![img_1.png](img_1.png)

## SIRP 注册

- 应用于 SIRP 的剧本需要一个分类标签(CASE/ALERT/ARTIFACT)和人类可读的名字,便于使用人员在 SIRP 界面中选择剧本执行.

- 剧本中使用 TYPE 和 NAME 两个类变量进行注册.

```python

class Playbook(LanggraphPlaybook):
    TYPE = "ALERT"  # 分类标签
    NAME = "Suggestion Generation by LLM"  # 剧本名称
```

- 剧本编写完成后,需要在 SIRP 中将剧本名称添加到对应的选项集中.`playbook_artifact` `playbook_alert` `playbook_case` 分别对应Artifact/Alert/Case类型剧本.

![img_2.png](img_2.png)

![img_3.png](img_3.png)

- 添加完成后,在 SIRP 打开对应的记录,点击 `Playbook` 按钮即可选择新添加的剧本执行.

- 选择一条 Alert 记录
  ![img_4.png](img_4.png)

- 选择剧本并执行

![img_5.png](img_5.png)

- 剧本任务执行状态可以在 `Playbook` 中查看

![img_6.png](img_6.png)

## 剧本调试

- 每个剧本文件是一个单独的 `Playbook` 类,可以直接执行进行开发调试
- 例如 `Alert_Suggestion_Gen_By_LLM` 剧本应用于 `Alert` 记录

```python
if __name__ == "__main__":
    params_debug = {'source_rowid': '13782e0a-2423-4fc3-9b16-7f2eb15ae83f', 'source_worksheet': 'alert'}
    module = Playbook()
    module._params = params_debug
    module.run()
```

- 其中 `source_rowid` 可以通过如下图方法获取

![img_7.png](img_7.png)