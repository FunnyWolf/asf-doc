import {type DefaultTheme, defineConfig} from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    description: 'Agentic SOC Platform',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/asp/': {base: '/asp/', items: sidebarASP('/asp/')},
            '/en/asp/': {base: '/en/asp/', items: sidebarASP('/en/asp/')},
        },

        footer: {
            // message: '<a href="./policies/terms_of_service">Terms</a> · <a href="./policies/privacy_policy">Privacy</a>',
            copyright: `Copyright © 2024-${new Date().getFullYear()} Funnywolf`
        },

        docFooter: {
            prev: 'Previous page',
            next: 'Next page'
        },

        outline: {
            label: 'On this page'
        },

        lastUpdated: {
            text: 'Last updated on',
            formatOptions: {
                // @ts-ignore
                dateStyle: 'short',
                // timeStyle: 'short'
            }
        },

        langMenuLabel: 'Languages',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Theme',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
        skipToContentLabel: 'Skip to content'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Documentation',
            link: '/asp/overview/',
            activeMatch: '/asp/'
        },
        {
            text: "Changelog",
            items: [
                {
                    text: '0.4.0 - I always have a choice',
                    link: '/release/0_4_0_I_always_have_a_choice/'
                },
                {
                    text: '0.3.0 - MCP and Claude Code Plugin',
                    link: '/release/0_3_0_MCP_And_ClaudeCodePlugin/'
                },
                {
                    text: '0.2.0 - OCSF and BaseModel',
                    link: '/release/0_2_0_OCSF_And_BaseModel/'
                },
                {
                    text: '0.1.1 - Chaos before order',
                    link: '/release/0_1_1_Chaos_before_order/'
                },
                {
                    text: '0.1.0 - Let`s Rock The Party!',
                    link: '/release/0_1_0_Let_us_rock_the_party/'
                },
            ]
        }
    ]
}

