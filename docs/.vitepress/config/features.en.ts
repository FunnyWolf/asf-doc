export const featuresConfig = [
    {
        kicker: 'Signal intake',
        title: 'Turn alert floods into actionable cases',
        titleAccent: 'alert floods',
        details: 'Modules stream SIEM / Webhook alerts, extract IOCs, correlate context, and create cases, alerts, and artifacts so raw logs become triageable and reviewable security events.',
        image: `/hero/en/img_1.png?v=${Date.now()}`,
        link: '/asp/workspace/case/',
        linkText: 'Explore Case workspace'
    },
    {
        kicker: 'AI investigation',
        title: 'Generate investigation drafts in seconds',
        titleAccent: 'investigation drafts',
        details: 'ASP gathers alerts, entities, logs, and enrichment results around a case, then drafts severity, confidence, impact, priority, verdicts, attack chains, and remediation guidance for analyst review.',
        image: `/hero/en/img_2.png?v=${Date.now()}`,
        link: '/asp/workspace/case/',
        linkText: 'Learn about investigations'
    },
    {
        kicker: 'Playbooks',
        title: 'Push complex investigations forward with one click',
        titleAccent: 'one click',
        details: 'Run LLM investigations, knowledge extraction, threat intelligence enrichment, and CMDB enrichment around each case, combining SOAR-style workflows, AI analysis, and human decisions.',
        image: `/hero/en/img_3.png?v=${Date.now()}`,
        link: '/asp/workspace/playbook/',
        linkText: 'Explore Playbooks'
    },
    {
        kicker: 'Agent ecosystem',
        title: 'Bring AI agents directly into SOC workflows',
        titleAccent: 'AI agents',
        details: 'Expose ASP capabilities to Claude Code, Codex, OpenCode, and other agents through MCP and plugins so agents can operate cases, search logs, query threat intelligence, and write modules or playbooks.',
        image: `/hero/en/img_6.png?v=${Date.now()}`,
        link: '/asp/integrations/claude-code/',
        linkText: 'See Claude Code integration'
    },
    {
        kicker: 'Unified data',
        title: 'Use one investigation entry point for multiple SIEMs',
        titleAccent: 'multiple SIEMs',
        details: 'Manage Splunk, ELK, and index actions through YAML configuration. Analysts, LLMs, and agents use one search interface without caring about backend query differences.',
        image: `/hero/en/img_4.png?v=${Date.now()}`,
        link: '/asp/development/siem-yaml/',
        linkText: 'Learn SIEM YAML'
    },
    {
        kicker: 'Enrichment',
        title: 'Attach threat context to every suspicious entity',
        titleAccent: 'threat context',
        details: 'Automatically enrich IOCs and artifacts with reputation, pulses, asset context, identity context, and historical evidence so every entity enters the investigation with supporting context.',
        image: `/hero/en/img_5.png?v=${Date.now()}`,
        link: '/asp/workspace/enrichment/',
        linkText: 'Explore Enrichment'
    },
    {
        kicker: 'Knowledge loop',
        title: 'Accumulate reusable knowledge from every response',
        titleAccent: 'reusable knowledge',
        details: 'Extract reusable knowledge from closed cases, investigation notes, remediation steps, and discussions to build an organizational security knowledge base that improves future responses.',
        image: `/hero/en/img_7.png?v=${Date.now()}`,
        link: '/asp/workspace/knowledge/',
        linkText: 'Explore Knowledge'
    },
    {
        kicker: 'Governance',
        title: 'Built-in collaboration, audit, and access control',
        titleAccent: 'collaboration, audit',
        details: 'Local / LDAP login, user roles, API keys, Inbox notifications, and Audit Log provide the governance layer needed for collaboration, accountability, and automation access.',
        image: `/hero/en/img_9.png?v=${Date.now()}`,
        link: '/asp/workspace/audit-log/',
        linkText: 'Explore Audit Log'
    },
    {
        kicker: 'Customization',
        title: 'Adapt quickly with Python modules and playbooks',
        titleAccent: 'Python modules',
        details: 'Use Python modules to adapt new SIEM rules and alert sources, then orchestrate LLM analysis and automated actions with playbooks so the platform grows with your security scenarios.',
        image: `/hero/en/img_10.png?v=${Date.now()}`,
        link: '/asp/development/module-examples/',
        linkText: 'View module examples'
    },
    {
        kicker: 'Deployment',
        title: 'Open source, private, Python & TypeScript',
        titleAccent: 'Open source, private',
        details: 'MIT licensed and designed for on-premise deployment, ASP keeps security data inside your network while keeping backend, frontend, extension scripts, and deployment flows clear for customization.',
        image: `/hero/en/img_8.png?v=${Date.now()}`,
        link: '/asp/quick-start/deployment/',
        linkText: 'View deployment options'
    },
]
