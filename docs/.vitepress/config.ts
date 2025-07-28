import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/result/",
    description: "Functional utilities for success | error types.",
    title: "Result",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            {
                base: "/API/",
                text: "API",
                items: [
                    { link: "types/Ok", text: "Ok" },
                    { link: "types/Err", text: "Err" },
                    { link: "types/Result", text: "Result" },
                    { link: "types/OkP", text: "OkP" },
                    { link: "types/ErrP", text: "ErrP" },
                    { link: "types/ResultP", text: "ResultP" },
                    { link: "types/OkLike", text: "OkLike" },
                    { link: "types/ErrLike", text: "ErrLike" },
                    { link: "types/ResultLike", text: "ResultLike" },
                    { link: "types/InferOk", text: "InferOk" },
                    { link: "types/InferErr", text: "InferErr" },
                    { link: "types/SimplifyResult", text: "SimplifyResult" },
                    { link: "ok", text: "ok" },
                    { link: "okP", text: "okP" },
                    { link: "err", text: "err" },
                    { link: "errP", text: "errP" },
                    { link: "isOk", text: "isOk" },
                    { link: "isErr", text: "isErr" },
                    { link: "isResult", text: "isResult" },
                    { link: "mapOk", text: "mapOk" },
                    { link: "mapErr", text: "mapErr" },
                    { link: "andThen", text: "andThen" },
                    { link: "orElse", text: "orElse" },
                    { link: "tapOk", text: "tapOk" },
                    { link: "tapErr", text: "tapErr" },
                    { link: "okOr", text: "okOr" },
                    { link: "okOrElse", text: "okOrElse" },
                    { link: "okOrThrow", text: "okOrThrow" },
                ],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/result" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
