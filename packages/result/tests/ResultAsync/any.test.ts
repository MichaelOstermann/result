import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { any } from "../../src/ResultAsync/any"

describe("ResultAsync.any", () => {
    it("should return first Ok when at least one result is Ok", async () => {
        const result = await any([
            err("error1"),
            Promise.resolve(ok(2)),
            ok(3),
        ])
        expect(result).toEqual({ ok: true, value: 2 })
    })

    it("should return array of all errors when all results are Err", async () => {
        const result = await any([
            err("error1"),
            Promise.resolve(err("error2")),
        ])
        expect(result).toEqual(["error1", "error2"])
    })

    it("should return Err with empty array for empty input", async () => {
        const result = await any([])
        expect(result).toEqual([])
    })

    it("should handle mixed sync and async results", async () => {
        const result = await any([
            Promise.resolve(err("error1")),
            err("error2"),
            Promise.resolve(ok(42)),
        ])
        expect(result).toEqual({ ok: true, value: 42 })
    })
})
