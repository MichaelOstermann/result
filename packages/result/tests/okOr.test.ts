import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err.js"
import { ok } from "../src/ok.js"
import { okOr } from "../src/okOr.js"
import type { Result, ResultP } from "../src/types.js"

describe("okOr", () => {
    describe("implementation", () => {
        test("should return Ok<T>", () => {
            expect(okOr(ok(true), false)).toBe(true)
        })

        test("should return OkP<T>", async () => {
            await expect(okOr(Promise.resolve(ok(true)), false)).resolves.toBe(true)
        })

        test("should return fallback on Err<T>", () => {
            expect(okOr(err(true), false)).toBe(false)
        })

        test("should return fallback on ErrP<T>", async () => {
            await expect(okOr(Promise.resolve(err(true)), false)).resolves.toBe(false)
        })

        test("should return fallback on ErrP<T>", async () => {
            await expect(okOr(Promise.resolve(err(true)), Promise.resolve(false))).resolves.toBe(false)
        })
    })

    describe("types", () => {
        test("okOr(Ok<boolean>, string): boolean | string", () => {
            expectTypeOf(okOr(ok(true), "failed")).toEqualTypeOf<boolean | string>()
        })

        test("okOr(Err<boolean>, string): string", () => {
            expectTypeOf(okOr(err(true), "failed")).toEqualTypeOf<string>()
        })

        test("okOr(Result<boolean, string>, string): boolean | string", () => {
            expectTypeOf(okOr(ok(true) as Result<boolean, string>, "failed")).toEqualTypeOf<boolean | string>()
        })

        test("okOr(OkP<boolean>, Promise<string>): Promise<boolean | string>", () => {
            expectTypeOf(okOr(Promise.resolve(ok(true)), "failed")).toEqualTypeOf<Promise<boolean | string>>()
        })

        test("okOr(OkP<boolean>, Promise<string>): Promise<boolean | string>", () => {
            expectTypeOf(okOr(Promise.resolve(ok(true)), Promise.resolve("failed"))).toEqualTypeOf<Promise<boolean | string>>()
        })

        test("okOr(ErrP<boolean>, Promise<string>): Promise<string>", () => {
            expectTypeOf(okOr(Promise.resolve(err(true)), "failed")).toEqualTypeOf<Promise<string>>()
        })

        test("okOr(ErrP<boolean>, Promise<string>): Promise<string>", () => {
            expectTypeOf(okOr(Promise.resolve(err(true)), Promise.resolve("failed"))).toEqualTypeOf<Promise<string>>()
        })

        test("okOr(ResultP<boolean, string>, Promise<string>): Promise<boolean | string>", () => {
            expectTypeOf(okOr(Promise.resolve(ok(true)) as ResultP<boolean, string>, "failed")).toEqualTypeOf<Promise<boolean | string>>()
        })

        test("okOr(ResultP<boolean, string>, Promise<string>): Promise<boolean | string>", () => {
            expectTypeOf(okOr(Promise.resolve(ok(true)) as ResultP<boolean, string>, Promise.resolve("failed"))).toEqualTypeOf<Promise<boolean | string>>()
        })
    })
})
