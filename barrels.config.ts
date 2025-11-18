import { defineConfig } from "@monstermann/barrels"
import { flat } from "@monstermann/barrels-flat"
import { namespace } from "@monstermann/barrels-namespace"

export default defineConfig([
    namespace({
        entries: [
            "./packages/result/src/Result",
            "./packages/result/src/ResultAsync",
        ],
    }),
    flat({
        entries: "./packages/result/src",
        include: ["*", "Result/index.js", "ResultAsync/index.js"],
    }),
])
