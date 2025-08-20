import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { map } from "../../src/ResultAsync/map"

describe("ResultAsync.map", () => {
    it("should apply function when result is Ok (sync)", async () => {
        const result = await map(ok(5), x => x * 2)
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should apply async function when result is Ok", async () => {
        const result = await map(Promise.resolve(ok(5)), async x => x * 2)
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should not apply function when result is Err", async () => {
        const result = await map(err("test error"), x => x * 2)
        expect(result).toEqual({ error: "test error", ok: false })
    })

    it("should handle async Err result", async () => {
        const result = await map(Promise.resolve(err("test error")), x => x * 2)
        expect(result).toEqual({ error: "test error", ok: false })
    })
})
