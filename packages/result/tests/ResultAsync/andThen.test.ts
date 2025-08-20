import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { andThen } from "../../src/ResultAsync/andThen"

describe("ResultAsync.andThen", () => {
    it("should apply function when result is Ok (sync)", async () => {
        const result = await andThen(ok(5), x => ok(x * 2))
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should apply async function when result is Ok", async () => {
        const result = await andThen(
            Promise.resolve(ok(5)),
            async x => ok(x * 2),
        )
        expect(result).toEqual({ ok: true, value: 10 })
    })

    it("should not apply function when result is Err", async () => {
        const result = await andThen(
            err("test error"),
            x => ok(x * 2),
        )
        expect(result).toEqual({ error: "test error", ok: false })
    })

    it("should handle function that returns Err", async () => {
        const result = await andThen(
            Promise.resolve(ok(5)),
            () => err("function error"),
        )
        expect(result).toEqual({ error: "function error", ok: false })
    })
})
