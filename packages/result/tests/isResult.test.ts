import { describe, expect, it } from "vitest"
import { err } from "../src/err"
import { isResult } from "../src/isResult"
import { ok } from "../src/ok"

describe("isResult", () => {
    it("should return true for Ok result", () => {
        expect(isResult(ok(42))).toBe(true)
    })

    it("should return true for Err result", () => {
        expect(isResult(err("test error"))).toBe(true)
    })

    it("should return false for non-result objects", () => {
        expect(isResult({})).toBe(false)
        expect(isResult(null)).toBe(false)
        expect(isResult(undefined)).toBe(false)
        expect(isResult(42)).toBe(false)
        expect(isResult("string")).toBe(false)
        expect(isResult([])).toBe(false)
    })
})
