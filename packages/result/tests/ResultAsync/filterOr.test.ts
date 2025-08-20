import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { filterOr } from "../../src/ResultAsync/filterOr"

describe("ResultAsync.filterOr", () => {
    it("should return Ok when predicate passes", async () => {
        const result = await filterOr(Promise.resolve(ok(10)), x => x > 5, 0)
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should return Err with fallback when predicate fails", async () => {
        const result = await filterOr(Promise.resolve(ok(3)), x => x > 5, 0)
        expect(result).toEqual({ error: 0, ok: false })
    })

    it("should return original Err when result is Err", async () => {
        const result = await filterOr(Promise.resolve(err("test error")), x => x > 5, 0)
        expect(result).toEqual({ error: "test error", ok: false })
    })

    it("should handle sync result input", async () => {
        const result = await filterOr(ok(10), x => x > 5, 0)
        expect(result).toEqual({ ok: true, value: 10 })
    })
})
