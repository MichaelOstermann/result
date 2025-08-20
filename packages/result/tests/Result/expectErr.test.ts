import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { expectErr } from "../../src/Result/expectErr"

describe("Result.expectErr", () => {
    it("should return error when result is Err", () => {
        const value = expectErr(err("error"), "Should not succeed")
        expect(value).toBe("error")
    })

    it("should throw with custom message when result is Ok", () => {
        const result = ok(42)
        expect(() => expectErr(result, "Custom error message")).toThrowError("Custom error message")
    })
})
