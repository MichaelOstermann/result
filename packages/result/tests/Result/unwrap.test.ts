import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { unwrap } from "../../src/Result/unwrap"

describe("Result.unwrap", () => {
    it("should return value when result is Ok", () => {
        const value = unwrap(ok(42))
        expect(value).toBe(42)
    })

    it("should throw when result is Err", () => {
        const result = err("test error")
        expect(() => unwrap(result)).toThrow()
    })
})
