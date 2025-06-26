import type { Result, ResultP } from "../src/types"
import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err"
import { ok } from "../src/ok"
import { okOrElse } from "../src/okOrElse"

describe("okOrElse", () => {
    describe("implementation", () => {
        test("should return Ok<T>", () => {
            expect(okOrElse(ok(true), (value) => {
                expect(value).toBe(undefined)
                return false
            })).toBe(true)
        })

        test("should return OkP<T>", async () => {
            await expect(okOrElse(Promise.resolve(ok(true)), (value) => {
                expect(value).toBe(undefined)
                return false
            })).resolves.toBe(true)
        })

        test("should return fallback on Err<T>", () => {
            expect(okOrElse(err(true), (value) => {
                expect(value).toBe(true)
                return false
            })).toBe(false)
        })

        test("should return fallback on ErrP<T>", async () => {
            await expect(okOrElse(Promise.resolve(err(true)), (value) => {
                expect(value).toBe(true)
                return false
            })).resolves.toBe(false)
        })

        test("should return fallback on ErrP<T>", async () => {
            await expect(okOrElse(Promise.resolve(err(true)), (value) => {
                expect(value).toBe(true)
                return Promise.resolve(false)
            })).resolves.toBe(false)
        })
    })

    describe("types", () => {
        test("okOrElse(Ok<boolean>, (error: never) => string): boolean | string", () => {
            expectTypeOf(okOrElse(ok(true), (error) => {
                expectTypeOf(error).toBeNever()
                return "failed"
            })).toEqualTypeOf<boolean | string>()
        })

        test("okOrElse(Err<boolean>, (error: boolean) => string): string", () => {
            expectTypeOf(okOrElse(err(true), (error) => {
                expectTypeOf(error).toEqualTypeOf<boolean>()
                return "failed"
            })).toEqualTypeOf<string>()
        })

        test("okOrElse(Result<boolean, string>, (error: string) => string): boolean | string", () => {
            expectTypeOf(okOrElse(ok(true) as Result<boolean, string>, (error) => {
                expectTypeOf(error).toEqualTypeOf<string>()
                return "failed"
            })).toEqualTypeOf<boolean | string>()
        })

        test("okOrElse(OkP<boolean>, (error: never) => Promise<string>): Promise<boolean | string>", () => {
            expectTypeOf(okOrElse(Promise.resolve(ok(true)), (error) => {
                expectTypeOf(error).toBeNever()
                return "failed"
            })).toEqualTypeOf<Promise<boolean | string>>()
        })

        test("okOrElse(OkP<boolean>, (error: never) => Promise<string>): Promise<boolean | string>", () => {
            expectTypeOf(okOrElse(Promise.resolve(ok(true)), (error) => {
                expectTypeOf(error).toBeNever()
                return Promise.resolve("failed")
            })).toEqualTypeOf<Promise<boolean | string>>()
        })

        test("okOrElse(ErrP<boolean>, (error: boolean) => Promise<string>): Promise<string>", () => {
            expectTypeOf(okOrElse(Promise.resolve(err(true)), (error) => {
                expectTypeOf(error).toEqualTypeOf<boolean>()
                return "failed"
            })).toEqualTypeOf<Promise<string>>()
        })

        test("okOrElse(ErrP<boolean>, (error: boolean) => Promise<string>): Promise<string>", () => {
            expectTypeOf(okOrElse(Promise.resolve(err(true)), (error) => {
                expectTypeOf(error).toEqualTypeOf<boolean>()
                return Promise.resolve("failed")
            })).toEqualTypeOf<Promise<string>>()
        })

        test("okOrElse(ResultP<boolean, string>, (error: string) => Promise<string>): Promise<boolean | string>", () => {
            expectTypeOf(okOrElse(Promise.resolve(ok(true)) as ResultP<boolean, string>, (error) => {
                expectTypeOf(error).toEqualTypeOf<string>()
                return "failed"
            })).toEqualTypeOf<Promise<boolean | string>>()
        })

        test("okOrElse(ResultP<boolean, string>, (error: string) => Promise<string>): Promise<boolean | string>", () => {
            expectTypeOf(okOrElse(Promise.resolve(ok(true)) as ResultP<boolean, string>, (error) => {
                expectTypeOf(error).toEqualTypeOf<string>()
                return Promise.resolve("failed")
            })).toEqualTypeOf<Promise<boolean | string>>()
        })
    })
})
