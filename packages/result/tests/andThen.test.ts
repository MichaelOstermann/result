import { describe, expect, expectTypeOf, test } from "vitest"
import { andThen } from "../src/andThen.js"
import { err } from "../src/err.js"
import { ok } from "../src/ok.js"
import type { Ok, Err, Result, OkP, ErrP, ResultP } from "../src/types.js"

describe("andThen", () => {
    describe("implementation", () => {
        test("should transform Ok<T>", () => {
            expect(andThen(ok(0), v => ok(v + 1))).toEqual(ok(1))
            expect(andThen(ok(0), v => err(v + 1))).toEqual(err(1))
        })

        test("should transform OkP<T>", async () => {
            await expect(andThen(Promise.resolve(ok(0)), v => ok(v + 1))).resolves.toEqual(ok(1))
            await expect(andThen(Promise.resolve(ok(0)), v => err(v + 1))).resolves.toEqual(err(1))
        })

        test("should transform OkP<T>", async () => {
            await expect(andThen(Promise.resolve(ok(0)), async v => ok(v + 1))).resolves.toEqual(ok(1))
            await expect(andThen(Promise.resolve(ok(0)), async v => err(v + 1))).resolves.toEqual(err(1))
        })

        test("should not touch Err<T>", () => {
            expect(andThen(err(0), () => ok(1))).toEqual(err(0))
        })

        test("should not touch ErrP<T>", async () => {
            await expect(andThen(Promise.resolve(err(0)), () => ok(1))).resolves.toEqual(err(0))
        })
    })

    describe("types", () => {
        test("andThen(Ok<boolean>, (boolean) => Ok<number>): Ok<number>", () => {
            expectTypeOf(andThen(ok(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Ok<number>
            })).toEqualTypeOf<Ok<number>>()
        })

        test("andThen(Ok<boolean>, (boolean) => Err<number>): Err<number>", () => {
            expectTypeOf(andThen(ok(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Err<number>
            })).toEqualTypeOf<Err<number>>()
        })

        test("andThen(Ok<boolean>, (boolean) => Result<number, number>): Result<number, number>", () => {
            expectTypeOf(andThen(ok(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Result<number, number>
            })).toEqualTypeOf<Result<number, number>>()
        })

        test("andThen(Result<boolean, string>, (boolean) => Ok<number>): Result<number, string>", () => {
            expectTypeOf(andThen(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Ok<number>
            })).toEqualTypeOf<Result<number, string>>()
        })

        test("andThen(Result<boolean, string>, (boolean) => Err<number>): Err<string | number>", () => {
            expectTypeOf(andThen(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Err<number>
            })).toEqualTypeOf<Err<string | number>>()
        })

        test("andThen(Result<boolean, string>, (boolean) => Result<number, number>): Result<number, string | number>", () => {
            expectTypeOf(andThen(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Result<number, number>
            })).toEqualTypeOf<Result<number, string | number>>()
        })

        test("andThen(OkP<boolean>, (boolean) => Ok<number>): OkP<number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Ok<number>
            })).toEqualTypeOf<OkP<number>>()
        })

        test("andThen(OkP<boolean>, (boolean) => OkP<number>): OkP<number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as OkP<number>
            })).toEqualTypeOf<OkP<number>>()
        })

        test("andThen(OkP<boolean>, (boolean) => ErrP<number>): ErrP<number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as ErrP<number>
            })).toEqualTypeOf<ErrP<number>>()
        })

        test("andThen(OkP<boolean>, (boolean) => Result<number, number>): ResultP<number, number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Result<number, number>
            })).toEqualTypeOf<ResultP<number, number>>()
        })

        test("andThen(OkP<boolean>, (boolean) => ResultP<number, number>): ResultP<number, number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as ResultP<number, number>
            })).toEqualTypeOf<ResultP<number, number>>()
        })

        test("andThen(ResultP<boolean, string>, (boolean) => Ok<number>): ResultP<number, string>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Ok<number>
            })).toEqualTypeOf<ResultP<number, string>>()
        })

        test("andThen(ResultP<boolean, string>, (boolean) => OkP<number>): ResultP<number, string>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as OkP<number>
            })).toEqualTypeOf<ResultP<number, string>>()
        })

        test("andThen(ResultP<boolean, string>, (boolean) => Err<number>): ErrP<string | number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Err<number>
            })).toEqualTypeOf<ErrP<string | number>>()
        })

        test("andThen(ResultP<boolean, string>, (boolean) => ErrP<number>): ErrP<string | number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as ErrP<number>
            })).toEqualTypeOf<ErrP<string | number>>()
        })

        test("andThen(ResultP<boolean, string>, (boolean) => Result<number, number>): ResultP<number, string | number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Result<number, number>
            })).toEqualTypeOf<ResultP<number, string | number>>()
        })

        test("andThen(ResultP<boolean, string>, (boolean) => ResultP<number, number>): ResultP<number, string | number>", () => {
            expectTypeOf(andThen(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as ResultP<number, number>
            })).toEqualTypeOf<ResultP<number, string | number>>()
        })
    })
})
