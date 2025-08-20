import { describe, expect, it } from "vitest"
import { err } from "../src/err"
import { ok } from "../src/ok"

describe("err", () => {
    it("should create Err result with error", () => {
        const result = err("test error")
        expect(result).toEqual({ error: "test error", ok: false })
    })

    it("should create Err result with void", () => {
        const result = err()
        expect(result).toEqual({ ok: false, value: undefined })
    })

    it("should pass through existing Err result", () => {
        const result = err(err("test error"))
        expect(result).toEqual({ error: "test error", ok: false })
    })

    it("should pass through existing Ok result", () => {
        const result = err(ok(42))
        expect(result).toEqual({ ok: true, value: 42 })
    })
})
