import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { flip } from "../../src/Result/flip"

describe("Result.flip", () => {
    it("should convert Ok to Err", () => {
        const result = flip(ok(42))
        expect(result).toEqual({ error: 42, ok: false })
    })

    it("should convert Err to Ok", () => {
        const result = flip(err("error"))
        expect(result).toEqual({ ok: true, value: "error" })
    })
})
