# 开发指南

剧本 (Playbook) 用于执行 **用户触发** 的自动化任务.

例如:

- 调用 LLM 分析 Case 给出报告.
- 分析 已关闭的 Case 的分析过程和结果,生成 Knowledge
- 为 Case 挂载的所有 Alert 中所有 Artifact 添加威胁情报的 Enrichment

[Investigation](../Investigation/index.md) 作为样例介绍剧本中关键的 API.

## 注册剧本

- 剧本只作用于 Case,或者说只有 Case 可以运行剧本
- 在`PLAYBOOKS`目录创建剧本脚本文件
- 确保中的类名称为`Playbook`,并继承自`BasePlaybook`或`LanggraphPlaybook`
- 确保包含 NAME = "XXX", 用于在 SIRP 中注册剧本
- 实现`run`函数,框架会自动执行该函数
- **推荐的方法是复制现有的脚本,根据需求进行修改**

## 获取输入参数

- self.param_source_row_id 包含触发剧本的 Case 的 row_id, 可根据 row_id 调用 Case 相关接口.
- 例如通过 Case 的 row_id 获取该 Case 关联的 Alerts 列表.Alerts 列表中每一条 Alert 也可以通过接口获取 Artifact 列表.
- 剧本执行完成后可调用 API 更新 Case / Alert / Artifact.

## 更新任务结果


- 每次执行完成后建议通过如下代码更新任务结果

```python
self.update_playbook("Success", "Case Investigation Success.") # Success/Failed
```

- 推荐在执行完成后通过 send_notice 向执行脚本的用户发送通知,通知内容可自定义 (可选)

```python
self.send_notice("Investigation Finish", f"rowid:{self.param_source_rowid}")
```

## SIRP 注册

- 应用于 SIRP 的剧本需要一个人类可读的名字,便于使用人员在 SIRP 界面中选择剧本执行.

- 在 SIRP 中将剧本名称 (类的 NAME = "XXX" 参数) 添加到 `PLAYBOOK` 选项集中.

![img_5.png](img_5.png)

![img_6.png](img_6.png)

- 添加完成后,在 SIRP 打开 Case,点击 `Playbook` 按钮即可选择新添加的剧本执行.

## 剧本调试

- 每个剧本文件是一个单独的 `Playbook` 类,可以直接执行进行开发调试
- 例如 `Investigation` 剧本应用于 `Case` 记录

```python
if __name__ == "__main__":
    import os, django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ASP.settings")
    django.setup()
    model = PlaybookModel(source_row_id='your_case_row_id_here')
    module = Playbook()
    module._playbook_model = model
    module.run()
```

- 其中 `source_rowid` 可以通过如下图方法获取

![img_7.png](img_7.png)