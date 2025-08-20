import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { filterOrElse } from "../../src/Result/filterOrElse"

describe("Result.filterOrElse", () => {
    it("should return Ok when predicate passes", () => {
        const result = filterOrElse(ok(10), x => x > 5, () => "too small")
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should return Err with orElse result when predicate fails", () => {
        const result = filterOrElse(ok(3), x => x > 5, () => "too small")
        expect(result).toEqual({ error: "too small", ok: false })
    })

    it("should return original Err when result is Err", () => {
        const result = filterOrElse(err("error"), x => x > 5, () => "too small")
        expect(result).toEqual({ error: "error", ok: false })
    })
})
