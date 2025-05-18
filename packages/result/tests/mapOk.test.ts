import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err.js"
import { mapOk } from "../src/mapOk.js"
import { ok } from "../src/ok.js"
import type { Ok, Result, OkP, ResultP } from "../src/types.js"

describe("mapOk", () => {
    describe("implementation", () => {
        test("should transform Ok<T>", () => {
            expect(mapOk(ok(0), v => v + 1)).toEqual(ok(1))
        })

        test("should transform OkP<T>", async () => {
            await expect(mapOk(Promise.resolve(ok(0)), v => v + 1)).resolves.toEqual(ok(1))
        })

        test("should transform OkP<T>", async () => {
            await expect(mapOk(Promise.resolve(ok(0)), async v => v + 1)).resolves.toEqual(ok(1))
        })

        test("should not touch Err<T>", () => {
            expect(mapOk(err(0), v => v + 1)).toEqual(err(0))
        })

        test("should not touch ErrP<T>", async () => {
            await expect(mapOk(Promise.resolve(err(0)), v => v + 1)).resolves.toEqual(err(0))
        })
    })

    describe("types", () => {
        test("mapOk(Ok<boolean>, (boolean) => number): Ok<number>", () => {
            expectTypeOf(mapOk(ok(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as number
            })).toEqualTypeOf<Ok<number>>()
        })

        test("mapOk(Ok<boolean>, (boolean) => boolean | number): Ok<boolean | number>", () => {
            expectTypeOf(mapOk(ok(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | number
            })).toEqualTypeOf<Ok<boolean | number>>()
        })

        test("mapOk(Result<boolean, string>, (boolean) => number): Result<number, string>", () => {
            expectTypeOf(mapOk(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as number
            })).toEqualTypeOf<Result<number, string>>()
        })

        test("mapOk(Result<boolean, string>, (boolean) => boolean | number): Result<boolean | number, string>", () => {
            expectTypeOf(mapOk(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | number
            })).toEqualTypeOf<Result<boolean | number, string>>()
        })

        test("mapOk(OkP<boolean>, (boolean) => number): OkP<number>", () => {
            expectTypeOf(mapOk(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as number
            })).toEqualTypeOf<OkP<number>>()
        })

        test("mapOk(OkP<boolean>, (boolean) => Promise<number>): OkP<number>", () => {
            expectTypeOf(mapOk(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Promise<number>
            })).toEqualTypeOf<OkP<number>>()
        })

        test("mapOk(OkP<boolean>, (boolean) => boolean | number): OkP<boolean | number>", () => {
            expectTypeOf(mapOk(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | number
            })).toEqualTypeOf<OkP<boolean | number>>()
        })

        test("mapOk(OkP<boolean>, (boolean) => boolean | Promise<number>): OkP<boolean | number>", () => {
            expectTypeOf(mapOk(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | Promise<number>
            })).toEqualTypeOf<OkP<boolean | number>>()
        })

        test("mapOk(ResultP<boolean, string>, (boolean) => number): ResultP<number, string>", () => {
            expectTypeOf(mapOk(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as number
            })).toEqualTypeOf<ResultP<number, string>>()
        })

        test("mapOk(ResultP<boolean, string>, (boolean) => Promise<number>): ResultP<number, string>", () => {
            expectTypeOf(mapOk(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Promise<number>
            })).toEqualTypeOf<ResultP<number, string>>()
        })

        test("mapOk(ResultP<boolean, string>, (boolean) => boolean | number): ResultP<boolean | number, string>", () => {
            expectTypeOf(mapOk(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | number
            })).toEqualTypeOf<ResultP<boolean | number, string>>()
        })

        test("mapOk(ResultP<boolean, string>, (boolean) => boolean | Promise<number>): ResultP<boolean | number, string>", () => {
            expectTypeOf(mapOk(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as boolean | Promise<number>
            })).toEqualTypeOf<ResultP<boolean | number, string>>()
        })
    })
})
