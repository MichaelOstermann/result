import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    title: "Result",
    description: "Functional utilities for success | error types.",
    base: "/result/",
    themeConfig: {
        outline: "deep",
        search: {
            provider: "local",
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/result" },
        ],
        docFooter: {
            prev: false,
            next: false,
        },
    },
    markdown: {
        theme: {
            light: "github-light-default",
            dark: "catppuccin-macchiato",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
