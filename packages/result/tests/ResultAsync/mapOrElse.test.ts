import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { mapOrElse } from "../../src/ResultAsync/mapOrElse"

describe("ResultAsync.mapOrElse", () => {
    it("should apply transform function when result is Ok", async () => {
        const result = await mapOrElse(Promise.resolve(ok(5)), x => x * 2, () => 0)
        expect(result).toBe(10)
    })

    it("should apply fallback function when result is Err", async () => {
        const result = await mapOrElse(Promise.resolve(err("error")), x => x * 2, e => e.length)
        expect(result).toBe(5)
    })

    it("should handle sync result input", async () => {
        const result = await mapOrElse(ok(5), x => x * 2, () => 0)
        expect(result).toBe(10)
    })

    it("should handle async functions", async () => {
        const result = await mapOrElse(Promise.resolve(err("error")), async x => x * 2, async e => e.length)
        expect(result).toBe(5)
    })
})
