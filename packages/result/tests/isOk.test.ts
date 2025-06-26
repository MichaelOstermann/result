import type { Err, Ok } from "../src/types"
import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err"
import { isOk } from "../src/isOk"
import { ok } from "../src/ok"

describe("isOk", () => {
    describe("implementation", () => {
        test("should return true for Ok<T>", () => {
            expect(isOk(ok())).toBe(true)
        })

        test("should return false for Err<T>", () => {
            expect(isOk(err())).toBe(false)
        })

        test("should return false for anything else", () => {
            expect(isOk(true)).toBe(false)
        })
    })

    describe("types", () => {
        test("isOk(value: Ok<boolean> | Err<boolean>): value is Ok<boolean>", () => {
            const value = ok(true) as Ok<boolean> | Err<boolean>
            if (isOk(value)) expectTypeOf<Ok<boolean>>(value)
        })

        test("!isOk(value: Ok<boolean> | Err<boolean>): value is Err<boolean>", () => {
            const value = ok(true) as Ok<boolean> | Err<boolean>
            if (!isOk(value)) expectTypeOf<Err<boolean>>(value)
        })
    })
})
