import { describe, expect, it } from "vitest"
import { attempt } from "../../src/ResultAsync/attempt"

describe("ResultAsync.attempt", () => {
    it("should return Ok when sync function succeeds", async () => {
        const result = await attempt(() => 42)

        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Ok when async function succeeds", async () => {
        const result = await attempt(async () => 42)

        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should return Err when sync function throws", async () => {
        const error = new Error("test error")
        const result = await attempt(() => {
            throw error
        })

        expect(result).toEqual({ error, ok: false })
    })

    it("should return Err when async function throws", async () => {
        const error = new Error("test error")
        const result = await attempt(async () => {
            throw error
        })

        expect(result).toEqual({ error, ok: false })
    })

    it("should return Err when async function rejects", async () => {
        const error = new Error("test error")
        const result = await attempt(() => Promise.reject(error))

        expect(result).toEqual({ error, ok: false })
    })
})
