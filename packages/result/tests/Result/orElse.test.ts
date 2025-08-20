import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { orElse } from "../../src/Result/orElse"

describe("Result.orElse", () => {
    it("should return original result when result is Ok", () => {
        const result = orElse(ok(42), () => ok(0))
        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should apply function to error when result is Err", () => {
        const result = orElse(err("error"), error => ok(`recovered from ${error}`))
        expect(result).toEqual({ ok: true, value: "recovered from error" })
    })

    it("should handle function that returns Err when transforming error", () => {
        const result = orElse(err("original error"), error => err(`transformed ${error}`))
        expect(result).toEqual({ error: "transformed original error", ok: false })
    })
})
