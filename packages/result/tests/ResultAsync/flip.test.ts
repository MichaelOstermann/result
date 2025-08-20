import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { flip } from "../../src/ResultAsync/flip"

describe("ResultAsync.flip", () => {
    it("should convert Ok to Err", async () => {
        const result = await flip(Promise.resolve(ok(42)))
        expect(result).toEqual({ error: 42, ok: false })
    })

    it("should convert Err to Ok", async () => {
        const result = await flip(Promise.resolve(err("test error")))
        expect(result).toEqual({ ok: true, value: "test error" })
    })

    it("should handle sync result input", async () => {
        const result = await flip(ok(42))
        expect(result).toEqual({ error: 42, ok: false })
    })
})
