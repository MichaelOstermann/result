import { describe, expect, it } from "vitest"
import { attemptOr } from "../../src/ResultAsync/attemptOr"

describe("ResultAsync.attemptOr", () => {
    it("should return Ok when sync function succeeds", async () => {
        const result = await attemptOr(() => 42, 0)

        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Ok when async function succeeds", async () => {
        const result = await attemptOr(async () => 42, 0)

        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Err with fallback when sync function throws", async () => {
        const result = await attemptOr(() => {
            throw new Error("test")
        }, 0)

        expect(result).toEqual({ error: 0, ok: false })
    })

    it("should return Err with fallback when async function throws", async () => {
        const result = await attemptOr(async () => {
            throw new Error("test")
        }, 0)

        expect(result).toEqual({ error: 0, ok: false })
    })

    it("should return Err with fallback when promise rejects", async () => {
        const result = await attemptOr(() => Promise.reject(new Error("test")), 0)

        expect(result).toEqual({ error: 0, ok: false })
    })
})
