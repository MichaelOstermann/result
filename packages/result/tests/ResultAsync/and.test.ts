import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { and } from "../../src/ResultAsync/and"

describe("ResultAsync.and", () => {
    it("should return second result when first is Ok (sync)", async () => {
        const result = await and(ok(1), ok(2))
        expect(result).toEqual({ ok: true, value: 2 })
    })

    it("should return second result when first is Ok (async)", async () => {
        const result = await and(
            Promise.resolve(ok(1)),
            Promise.resolve(ok(2)),
        )
        expect(result).toEqual({ ok: true, value: 2 })
    })

    it("should return first result when first is Err", async () => {
        const result = await and(err("test error"), ok(2))
        expect(result).toEqual({ error: "test error", ok: false })
    })

    it("should return second result even if it's Err when first is Ok", async () => {
        const result = await and(
            Promise.resolve(ok(1)),
            Promise.resolve(err("test error")),
        )
        expect(result).toEqual({ error: "test error", ok: false })
    })
})
