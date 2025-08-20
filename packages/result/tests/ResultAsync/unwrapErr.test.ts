import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { unwrapErr } from "../../src/ResultAsync/unwrapErr"

describe("ResultAsync.unwrapErr", () => {
    it("should return error when result is Err", async () => {
        const error = await unwrapErr(Promise.resolve(err("test error")))
        expect(error).toBe("test error")
    })

    it("should throw when result is Ok", async () => {
        await expect(unwrapErr(Promise.resolve(ok(42)))).rejects.toThrow()
    })

    it("should handle sync result input", async () => {
        const error = await unwrapErr(err("test error"))
        expect(error).toBe("test error")
    })

    it("should throw when sync result is Ok", async () => {
        await expect(unwrapErr(ok(42))).rejects.toThrow()
    })
})