function sidebarASP(rootBase = '/asp/'): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Overview',
            collapsed: false,
            base: `${rootBase}overview/`,
            items: [
                {text: 'What is ASP', link: 'index/'},
                {text: 'Architecture', link: 'architecture/'},
                {text: 'Glossary', link: 'glossary/'},
            ]
        },
        {
            text: 'Quick Start',
            collapsed: false,
            base: `${rootBase}quick-start/`,
            items: [
                {text: 'Deployment', link: 'deployment/'},
                {text: 'First Login', link: 'first-login/'},
                {text: 'Basic Configuration', link: 'basic-configuration/'},
                {text: 'Restart & Operations', link: 'operations/'},
                {text: 'Backup & Restore', link: 'backup-restore/'},
                {text: 'Upgrade', link: 'upgrade/'},
            ]
        },
        {
            text: 'Workspace',
            collapsed: false,
            base: `${rootBase}workspace/`,
            items: [
                {text: 'Dashboard', link: 'dashboard/'},
                {text: 'Case', link: 'case/'},
                {text: 'Alert', link: 'alert/'},
                {text: 'Artifact', link: 'artifact/'},
                {text: 'Enrichment', link: 'enrichment/'},
                {text: 'Knowledge', link: 'knowledge/'},
                {text: 'Playbook', link: 'playbook/'},
                {text: 'Inbox', link: 'inbox/'},
                {text: 'Audit Log', link: 'audit-log/'},
                {text: 'Personal Center', link: 'personal-center/'},
            ]
        },
        {
            text: 'Settings',
            collapsed: false,
            base: `${rootBase}settings/`,
            items: [
                {text: 'Overview', link: 'index/'},
                {text: 'User Management', link: 'users/'},
                {text: 'LLM Provider', link: 'llm-provider/'},
                {text: 'SIEM', link: 'siem/'},
                {text: 'Threat Intelligence', link: 'threat-intelligence/'},
                {text: 'LDAP', link: 'ldap/'},
                {text: 'Runtime', link: 'runtime/'},
                {text: 'Tags', link: 'tags/'},
            ]
        },
        {
            text: 'Integrations',
            collapsed: false,
            base: `${rootBase}integrations/`,
            items: [
                {text: 'Overview', link: 'index/'},
                {text: 'MCP', link: 'mcp/'},
                {
                    text: 'ClaudeCode Plugin',
                    collapsed: false,
                    base: `${rootBase}integrations/claude-code/`,
                    items: [
                        {text: 'Usage Guide', link: 'index/'},
                        {
                            text: 'Agents',
                            collapsed: true,
                            base: `${rootBase}integrations/claude-code/agents/`,
                            items: [
                                {text: 'Case Investigator', link: 'case-investigator/'},
                                {text: 'Artifact Investigator', link: 'artifact-investigator/'},
                                {text: 'Threat Hunting', link: 'threat-hunting/'},
                            ]
                        },
                        {
                            text: 'Skills',
                            collapsed: true,
                            base: `${rootBase}integrations/claude-code/skills/`,
                            items: [
                                {text: 'Alert', link: 'alert/'},
                                {text: 'Artifact', link: 'artifact/'},
                                {text: 'Case', link: 'case/'},
                                {text: 'Enrichment', link: 'enrichment/'},
                                {text: 'Knowledge', link: 'knowledge/'},
                                {text: 'Comment', link: 'comment/'},
                                {text: 'CMDB', link: 'cmdb/'},
                                {text: 'Module Creator', link: 'module-creator/'},
                                {text: 'Playbook', link: 'playbook/'},
                                {text: 'Playbook Creator', link: 'playbook-creator/'},
                                {text: 'SIEM Index YAML', link: 'siem-index-yaml/'},
                                {text: 'SIEM Search', link: 'siem-search/'},
                                {text: 'SIEM Rule', link: 'siem-rule/'},
                                {text: 'Threat Intelligence', link: 'threat-intelligence/'},
                            ]
                        },
                    ]
                },
            ]
        },
        {
            text: 'Development',
            collapsed: false,
            base: `${rootBase}development/`,
            items: [
                {text: 'Overview', link: 'index/'},
                {text: 'Environment Setup', link: 'environment-setup/'},
                {text: 'Mock Data', link: 'mock-data/'},
                {
                    text: 'Alert Ingestion',
                    collapsed: false,
                    base: `${rootBase}development/alert-ingestion/`,
                    items: [
                        {text: 'Overview', link: 'index/'},
                        {text: 'Splunk Webhook', link: 'splunk-webhook/'},
                        {text: 'Kibana Webhook', link: 'kibana-webhook/'},
                        {text: 'ELK Index Action', link: 'elk-index-action/'},
                    ]
                },
                {text: 'SIEM YAML', link: 'siem-yaml/'},
                {text: 'Module Development', link: 'module-examples/'},
                {text: 'Playbook Development', link: 'playbook/'},
                {text: 'Custom Console', link: 'custom-console/'},
                {
                    text: 'Custom Examples',
                    collapsed: false,
                    base: `${rootBase}development/custom-examples/`,
                    items: [
                        {text: 'Overview', link: 'index/'},
                        {text: 'Custom Modules', link: 'modules/'},
                        {text: 'Custom Playbooks', link: 'playbooks/'},
                    ]
                },
            ]
        }
    ]
}


export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    en: {
        placeholder: 'Search documentation',
        translations: {
            button: {
                buttonText: 'Search documentation',
                buttonAriaLabel: 'Search documentation'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: 'Clear search query',
                    resetButtonAriaLabel: 'Clear search query',
                    cancelButtonText: 'Cancel',
                    cancelButtonAriaLabel: 'Cancel'
                },
                startScreen: {
                    recentSearchesTitle: 'Recent searches',
                    noRecentSearchesText: 'No recent searches',
                    saveRecentSearchButtonTitle: 'Save to recent searches',
                    removeRecentSearchButtonTitle: 'Remove from recent searches',
                    favoriteSearchesTitle: 'Favorites',
                    removeFavoriteSearchButtonTitle: 'Remove from favorites'
                },
                errorScreen: {
                    titleText: 'Unable to fetch results',
                    helpText: 'You might need to check your network connection'
                },
                footer: {
                    selectText: 'Select',
                    navigateText: 'Navigate',
                    closeText: 'Close',
                    searchByText: 'Search by'
                },
                noResultsScreen: {
                    noResultsText: 'No results found',
                    suggestedQueryText: 'You can try searching for',
                    reportMissingResultsText: 'Think this query should have results?',
                    reportMissingResultsLinkText: 'Click to feedback'
                }
            }
        }
    }
}
