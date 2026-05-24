# Development Guide

## Why are basic agents needed?

There are two main purposes, one is to reduce the context occupation of the main agent, and the other is to save Token costs.

Let's take the SIEM scenario as an example, assuming that a module or playbook needs to call the SIEM interface to query logs. Usually, SIEM involves a variety of logs, each log has multiple fields, and the fields also need to provide corresponding descriptions so that the agent can understand them well.

The direct method is to encapsulate the SIEM query API into a function (Tool), and then fill all the log fields and descriptions into the function's docstring.

In order to complete the task, the main agent may call the Tool multiple times, and each time it needs to pass the docstring to the LLM, which results in occupying a large amount of the main agent's context. This prevents the main agent from effectively using the context to complete the task.

The correct way is to encapsulate the SIEM log query into a basic agent. The basic agent is responsible for understanding the log fields and descriptions, and the main agent only needs to call the basic agent's interface to complete the task.

When the main agent calls the basic agent, it only needs to pass the requirements (natural language). All tool calls, data aggregation, result aggregation, etc. are in the basic agent.