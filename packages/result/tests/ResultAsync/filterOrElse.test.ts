import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { filterOrElse } from "../../src/ResultAsync/filterOrElse"

describe("ResultAsync.filterOrElse", () => {
    it("should return Ok when predicate passes", async () => {
        const result = await filterOrElse(Promise.resolve(ok(10)), x => x > 5, () => "too small")
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should return Err with orElse result when predicate fails", async () => {
        const result = await filterOrElse(Promise.resolve(ok(3)), x => x > 5, () => "too small")
        expect(result).toEqual({ error: "too small", ok: false })
    })

    it("should return original Err when result is Err", async () => {
        const result = await filterOrElse(Promise.resolve(err("test error")), x => x > 5, () => "too small")
        expect(result).toEqual({ error: "test error", ok: false })
    })

    it("should handle async orElse function", async () => {
        const result = await filterOrElse(Promise.resolve(ok(3)), x => x > 5, async () => "async too small")
        expect(result).toEqual({ error: "async too small", ok: false })
    })
})
