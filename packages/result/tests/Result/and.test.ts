import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { and } from "../../src/Result/and"

describe("Result.and", () => {
    it("should return second result when first is Ok", () => {
        const result = and(ok(1), ok(2))
        expect(result).toEqual({ ok: true, value: 2 })
    })

    it("should return first result when first is Err", () => {
        const result = and(err("error"), ok(2))
        expect(result).toEqual({ error: "error", ok: false })
    })

    it("should return second result even if it's Err when first is Ok", () => {
        const result = and(ok(1), err("error"))
        expect(result).toEqual({ error: "error", ok: false })
    })
})
