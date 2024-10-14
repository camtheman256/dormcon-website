import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
    title: "DormCon",
    tagline: "Welcome to MIT's Dormitory Council!",
    url: "https://dormcon.mit.edu",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "mit-dormcon",
    projectName: "website",
    trailingSlash: false,
    markdown: {
        mdx1Compat: {
            comments: false,
            admonitions: false,
            headingIds: false,
        },
    },
    themeConfig: {
        navbar: {
            title: "MIT DormCon",
            hideOnScroll: true,
            logo: {
                alt: "Site Logo",
                src: "img/dormcon-logo.png",
                width: 32,
                height: 32,
            },
            items: [
                {
                    type: "custom-dropdown",
                    dropdownProps: {
                        type: "dropdown",
                        label: "About",
                        items: [
                            {
                                type: "doc",
                                label: "About DormCon",
                                docId: "about/index",
                            },
                            {
                                type: "doc",
                                label: "Event Funding",
                                docId: "about/funding",
                            },
                            {
                                type: "doc",
                                label: "Meetings",
                                docId: "about/meetings",
                            },
                            {
                                type: "doc",
                                label: "Officers",
                                docId: "about/officers",
                            },
                            {
                                type: "doc",
                                label: "Voting Members",
                                docId: "about/voting-members",
                            },
                            // {
                            //     type: "doc",
                            //     label: "Elections",
                            //     docId: "about/elections",
                            // },
                            {
                                type: "doc",
                                label: "Archive",
                                docId: "about/archive",
                            },
                        ],
                        to: "about",
                        position: "left",
                    },
                    linkProps: {
                        to: "about",
                        label: "About",
                        position: "left",
                    },
                    specialPage: "about",
                },
                {
                    to: "piazza",
                    label: "Piazza",
                    position: "left",
                },
                {
                    to: "rex",
                    label: "REX",
                    position: "left",
                },
                {
                    href: "http://web.mit.edu/dormcon/index.old.shtml",
                    label: "Old Site",
                    position: "right",
                },
            ],
        },
        footer: {
            links: [
                {
                    title: "Community",
                    items: [
                        {
                            label: "MIT Housing",
                            href: "https://studentlife.mit.edu/housing",
                        },
                        {
                            label: "MIT Guide to Residences",
                            href: "https://mitguidetoresidences.mit.edu/",
                        },
                    ],
                },
                {
                    title: "Friends",
                    items: [
                        {
                            label: "UA",
                            href: "https://ua.mit.edu/",
                        },
                        {
                            label: "IFC",
                            href: "https://www.mitifc.com/",
                        },
                        {
                            label: "Panhel",
                            href: "https://www.panhel.mit.edu/",
                        },
                        {
                            label: "LGC",
                            href: "http://lgc.mit.edu/",
                        },
                        {
                            label: "GSC",
                            href: "https://gsc.mit.edu/",
                        },
                    ],
                },
                {
                    title: "Social",
                    items: [
                        {
                            label: "Twitter",
                            href: "https://twitter.com/MITDormCon",
                        },
                        {
                            label: "Instagram",
                            href: "https://www.instagram.com/mit_dormcon/",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear().toString()} MIT DormCon. Built with Docusaurus.`,
        },
        colorMode: {
            respectPrefersColorScheme: true,
        },
    } satisfies Preset.ThemeConfig,
    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarCollapsible: true,
                    sidebarPath: "./sidebars.ts",
                    docItemComponent: "@theme/ApiItem",
                    routeBasePath: "/",
                },
                blog: false,
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
                gtag: {
                    trackingID: "G-XBL1BVV0JB",
                },
            } satisfies Preset.Options,
        ],
    ],
    plugins: [
        [
            "docusaurus-plugin-openapi-docs",
            {
                id: "api", // plugin id
                docsPluginId: "classic", // configured for preset-classic
                config: {
                    rex: {
                        specPath: "http://rex.mit.edu/openapi.yaml",
                        outputDir: "docs/rex/api",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "auto",
                        },
                        showSchemas: true,
                    } satisfies OpenApiPlugin.Options,
                },
            } satisfies Plugin.PluginOptions,
        ],
    ],
    themes: [
        "docusaurus-theme-openapi-docs",
        [
            require.resolve("@getcanary/docusaurus-theme-search-pagefind"),
            {
                // https://getcanary.dev/docs/common/customization/styling#css-variables
                styles: {
                    "--canary-color-primary-c": 0.1,
                    "--canary-color-primary-h": 231,
                    "--canary-font-family-base": "var(--ifm-font-family-base)",
                    "--canary-font-family-mono":
                        "var(--ifm-font-family-monospace)",
                },
                // https://pagefind.app/docs/ranking
                pagefind: {
                    ranking: {
                        pageLength: 0.9,
                        termFrequency: 1.0,
                        termSimilarity: 1.0,
                        termSaturation: 1.5,
                    },
                },
                indexOnly: false,
                includeRoutes: ["**/*"],
                excludeRoutes: ["**/rex/api/*"],
                // https://getcanary.dev/docs/local/demo
                // https://getcanary.dev/docs/common/guides/filtering
                // e.g. [{"name":"All","pattern":"**/*"}]
                tabs: [],
            },
        ],
    ],
};

export default config;
