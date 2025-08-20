import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { orElse } from "../../src/ResultAsync/orElse"

describe("ResultAsync.orElse", () => {
    it("should return original result when result is Ok", async () => {
        const result = await orElse(Promise.resolve(ok(42)), () => ok(0))
        expect(result).toEqual({ ok: true, value: 42 })
    })

    it("should apply function to error when result is Err", async () => {
        const result = await orElse(Promise.resolve(err("error")), error => ok(`recovered from ${error}`))
        expect(result).toEqual({ ok: true, value: "recovered from error" })
    })

    it("should handle function that returns Err when transforming error", async () => {
        const result = await orElse(Promise.resolve(err("original error")), error => err(`transformed ${error}`))
        expect(result).toEqual({ error: "transformed original error", ok: false })
    })

    it("should handle async transform function", async () => {
        const result = await orElse(Promise.resolve(err("error")), async error => ok(`async recovered from ${error}`))
        expect(result).toEqual({ ok: true, value: "async recovered from error" })
    })
})
