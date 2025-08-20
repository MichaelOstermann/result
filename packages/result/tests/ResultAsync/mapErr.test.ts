import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { mapErr } from "../../src/ResultAsync/mapErr"

describe("ResultAsync.mapErr", () => {
    it("should apply function when result is Err", async () => {
        const result = await mapErr(Promise.resolve(err("original error")), e => `Mapped: ${e}`)
        expect(result).toEqual({ error: "Mapped: original error", ok: false })
    })

    it("should not apply function when result is Ok", async () => {
        const result = await mapErr(Promise.resolve(ok(42)), e => `Mapped: ${e}`)
        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should handle sync result input", async () => {
        const result = await mapErr(err("original error"), e => `Mapped: ${e}`)
        expect(result).toEqual({ error: "Mapped: original error", ok: false })
    })

    it("should handle async transform function", async () => {
        const result = await mapErr(Promise.resolve(err("original error")), async e => `Async Mapped: ${e}`)
        expect(result).toEqual({ error: "Async Mapped: original error", ok: false })
    })
})
