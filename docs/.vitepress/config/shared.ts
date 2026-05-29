import {defineConfig, TransformContext} from 'vitepress'

// @ts-ignore
import {groupIconMdPlugin, groupIconVitePlugin, localIconLoader} from 'vitepress-plugin-group-icons'
import lightbox from "vitepress-plugin-lightbox"
import {handleHeadMeta} from "../theme/handleHeadMeta";
import minipic from 'vite-plugin-minipic'

// @ts-ignore
export const shared = defineConfig({
    title: 'Agentic SOC Platform',

    rewrites: {
        'en/:rest*': ':rest*'
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    markdown: {
        math: true,
        codeTransformers: [
            // We use `[!!code` in demo to prevent transformation, here we revert it back.
            {
                postprocess(code) {
                    return code.replace(/\[\!\!code/g, '[!code')
                }
            }
        ],
        config(md) {
            // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
            const fence = md.renderer.rules.fence!
            md.renderer.rules.fence = function (tokens, idx, options, env, self) {
                const {localeIndex = 'root'} = env
                const codeCopyButtonTitle = (() => {
                    switch (localeIndex) {
                        case 'zh':
                            return '复制代码'
                        default:
                            return 'Copy code'
                    }
                })()
                return fence(tokens, idx, options, env, self).replace(
                    '<button title="Copy Code" class="copy"></button>',
                    `<button title="${codeCopyButtonTitle}" class="copy"></button>`
                )
            }
            md.use(groupIconMdPlugin)
            md.use(lightbox, {});
        }
    },

    sitemap: {
        hostname: 'https://asp.viperrtp.com',
        transformItems(items) {
            // @ts-ignore
            return items.filter((item) => !item.url.includes('migration'))
        }
    },

    /* prettier-ignore */
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/asp.svg'}],
        ['link', {rel: 'icon', type: 'image/png', href: '/asp.svg'}],
        ['meta', {name: 'theme-color', content: '#5f67ee'}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:locale', content: 'en'}],
        ['meta', {property: 'og:title', content: 'Agentic SOC Platform | Open Source, Flexible, Powerful, Private Deployment'}],
        ['meta', {property: 'og:site_name', content: 'ASP'}],
        ['meta', {property: 'og:image', content: 'https://asp.viperrtp.com/viper-og.png'}],
        ['meta', {property: 'og:url', content: 'https://asp.viperrtp.com/'}],
        ['meta', {name: 'twitter:site', content: '@viperrtp'}],
        ['meta', {name: 'twitter:creator', content: '@viperrtp'}],
        ['meta', {name: 'twitter:card', content: 'summary'}],
        ['meta', {name: 'twitter:title', content: 'Agentic SOC Platform | Open Source, Flexible, Powerful, Private Deployment'}],
        ['meta', {name: 'twitter:description', content: 'AI Agent SOC Automation Framework.Open Source, Flexible, Powerful, Private Deployment.'}],
        ['meta', {name: 'twitter:image:src', content: 'https://asp.viperrtp.com/viper-og.png'}],
    ],

    async transformHead(context: TransformContext) {
        return handleHeadMeta(context)
    },
    appearance: 'force-dark',
    themeConfig: {
        logo: {src: '/asp.svg', width: 24, height: 24},

        socialLinks: [
            {icon: 'github', link: 'https://github.com/FunnyWolf/agentic-soc-platform'},
        ],

        search: {
            provider: 'local',
        },
    },
    vite: {
        plugins: [
            groupIconVitePlugin({
                customIcon: {
                    vitepress: localIconLoader(
                        // @ts-ignore
                        import.meta.url,
                        '../../public/asp.svg'
                    ),
                    // firebase: 'logos:firebase'
                }
            }),
            minipic({
                sharpOptions: {
                    avif: {
                        quality: 80
                    },
                    png: {
                        quality: 80
                    },
                    jpeg: {
                        quality: 80
                    },
                    jpg: {
                        quality: 80
                    },
                    webp: {
                        quality: 80
                    },
                    gif: {}
                },
                cache: true // Enable caching for better performance
            })
        ]
    }
})
