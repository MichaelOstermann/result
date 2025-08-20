import { describe, expect, it, vi } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { inspectErr } from "../../src/Result/inspectErr"

describe("Result.inspectErr", () => {
    it("should call function with error when result is Err and return original result", () => {
        const result = err("error")
        const spy = vi.fn()
        const returned = inspectErr(result, spy)
        expect(spy).toHaveBeenCalledWith("error")
        expect(returned).toEqual({ error: "error", ok: false })
    })

    it("should not call function when result is Ok and return original result", () => {
        const result = ok(42)
        const spy = vi.fn()
        const returned = inspectErr(result, spy)
        expect(spy).not.toHaveBeenCalled()
        expect(returned).toEqual({ ok: true, value: 42 })
    })
})
