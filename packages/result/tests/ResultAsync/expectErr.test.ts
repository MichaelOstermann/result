import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { expectErr } from "../../src/ResultAsync/expectErr"

describe("ResultAsync.expectErr", () => {
    it("should return error when result is Err", async () => {
        const value = await expectErr(Promise.resolve(err("test error")), "Should not succeed")
        expect(value).toBe("test error")
    })

    it("should throw with custom message when result is Ok", async () => {
        const promise = expectErr(Promise.resolve(ok(42)), "Custom error message")
        await expect(promise).rejects.toThrowError("Custom error message")
    })
})
