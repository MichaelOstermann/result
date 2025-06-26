import type { Err, ErrP, Result, ResultP } from "../src/types"
import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err"
import { mapErr } from "../src/mapErr"
import { ok } from "../src/ok"

describe("mapErr", () => {
    describe("implementation", () => {
        test("should transform Err<T>", () => {
            expect(mapErr(err(0), v => v + 1)).toEqual(err(1))
        })

        test("should transform ErrP<T>", async () => {
            await expect(mapErr(Promise.resolve(err(0)), v => v + 1)).resolves.toEqual(err(1))
        })

        test("should transform ErrP<T>", async () => {
            await expect(mapErr(Promise.resolve(err(0)), async v => v + 1)).resolves.toEqual(err(1))
        })

        test("should not touch Ok<T>", () => {
            expect(mapErr(ok(0), v => v + 1)).toEqual(ok(0))
        })

        test("should not touch OkP<T>", async () => {
            await expect(mapErr(Promise.resolve(ok(0)), v => v + 1)).resolves.toEqual(ok(0))
        })
    })

    describe("types", () => {
        test("mapErr(Err<boolean>, (boolean) => number): Err<number>", () => {
            expectTypeOf(mapErr(err(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as number
            })).toEqualTypeOf<Err<number>>()
        })

        test("mapErr(Err<boolean>, (boolean) => boolean | number): Err<boolean | number>", () => {
            expectTypeOf(mapErr(err(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | number
            })).toEqualTypeOf<Err<boolean | number>>()
        })

        test("mapErr(Result<boolean, string>, (boolean) => number): Result<boolean, number>", () => {
            expectTypeOf(mapErr(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as number
            })).toEqualTypeOf<Result<boolean, number>>()
        })

        test("mapErr(Result<boolean, string>, (boolean) => boolean | number): Result<boolean, boolean | number>", () => {
            expectTypeOf(mapErr(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as boolean | number
            })).toEqualTypeOf<Result<boolean, boolean | number>>()
        })

        test("mapErr(ErrP<boolean>, (boolean) => number): ErrP<number>", () => {
            expectTypeOf(mapErr(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as number
            })).toEqualTypeOf<ErrP<number>>()
        })

        test("mapErr(ErrP<boolean>, (boolean) => Promise<number>): ErrP<number>", () => {
            expectTypeOf(mapErr(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Promise<number>
            })).toEqualTypeOf<ErrP<number>>()
        })

        test("mapErr(ErrP<boolean>, (boolean) => boolean | number): ErrP<boolean | number>", () => {
            expectTypeOf(mapErr(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | number
            })).toEqualTypeOf<ErrP<boolean | number>>()
        })

        test("mapErr(ErrP<boolean>, (boolean) => boolean | Promise<number>): ErrP<boolean | number>", () => {
            expectTypeOf(mapErr(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | Promise<number>
            })).toEqualTypeOf<ErrP<boolean | number>>()
        })

        test("mapErr(ResultP<boolean, string>, (boolean) => number): ResultP<boolean, number>", () => {
            expectTypeOf(mapErr(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as number
            })).toEqualTypeOf<ResultP<boolean, number>>()
        })

        test("mapErr(ResultP<boolean, string>, (boolean) => Promise<number>): ResultP<boolean, number>", () => {
            expectTypeOf(mapErr(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as Promise<number>
            })).toEqualTypeOf<ResultP<boolean, number>>()
        })

        test("mapErr(ResultP<boolean, string>, (boolean) => boolean | number): ResultP<boolean, boolean | number>", () => {
            expectTypeOf(mapErr(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as boolean | number
            })).toEqualTypeOf<ResultP<boolean, boolean | number>>()
        })

        test("mapErr(ResultP<boolean, string>, (boolean) => boolean | Promise<number>): ResultP<boolean, boolean | number>", () => {
            expectTypeOf(mapErr(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as boolean | Promise<number>
            })).toEqualTypeOf<ResultP<boolean, boolean | number>>()
        })
    })
})
