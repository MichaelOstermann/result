import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { filterOr } from "../../src/Result/filterOr"

describe("Result.filterOr", () => {
    it("should return Ok when predicate passes", () => {
        const result = filterOr(ok(10), x => x > 5, "error")
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should return Err with fallback when predicate fails", () => {
        const result = filterOr(ok(3), x => x > 5, "error")
        expect(result).toEqual({ error: "error", ok: false })
    })

    it("should return original Err when result is Err", () => {
        const result = filterOr(err("a"), x => x > 5, "b")
        expect(result).toEqual({ error: "a", ok: false })
    })
})
