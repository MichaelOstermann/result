import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { or } from "../../src/ResultAsync/or"

describe("ResultAsync.or", () => {
    it("should return first result when first is Ok", async () => {
        const result = await or(Promise.resolve(ok(1)), Promise.resolve(ok(2)))
        expect(result).toEqual({ ok: true, value: 1 })
    })

    it("should return second result when first is Err", async () => {
        const result = await or(Promise.resolve(err("error")), Promise.resolve(ok(2)))
        expect(result).toEqual({ ok: true, value: 2 })
    })

    it("should return second result even if it's Err when first is also Err", async () => {
        const result = await or(Promise.resolve(err("first error")), Promise.resolve(err("second error")))
        expect(result).toEqual({ error: "second error", ok: false })
    })

    it("should handle mixed sync and async inputs", async () => {
        const result = await or(err("error"), Promise.resolve(ok(2)))
        expect(result).toEqual({ ok: true, value: 2 })
    })
})
