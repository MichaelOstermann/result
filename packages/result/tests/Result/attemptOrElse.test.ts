import { describe, expect, it } from "vitest"
import { attemptOrElse } from "../../src/Result/attemptOrElse"

describe("Result.attemptOrElse", () => {
    it("should return Ok when function succeeds", () => {
        const result = attemptOrElse(() => 42, () => 0)
        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Err with fallback function result when function throws", () => {
        const error = new Error("error")
        const result = attemptOrElse(() => {
            throw error
        }, e => `caught: ${e}`)
        expect(result).toEqual({ error: "caught: Error: error", ok: false })
    })
})
