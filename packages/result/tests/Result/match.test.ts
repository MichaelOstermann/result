import { describe, expect, it } from "vitest"
import { err } from "../../src/err"
import { ok } from "../../src/ok"
import { match } from "../../src/Result/match"

describe("Result.match", () => {
    it("should apply ok handler when result is Ok", () => {
        const matched = match(ok(42), {
            Err: error => `Error: ${error}`,
            Ok: value => `Success: ${value}`,
        })
        expect(matched).toBe("Success: 42")
    })

    it("should apply err handler when result is Err", () => {
        const matched = match(err("test error"), {
            Err: error => `Error: ${error}`,
            Ok: value => `Success: ${value}`,
        })
        expect(matched).toBe("Error: test error")
    })
})
