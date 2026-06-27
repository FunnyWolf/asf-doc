---
layout: page
---

<script setup>
import { heroConfig } from '../.vitepress/config/hero.zh'
import { featuresConfig } from '../.vitepress/config/features.zh'
</script>

<Hero :config="heroConfig" />
<Features
  eyebrow="Workflow"
  title="安全运营闭环"
  title-accent="安全运营"
  subtitle="ASP 把分散在 SIEM、SOAR、情报平台和知识库里的动作串成一条可追踪的工作流。"
  :steps="[
    { title: '告警接入', details: 'SIEM / Webhook' },
    { title: 'Case 分诊', details: '关联、归并、定级' },
    { title: 'AI 调查', details: '报告与判定初稿' },
    { title: 'Playbook 自动化', details: '富化与处置动作' },
    { title: '知识沉淀', details: '复用组织经验' },
  ]"
  :features="featuresConfig"
/>
