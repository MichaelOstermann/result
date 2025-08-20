import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { filter } from "../../src/Result/filter"

describe("Result.filter", () => {
    it("should return Ok when predicate passes", () => {
        const result = filter(ok(10), x => x > 5)
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should return Err when predicate fails", () => {
        const result = filter(ok(3), x => x > 5)
        expect(result.ok).toBe(false)
    })

    it("should return original Err when result is Err", () => {
        const result = filter(err("error"), x => x > 5)
        expect(result).toEqual({ error: "error", ok: false })
    })
})
