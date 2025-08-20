import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { unwrap } from "../../src/ResultAsync/unwrap"

describe("ResultAsync.unwrap", () => {
    it("should return value when result is Ok", async () => {
        const value = await unwrap(Promise.resolve(ok(42)))
        expect(value).toBe(42)
    })

    it("should throw when result is Err", async () => {
        await expect(unwrap(Promise.resolve(err("test error")))).rejects.toThrow()
    })

    it("should handle sync result input", async () => {
        const value = await unwrap(ok(42))
        expect(value).toBe(42)
    })

    it("should throw when sync result is Err", async () => {
        await expect(unwrap(err("test error"))).rejects.toThrow()
    })
})
