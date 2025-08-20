import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { mapOr } from "../../src/ResultAsync/mapOr"

describe("ResultAsync.mapOr", () => {
    it("should apply function when result is Ok", async () => {
        const result = await mapOr(Promise.resolve(ok(5)), x => x * 2, 0)
        expect(result).toBe(10)
    })

    it("should return fallback when result is Err", async () => {
        const result = await mapOr(Promise.resolve(err("error")), x => x * 2, 0)
        expect(result).toBe(0)
    })

    it("should handle sync result input", async () => {
        const result = await mapOr(ok(5), x => x * 2, 0)
        expect(result).toBe(10)
    })

    it("should handle async transform function", async () => {
        const result = await mapOr(Promise.resolve(ok(5)), async x => x * 2, 0)
        expect(result).toBe(10)
    })
})
