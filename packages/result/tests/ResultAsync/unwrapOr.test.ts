import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { unwrapOr } from "../../src/ResultAsync/unwrapOr"

describe("ResultAsync.unwrapOr", () => {
    it("should return value when result is Ok", async () => {
        const value = await unwrapOr(Promise.resolve(ok(42)), 0)
        expect(value).toBe(42)
    })

    it("should return fallback when result is Err", async () => {
        const value = await unwrapOr(Promise.resolve(err("test error")), 0)
        expect(value).toBe(0)
    })

    it("should handle sync result input", async () => {
        const value = await unwrapOr(ok(42), 0)
        expect(value).toBe(42)
    })

    it("should return fallback for sync Err input", async () => {
        const value = await unwrapOr(err("test error"), 0)
        expect(value).toBe(0)
    })
})
