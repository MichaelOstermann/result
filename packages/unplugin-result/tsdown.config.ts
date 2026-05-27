import { defineConfig } from "tsdown"

export default defineConfig({
    clean: true,
    deps: { neverBundle: ["vite"] },
    dts: true,
    entry: ["src/*.ts"],
    format: ["esm", "cjs"],
})
