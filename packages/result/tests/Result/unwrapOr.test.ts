import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { unwrapOr } from "../../src/Result/unwrapOr"

describe("Result.unwrapOr", () => {
    it("should return value when result is Ok", () => {
        const value = unwrapOr(ok(42), 0)
        expect(value).toBe(42)
    })

    it("should return fallback when result is Err", () => {
        const value = unwrapOr(err("test error"), 0)
        expect(value).toBe(0)
    })
})
