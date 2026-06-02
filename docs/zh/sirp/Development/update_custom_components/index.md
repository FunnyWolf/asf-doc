# 更新自定义组件

SIRP 使用自定义 React 组件来扩展界面展示能力。组件代码位于 `agentic-soc-platform/Docker/SIRP/components/` 目录下。

## 组件类型

| 类型   | 说明           | Props                               |
|------|--------------|-------------------------------------|
| 存储类型 | 可存储用户输入的值    | `value`, `onChange`, `env`          |
| 引用类型 | 仅展示已有数据，不可存储 | `formData`, `env`, `currentControl` |

## 现有组件

| 组件文件                               | 说明             | 类型 |
|------------------------------------|----------------|----|
| `investigation_report_ai.jsx`      | AI 调查报告展示（亮色）  | 引用 |
| `investigation_report_ai_dark.jsx` | AI 调查报告展示（暗色）  | 引用 |
| `json.jsx`                         | JSON 数据查看器（亮色） | 引用 |
| `json_dark.jsx`                    | JSON 数据查看器（暗色） | 引用 |

暗色模式组件以 `_dark.jsx` 后缀命名，用于系统深色主题。

## 开发规范

**架构要求**

- 仅支持单函数组件（Function Component），不允许使用 `import` 语句
- React 内置属性（`useState`, `useEffect` 等）已全局暴露，可直接使用

**样式规范**

- 仅使用 Tailwind CSS
- 内置图标使用 `<LucideIcon name="IconName" size="16" />`，name 采用大驼峰
- 最外层容器不能包含边距（`p-*`, `m-*`）和边框（`border`, `shadow`）

**错误处理**

- 数据解析失败时直接 `throw new Error("...")`，不渲染异常 UI
- 代码中禁止添加 `console.log` 或注释

## 更新流程

![img_2.png](img_2.png)
![img_3.png](img_3.png)

> 选择编辑组件

![img.png](img.png)

> 拷贝 jsx 代码并保存