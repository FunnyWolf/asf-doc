---
layout: page
---

<script setup>
import { heroConfig } from '../.vitepress/config/hero.en'
import { featuresConfig } from '../.vitepress/config/features.en'
</script>

<Hero :config="heroConfig" />
<Features
  eyebrow="Workflow"
  title="Security operations loop"
  title-accent="Security operations"
  subtitle="ASP connects the work usually split across SIEM, SOAR, threat intelligence, and knowledge systems into one traceable workflow."
  :steps="[
    { title: 'Alert intake', details: 'SIEM / Webhook' },
    { title: 'Case triage', details: 'Correlate and prioritize' },
    { title: 'AI investigation', details: 'Draft reports and verdicts' },
    { title: 'Playbook automation', details: 'Enrich and act' },
    { title: 'Reusable knowledge', details: 'Capture what worked' },
  ]"
  :features="featuresConfig"
/>
