import { describe, expect, it } from "vitest"
import { attempt } from "../../src/Result/attempt"

describe("Result.attempt", () => {
    it("should return Ok when function succeeds", () => {
        const result = attempt(() => 42)
        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Err when function throws", () => {
        const error = new Error("test error")
        const result = attempt(() => {
            throw error
        })
        expect(result).toEqual({ error, ok: false })
    })
})
