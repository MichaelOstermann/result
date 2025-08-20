import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { mapOrElse } from "../../src/Result/mapOrElse"

describe("Result.mapOrElse", () => {
    it("should apply transform function when result is Ok", () => {
        const result = mapOrElse(ok(5), x => x * 2, () => 0)
        expect(result).toBe(10)
    })

    it("should apply fallback function when result is Err", () => {
        const result = mapOrElse(err("error"), x => x * 2, e => e.length)
        expect(result).toBe(5)
    })
})
