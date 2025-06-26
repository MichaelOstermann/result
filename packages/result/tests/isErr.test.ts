import type { Err, Ok } from "../src/types"
import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err"
import { isErr } from "../src/isErr"
import { ok } from "../src/ok"

describe("isErr", () => {
    describe("implementation", () => {
        test("should return true for Err<T>", () => {
            expect(isErr(err())).toBe(true)
        })

        test("should return false for Ok<T>", () => {
            expect(isErr(ok())).toBe(false)
        })

        test("should return false for anything else", () => {
            expect(isErr(true)).toBe(false)
        })
    })

    describe("types", () => {
        test("isErr(value: Ok<boolean> | Err<boolean>): value is Err<boolean>", () => {
            const value = ok(true) as Ok<boolean> | Err<boolean>
            if (isErr(value)) expectTypeOf<Err<boolean>>(value)
        })

        test("!isErr(value: Ok<boolean> | Err<boolean>): value is Ok<boolean>", () => {
            const value = ok(true) as Ok<boolean> | Err<boolean>
            if (!isErr(value)) expectTypeOf<Ok<boolean>>(value)
        })
    })
})
