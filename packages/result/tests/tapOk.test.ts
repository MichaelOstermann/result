import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err.js"
import { ok } from "../src/ok.js"
import { tapOk } from "../src/tapOk.js"
import type { Ok, Err, Result, OkP, ErrP, ResultP } from "../src/types.js"

describe("tapOk", () => {
    describe("implementation", () => {
        test("should tap into Ok<T>", () => {
            expect.assertions(2)
            expect(tapOk(ok(true), (value) => {
                expect(value).toBe(true)
            })).toEqual({ ok: true, value: true })
        })

        test("should tap into OkP<T>", async () => {
            expect.assertions(2)
            await expect(tapOk(Promise.resolve(ok(true)), (value) => {
                expect(value).toBe(true)
            })).resolves.toEqual({ ok: true, value: true })
        })

        test("should not tap into Err<T>", () => {
            expect(tapOk(err(true), () => {
                throw new Error("Tapped into Err")
            })).toEqual({ ok: false, error: true })
        })

        test("should not tap into ErrP<T>", async () => {
            await expect(tapOk(Promise.resolve(err(true)), () => {
                throw new Error("Tapped into Err")
            })).resolves.toEqual({ ok: false, error: true })
        })
    })

    describe("types", () => {
        test("tapOk(Ok<boolean>, (boolean) => void): Ok<boolean>", () => {
            expectTypeOf(tapOk(ok(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
            })).toEqualTypeOf<Ok<boolean>>()
        })

        test("tapOk(Err<boolean>, (never) => void): Err<boolean>", () => {
            expectTypeOf(tapOk(err(true), (v) => {
                expectTypeOf(v).toBeNever()
            })).toEqualTypeOf<Err<boolean>>()
        })

        test("tapOk(Result<boolean, string>, (boolean) => void): Result<boolean, string>", () => {
            expectTypeOf(tapOk(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
            })).toEqualTypeOf<Result<boolean, string>>()
        })

        test("tapOk(OkP<boolean>, (boolean) => void): OkP<boolean>", () => {
            expectTypeOf(tapOk(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
            })).toEqualTypeOf<OkP<boolean>>()
        })

        test("tapOk(ErrP<boolean>, (never) => void): ErrP<boolean>", () => {
            expectTypeOf(tapOk(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toBeNever()
            })).toEqualTypeOf<ErrP<boolean>>()
        })

        test("tapOk(ResultP<boolean, string>, (boolean) => void): ResultP<boolean, string>", () => {
            expectTypeOf(tapOk(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
            })).toEqualTypeOf<ResultP<boolean, string>>()
        })
    })
})
