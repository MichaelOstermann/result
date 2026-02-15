import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { all } from "../../src/ResultAsync/all"

describe("ResultAsync.all", () => {
    it("should return Ok with all values when all results are Ok", async () => {
        const result = await all([
            ok(1),
            Promise.resolve(ok(2)),
            ok(3),
        ])
        expect(result).toEqual({ ok: true, value: [1, 2, 3] })
    })

    it("should return first Err when any result is Err", async () => {
        const result = await all([
            ok(1),
            Promise.resolve(err("test error")),
            ok(3),
        ])
        expect(result).toEqual({ error: "test error", ok: false })
    })

    it("should return Ok with empty array for empty input", async () => {
        const result = await all([])
        expect(result).toEqual({ ok: true, value: [] })
    })

    it("should handle mixed sync and async results", async () => {
        const result = await all([
            Promise.resolve(ok("hello")),
            ok(42),
            Promise.resolve(ok(true)),
        ])
        expect(result).toEqual({ ok: true, value: ["hello", 42, true] })
    })
})
