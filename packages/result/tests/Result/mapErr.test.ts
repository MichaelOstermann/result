import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { mapErr } from "../../src/Result/mapErr"

describe("Result.mapErr", () => {
    it("should apply function when result is Err", () => {
        const result = mapErr(err("original error"), e => `Mapped: ${e}`)
        expect(result).toEqual({ error: "Mapped: original error", ok: false })
    })

    it("should not apply function when result is Ok", () => {
        const result = mapErr(ok(42), e => `Mapped: ${e}`)
        expect(result).toEqual({ ok: true, value: 42 })
    })
})
