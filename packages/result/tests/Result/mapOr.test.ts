import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { mapOr } from "../../src/Result/mapOr"

describe("Result.mapOr", () => {
    it("should apply function when result is Ok", () => {
        const result = mapOr(ok(5), x => x * 2, 0)
        expect(result).toBe(10)
    })

    it("should return fallback when result is Err", () => {
        const result = mapOr(err("error"), x => x * 2, 0)
        expect(result).toBe(0)
    })
})
