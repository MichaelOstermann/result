import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { unwrapOrElse } from "../../src/ResultAsync/unwrapOrElse"

describe("ResultAsync.unwrapOrElse", () => {
    it("should return value when result is Ok", async () => {
        const value = await unwrapOrElse(Promise.resolve(ok(42)), () => 0)
        expect(value).toBe(42)
    })

    it("should return fallback function result when result is Err", async () => {
        const value = await unwrapOrElse(Promise.resolve(err("test error")), e => e.length)
        expect(value).toBe(10)
    })

    it("should handle sync result input", async () => {
        const value = await unwrapOrElse(ok(42), () => 0)
        expect(value).toBe(42)
    })

    it("should handle async fallback function", async () => {
        const value = await unwrapOrElse(Promise.resolve(err("test error")), async e => e.length)
        expect(value).toBe(10)
    })
})
