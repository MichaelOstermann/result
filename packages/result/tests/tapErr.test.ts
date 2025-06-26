import type { Err, ErrP, Ok, OkP, Result, ResultP } from "../src/types"
import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err"
import { ok } from "../src/ok"
import { tapErr } from "../src/tapErr"

describe("tapErr", () => {
    describe("implementation", () => {
        test("should tap into Err<T>", () => {
            expect.assertions(2)
            expect(tapErr(err(true), (value) => {
                expect(value).toBe(true)
            })).toEqual({ error: true, ok: false })
        })

        test("should tap into ErrP<T>", async () => {
            expect.assertions(2)
            await expect(tapErr(Promise.resolve(err(true)), (value) => {
                expect(value).toBe(true)
            })).resolves.toEqual({ error: true, ok: false })
        })

        test("should not tap into Ok<T>", () => {
            expect(tapErr(ok(true), () => {
                throw new Error("Tapped into Ok")
            })).toEqual({ ok: true, value: true })
        })

        test("should not tap into OkP<T>", async () => {
            await expect(tapErr(Promise.resolve(ok(true)), () => {
                throw new Error("Tapped into Ok")
            })).resolves.toEqual({ ok: true, value: true })
        })
    })

    describe("types", () => {
        test("tapErr(Ok<boolean>, (never) => void): Ok<boolean>", () => {
            expectTypeOf(tapErr(ok(true), (v) => {
                expectTypeOf(v).toBeNever()
            })).toEqualTypeOf<Ok<boolean>>()
        })

        test("tapErr(Err<boolean>, (boolean) => void): Err<boolean>", () => {
            expectTypeOf(tapErr(err(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
            })).toEqualTypeOf<Err<boolean>>()
        })

        test("tapErr(Result<boolean, string>, (string) => void): Result<boolean, string>", () => {
            expectTypeOf(tapErr(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
            })).toEqualTypeOf<Result<boolean, string>>()
        })

        test("tapErr(OkP<boolean>, (never) => void): OkP<boolean>", () => {
            expectTypeOf(tapErr(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toBeNever()
            })).toEqualTypeOf<OkP<boolean>>()
        })

        test("tapErr(ErrP<boolean>, (boolean) => void): ErrP<boolean>", () => {
            expectTypeOf(tapErr(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
            })).toEqualTypeOf<ErrP<boolean>>()
        })

        test("tapErr(ResultP<boolean, string>, (string) => void): ResultP<boolean, string>", () => {
            expectTypeOf(tapErr(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
            })).toEqualTypeOf<ResultP<boolean, string>>()
        })
    })
})
