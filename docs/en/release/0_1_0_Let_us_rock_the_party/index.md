# 0.1.0 - Let's Rock the Party!

![img.png](img.png)

Welcome to the first official version of the Agentic SOC Platform (ASP)! After two months of intensive development, we are excited to release v0.1.0. This version lays a solid
foundation for ASP, combining powerful AI Agent capabilities with flexible automation orchestration, aiming to create a truly AI-driven, open-source security operations platform.

## ✨ New Feature Highlights

### Core Framework

- **🚀 Alert Pipeline:** The new alert forwarding and stream processing framework is ready. You can now easily integrate SIEM webhooks and modularly build AI alert analysis and
  response pipelines.
- **🤖 Playbook Orchestration Engine:** The initial playbook engine is online, supporting complex orchestration and execution of AI Agents, opening up infinite possibilities for
  automated response.
- **🎯 Built-in Threat Hunting Agent:** We have built a powerful `Threat Hunting Agent` into the playbooks, capable of adapting to and handling all types of threat hunting
  scenarios.

### SIRP Platform

- **🛠️ Fully-featured SIRP:** The basic functions of the built-in SIRP (Security Incident Response Platform) are complete, providing a modern case management and response
  interface.
- **🔗 Deep Automation Integration:** Implemented a Playbook-based UI interface, seamlessly integrating the powerful automation orchestration (SOA) capabilities of ASP with the SIRP
  user interface.

## 💬 Developer Notes: Origin and Vision

Initially, I just wanted to develop a pure backend framework for modularly processing alerts from SIEMs, leaving the user interaction to professional SIRP platforms like TheHive or
Splunk SOAR.

However, while exploring AI empowerment for the SOC, I realized that "automation" is an indispensable part, and AI Agents greatly enhance automation capabilities. True automation
requires deep interaction with the UI, so we ultimately decided to build in a fully-featured SIRP platform to provide a seamless experience.

Today, almost all security vendors, both domestic and international, are embracing AI Agents, but their products mostly serve their own commercial ecosystems. General SOAR
platforms often just add some LLM functional nodes.

ASP's vision is different: we aim to create an **open-source, modularly customizable, AI-driven security operations platform**. We believe that every organization should be able to
flexibly build its own intelligent security operations system according to its own needs.

0.1.0 is just the beginning. We look forward to growing with the community and exploring more possibilities in AI security.