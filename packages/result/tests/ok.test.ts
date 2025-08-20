import { describe, expect, it } from "vitest"
import { err } from "../src/err"
import { ok } from "../src/ok"

describe("ok", () => {
    it("should create Ok result with value", () => {
        const result = ok(42)
        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should create Ok result with void", () => {
        const result = ok()
        expect(result).toEqual({ ok: true, value: undefined })
    })

    it("should pass through existing Ok result", () => {
        const result = ok(ok(42))
        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should pass through existing Err result", () => {
        const result = ok(err("test error"))
        expect(result).toEqual({ error: "test error", ok: false })
    })
})
