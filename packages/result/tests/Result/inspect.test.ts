import { describe, expect, it, vi } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { inspect } from "../../src/Result/inspect"

describe("Result.inspect", () => {
    it("should call function with value when result is Ok and return original result", () => {
        const result = ok(42)
        const spy = vi.fn()
        const returned = inspect(result, spy)
        expect(spy).toHaveBeenCalledWith(42)
        expect(returned).toEqual({ ok: true, value: 42 })
    })

    it("should not call function when result is Err and return original result", () => {
        const result = err("error")
        const spy = vi.fn()
        const returned = inspect(result, spy)
        expect(spy).not.toHaveBeenCalled()
        expect(returned).toEqual({ error: "error", ok: false })
    })
})
