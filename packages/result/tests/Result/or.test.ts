import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { or } from "../../src/Result/or"

describe("Result.or", () => {
    it("should return first result when first is Ok", () => {
        const result = or(ok(1), ok(2))
        expect(result).toEqual({ ok: true, value: 1 })
    })

    it("should return second result when first is Err", () => {
        const result = or(err("error"), ok(2))
        expect(result).toEqual({ ok: true, value: 2 })
    })

    it("should return second result even if it's Err when first is also Err", () => {
        const result = or(err("first error"), err("second error"))
        expect(result).toEqual({ error: "second error", ok: false })
    })
})
