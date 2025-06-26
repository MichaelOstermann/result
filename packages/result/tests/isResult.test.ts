import type { Err, Ok, Result } from "../src/types"
import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err"
import { isResult } from "../src/isResult"
import { ok } from "../src/ok"

describe("isResult", () => {
    describe("implementation", () => {
        test("should return true for Err<T>", () => {
            expect(isResult(err())).toBe(true)
        })

        test("should return false for Ok<T>", () => {
            expect(isResult(ok())).toBe(true)
        })

        test("should return false for anything else", () => {
            expect(isResult(true)).toBe(false)
        })
    })

    describe("types", () => {
        test("isResult(value: Ok<boolean> | number): value is Ok<boolean>", () => {
            const value = ok(true) as Ok<boolean> | number
            if (isResult(value)) expectTypeOf<Ok<boolean>>(value)
        })

        test("isResult(value: Err<boolean> | number): value is Err<boolean>", () => {
            const value = err(true) as Err<boolean> | number
            if (isResult(value)) expectTypeOf<Err<boolean>>(value)
        })

        test("isResult(value: Result<boolean, boolean> | number): value is Result<boolean, boolean>", () => {
            const value = err(true) as Result<boolean, boolean> | number
            if (isResult(value)) expectTypeOf<Result<boolean, boolean>>(value)
        })

        test("!isResult(value: Ok<boolean> | number): value is number", () => {
            const value = ok(true) as Ok<boolean> | number
            if (!isResult(value)) expectTypeOf<number>(value)
        })

        test("!isResult(value: Err<boolean> | number): value is number", () => {
            const value = err(true) as Err<boolean> | number
            if (!isResult(value)) expectTypeOf<number>(value)
        })

        test("!isResult(value: Result<boolean, boolean> | number): value is number", () => {
            const value = err(true) as Result<boolean, boolean> | number
            if (!isResult(value)) expectTypeOf<number>(value)
        })
    })
})
