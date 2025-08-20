import { describe, expect, it } from "vitest"
import { err } from "../src/err"
import { isErr } from "../src/isErr"
import { ok } from "../src/ok"

describe("isErr", () => {
    it("should return true for Err result", () => {
        expect(isErr(err("test error"))).toBe(true)
    })

    it("should return false for Ok result", () => {
        expect(isErr(ok(42))).toBe(false)
    })

    it("should return false for non-result values", () => {
        expect(isErr(null)).toBe(false)
        expect(isErr(undefined)).toBe(false)
        expect(isErr(42)).toBe(false)
        expect(isErr({})).toBe(false)
    })
})
