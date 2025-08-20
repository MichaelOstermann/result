import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { any } from "../../src/Result/any"

describe("Result.any", () => {
    it("should return first Ok when at least one result is Ok", () => {
        const result = any([err("error"), ok(2), ok(3)])
        expect(result).toEqual({ ok: true, value: 2 })
    })

    it("should return array of all errors when all results are Err", () => {
        const result = any([err("a"), err("b")])
        expect(result).toEqual(["a", "b"])
    })

    it("should return Err with empty array for empty input", () => {
        const result = any([])
        expect(result).toEqual([])
    })

    it("should return first Ok even if later Oks exist", () => {
        const result = any([ok(1), ok(2), ok(3)])
        expect(result).toEqual({ ok: true, value: 1 })
    })
})
