import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { all } from "../../src/Result/all"

describe("Result.all", () => {
    it("should return Ok with all values when all results are Ok", () => {
        const result = all([ok(1), ok(2), ok(3)])
        expect(result).toEqual({ ok: true, value: [1, 2, 3] })
    })

    it("should return first Err when any result is Err", () => {
        const result = all([ok(1), err("error"), ok(3)])
        expect(result).toEqual({ error: "error", ok: false })
    })

    it("should return Ok with empty array for empty input", () => {
        const result = all([])
        expect(result).toEqual({ ok: true, value: [] })
    })

    it("should return first error when multiple errors exist", () => {
        const result = all([ok(1), err("a"), err("b")])
        expect(result).toEqual({ error: "a", ok: false })
    })
})
