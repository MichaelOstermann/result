import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { unwrapOrElse } from "../../src/Result/unwrapOrElse"

describe("Result.unwrapOrElse", () => {
    it("should return value when result is Ok", () => {
        const value = unwrapOrElse(ok(42), () => 0)
        expect(value).toBe(42)
    })

    it("should return fallback function result when result is Err", () => {
        const value = unwrapOrElse(err("test error"), e => e.length)
        expect(value).toBe(10)
    })
})
