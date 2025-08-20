import { describe, expect, it } from "vitest"
import { attemptOrElse } from "../../src/ResultAsync/attemptOrElse"

describe("ResultAsync.attemptOrElse", () => {
    it("should return Ok when sync function succeeds", async () => {
        const result = await attemptOrElse(() => 42, () => 0)

        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Ok when async function succeeds", async () => {
        const result = await attemptOrElse(async () => 42, () => 0)

        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Err with fallback function result when sync function throws", async () => {
        const error = new Error("test error")
        const result = await attemptOrElse(() => {
            throw error
        }, e => `caught: ${e}`)

        expect(result).toEqual({ error: "caught: Error: test error", ok: false })
    })

    it("should return Err with fallback function result when async function throws", async () => {
        const error = new Error("test error")
        const result = await attemptOrElse(async () => {
            throw error
        }, e => `caught: ${e}`)

        expect(result).toEqual({ error: "caught: Error: test error", ok: false })
    })

    it("should handle async fallback function", async () => {
        const error = new Error("test error")
        const result = await attemptOrElse(() => {
            throw error
        }, async e => `async caught: ${e}`)

        expect(result).toEqual({ error: "async caught: Error: test error", ok: false })
    })
})
