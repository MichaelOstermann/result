import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { filter } from "../../src/ResultAsync/filter"

describe("ResultAsync.filter", () => {
    it("should return Ok when predicate passes", async () => {
        const result = await filter(Promise.resolve(ok(10)), x => x > 5)
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should return Err when predicate fails", async () => {
        const result = await filter(Promise.resolve(ok(3)), x => x > 5)
        expect(result.ok).toBe(false)
    })

    it("should return original Err when result is Err", async () => {
        const result = await filter(Promise.resolve(err("test error")), x => x > 5)
        expect(result).toEqual({ error: "test error", ok: false })
    })
})
