import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { expect as expectFn } from "../../src/ResultAsync/expect"

describe("ResultAsync.expect", () => {
    it("should return value when result is Ok", async () => {
        const value = await expectFn(Promise.resolve(ok(42)), "Should not fail")
        expect(value).toBe(42)
    })

    it("should throw with custom message when result is Err", async () => {
        const promise = expectFn(Promise.resolve(err("test error")), "Custom error message")
        await expect(promise).rejects.toThrowError("Custom error message")
    })
})
