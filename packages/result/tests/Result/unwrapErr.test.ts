import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { unwrapErr } from "../../src/Result/unwrapErr"

describe("Result.unwrapErr", () => {
    it("should return error when result is Err", () => {
        const error = unwrapErr(err("test error"))
        expect(error).toBe("test error")
    })

    it("should throw when result is Ok", () => {
        const result = ok(42)
        expect(() => unwrapErr(result)).toThrow()
    })
})
