import { describe, expect, it, vi } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { inspect } from "../../src/ResultAsync/inspect"

describe("ResultAsync.inspect", () => {
    it("should call function with value when result is Ok and return original result", async () => {
        const result = Promise.resolve(ok(42))
        const spy = vi.fn()
        const returned = await inspect(result, spy)
        expect(spy).toHaveBeenCalledWith(42)
        expect(returned).toEqual({ ok: true, value: 42 })
    })

    it("should not call function when result is Err and return original result", async () => {
        const result = Promise.resolve(err("test error"))
        const spy = vi.fn()
        const returned = await inspect(result, spy)
        expect(spy).not.toHaveBeenCalled()
        expect(returned).toEqual({ error: "test error", ok: false })
    })

    it("should handle sync result input", async () => {
        const result = ok(42)
        const spy = vi.fn()
        const returned = await inspect(result, spy)
        expect(spy).toHaveBeenCalledWith(42)
        expect(returned).toEqual({ ok: true, value: 42 })
    })

    it("should handle async inspector function", async () => {
        const result = Promise.resolve(ok(42))
        const spy = vi.fn()
        const returned = await inspect(result, async value => spy(value))
        expect(spy).toHaveBeenCalledWith(42)
        expect(returned).toEqual({ ok: true, value: 42 })
    })
})
