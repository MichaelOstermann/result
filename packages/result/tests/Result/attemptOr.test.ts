import { describe, expect, it } from "vitest"
import { attemptOr } from "../../src/Result/attemptOr"

describe("Result.attemptOr", () => {
    it("should return Ok when function succeeds", () => {
        const result = attemptOr(() => 42, 0)
        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Err with fallback when function throws", () => {
        const result = attemptOr(() => {
            throw new Error("test")
        }, 0)
        expect(result).toEqual({ error: 0, ok: false })
    })
})
