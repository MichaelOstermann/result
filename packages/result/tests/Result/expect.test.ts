import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { expect as expectFn } from "../../src/Result/expect"

describe("Result.expect", () => {
    it("should return value when result is Ok", () => {
        const value = expectFn(ok(42), "Should not fail")
        expect(value).toBe(42)
    })

    it("should throw with custom message when result is Err", () => {
        const result = err("error")
        expect(() => expectFn(result, "Custom error message")).toThrowError("Custom error message")
    })
})
