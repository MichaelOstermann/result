import { describe, expect, it } from "vitest"
import { err } from "../src/err"
import { isOk } from "../src/isOk"
import { ok } from "../src/ok"

describe("isOk", () => {
    it("should return true for Ok result", () => {
        expect(isOk(ok(42))).toBe(true)
    })

    it("should return false for Err result", () => {
        expect(isOk(err("test error"))).toBe(false)
    })

    it("should return false for non-result values", () => {
        expect(isOk(null)).toBe(false)
        expect(isOk(undefined)).toBe(false)
        expect(isOk(42)).toBe(false)
        expect(isOk({})).toBe(false)
    })
})
