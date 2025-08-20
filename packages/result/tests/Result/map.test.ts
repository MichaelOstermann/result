import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { map } from "../../src/Result/map"

describe("Result.map", () => {
    it("should apply function when result is Ok", () => {
        const result = map(ok(5), x => x * 2)
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should not apply function when result is Err", () => {
        const result = map(err("error"), x => x * 2)
        expect(result).toEqual({ error: "error", ok: false })
    })
})
