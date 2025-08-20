import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { match } from "../../src/ResultAsync/match"

describe("ResultAsync.match", () => {
    it("should apply ok handler when result is Ok", async () => {
        const matched = await match(Promise.resolve(ok(42)), {
            Err: error => `Error: ${error}`,
            Ok: value => `Success: ${value}`,
        })
        expect(matched).toBe("Success: 42")
    })

    it("should apply err handler when result is Err", async () => {
        const matched = await match(Promise.resolve(err("test error")), {
            Err: error => `Error: ${error}`,
            Ok: value => `Success: ${value}`,
        })
        expect(matched).toBe("Error: test error")
    })

    it("should handle async handlers", async () => {
        const matched = await match(Promise.resolve(ok(42)), {
            Err: async error => `Async Error: ${error}`,
            Ok: async value => `Async Success: ${value}`,
        })
        expect(matched).toBe("Async Success: 42")
    })
})
