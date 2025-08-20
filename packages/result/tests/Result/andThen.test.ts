import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { andThen } from "../../src/Result/andThen"

describe("Result.andThen", () => {
    it("should apply function when result is Ok", () => {
        const mapped = andThen(ok(5), x => ok(x * 2))
        expect(mapped).toEqual({ ok: true, value: 10 })
    })

    it("should not apply function when result is Err", () => {
        const mapped = andThen(err("error"), x => ok(x * 2))
        expect(mapped).toEqual({ error: "error", ok: false })
    })

    it("should handle function that returns Err", () => {
        const mapped = andThen(ok(5), () => err("error"))
        expect(mapped).toEqual({ error: "error", ok: false })
    })
})
