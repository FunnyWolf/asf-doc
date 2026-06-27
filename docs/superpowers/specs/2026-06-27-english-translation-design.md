# English Translation of ASP Documentation

**Date**: 2026-06-27
**Scope**: Translate all 57 markdown files in `docs/en/` from Chinese to English

## Problem

The `docs/en/` directory contains ASP documentation that is currently written in Chinese. The directory is intended to hold English documentation, but all 57 markdown files contain Chinese text. This creates a barrier for English-speaking users who need to understand and use the ASP platform.

## Solution

Translate all Chinese prose text in the documentation to English while preserving the existing markdown structure, technical terminology, and code examples exactly as-is.

## Design

### Translation Strategy

**Approach**: Direct in-place translation of all 57 markdown files.

**What gets translated**:
- All Chinese prose text (headings, paragraphs, list items, table cells with descriptive text)
- Frontmatter `title` and `description` fields if present

**What stays unchanged**:
- Markdown structure (headings, lists, tables, code blocks, links, images)
- Code blocks (bash commands, YAML configs, Python code, etc.)
- Technical terms and product names
- File paths, URLs, configuration keys
- Image references and links

### Technical Terminology

Keep as-is (no translation):
- **Product names**: ASP, Django, Vite, Ant Design, PostgreSQL, Redis, RustFS
- **Domain terms**: Module, Playbook, Case, Alert, Artifact, Enrichment, Knowledge, SIEM, SOAR, CMDB
- **Technical terms**: Webhook, API Key, LDAP, ELK, MCP, LLM, OCSF, IOC
- **Configuration keys**: `DJANGO_SECRET_KEY`, `ASP_BIND`, `ASP_HTTPS_PORT`, etc.
- **Commands and scripts**: `init.sh`, `createsuperuser`, `docker compose`, etc.

### Quality Assurance

- Preserve exact markdown formatting (indentation, blank lines, list markers)
- Maintain consistent terminology across all files
- Keep all internal links functional (paths don't change)
- Ensure table alignment and structure preserved
- Natural, readable English (not word-for-word translation)

### Execution Plan

Process all 57 files in order:

1. `docs/en/index.md` (root)
2. `docs/en/asp/overview/` — architecture, glossary
3. `docs/en/asp/quick-start/` — deployment, basic configuration, first login
4. `docs/en/asp/workspace/` — alert, case, dashboard, artifact, enrichment, knowledge, playbook, etc.
5. `docs/en/asp/development/` — environment setup, mock data, module examples, playbook, SIEM YAML
6. `docs/en/asp/integrations/` — Claude Code (agents, skills), ELK, webhook (ELK, Splunk)
7. `docs/en/asp/settings/` — LDAP, LLM provider, runtime, SIEM, threat intelligence, users
8. `docs/en/release/` — release notes

Each file: read → translate → write back to same path.

### Files to Translate (57 total)

```
docs/en/index.md
docs/en/asp/overview/index.md
docs/en/asp/overview/architecture/index.md
docs/en/asp/overview/glossary/index.md
docs/en/asp/quick-start/basic-configuration/index.md
docs/en/asp/quick-start/deployment/index.md
docs/en/asp/quick-start/first-login/index.md
docs/en/asp/workspace/alert/index.md
docs/en/asp/workspace/artifact/index.md
docs/en/asp/workspace/audit-log/index.md
docs/en/asp/workspace/case/index.md
docs/en/asp/workspace/dashboard/index.md
docs/en/asp/workspace/enrichment/index.md
docs/en/asp/workspace/inbox/index.md
docs/en/asp/workspace/knowledge/index.md
docs/en/asp/workspace/personal-center/index.md
docs/en/asp/workspace/playbook/index.md
docs/en/asp/development/environment-setup/index.md
docs/en/asp/development/index.md
docs/en/asp/development/mock-data/index.md
docs/en/asp/development/module-examples/index.md
docs/en/asp/development/playbook/index.md
docs/en/asp/development/siem-yaml/index.md
docs/en/asp/integrations/claude-code/agents/artifact-investigator/index.md
docs/en/asp/integrations/claude-code/agents/case-investigator/index.md
docs/en/asp/integrations/claude-code/agents/threat-hunting/index.md
docs/en/asp/integrations/claude-code/index.md
docs/en/asp/integrations/claude-code/skills/alert/index.md
docs/en/asp/integrations/claude-code/skills/artifact/index.md
docs/en/asp/integrations/claude-code/skills/case/index.md
docs/en/asp/integrations/claude-code/skills/cmdb/index.md
docs/en/asp/integrations/claude-code/skills/comment/index.md
docs/en/asp/integrations/claude-code/skills/enrichment/index.md
docs/en/asp/integrations/claude-code/skills/knowledge/index.md
docs/en/asp/integrations/claude-code/skills/module-creator/index.md
docs/en/asp/integrations/claude-code/skills/playbook-creator/index.md
docs/en/asp/integrations/claude-code/skills/playbook/index.md
docs/en/asp/integrations/claude-code/skills/siem-index-yaml/index.md
docs/en/asp/integrations/claude-code/skills/siem-rule/index.md
docs/en/asp/integrations/claude-code/skills/siem-search/index.md
docs/en/asp/integrations/claude-code/skills/threat-intelligence/index.md
docs/en/asp/integrations/elk-index-action/index.md
docs/en/asp/integrations/index.md
docs/en/asp/integrations/webhook/elk/index.md
docs/en/asp/integrations/webhook/index.md
docs/en/asp/integrations/webhook/splunk/index.md
docs/en/asp/settings/index.md
docs/en/asp/settings/ldap/index.md
docs/en/asp/settings/llm-provider/index.md
docs/en/asp/settings/runtime/index.md
docs/en/asp/settings/siem/index.md
docs/en/asp/settings/threat-intelligence/index.md
docs/en/asp/settings/users/index.md
docs/en/release/0_1_0_Let_us_rock_the_party/index.md
docs/en/release/0_1_1_Chaos_before_order/index.md
docs/en/release/0_2_0_OCSF_And_BaseModel/index.md
docs/en/release/0_3_0_MCP_And_ClaudeCodePlugin/index.md
```

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Inconsistent terminology | Use the same English term for each Chinese term throughout all files |
| Broken formatting | Preserve exact markdown structure, test links after translation |
| Unnatural English | Translate for meaning, not word-for-word; use standard technical documentation style |
| Missing context | Read surrounding content to ensure accurate translation of technical concepts |

## Success Criteria

- All 57 files contain English text instead of Chinese
- All markdown formatting is preserved
- All technical terms remain unchanged
- All internal links continue to work
- Documentation reads naturally in English
