import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err.js"
import { ok } from "../src/ok.js"
import { orElse } from "../src/orElse.js"
import type { Ok, Err, Result, OkP, ErrP, ResultP } from "../src/types.js"

describe("orElse", () => {
    describe("implementation", () => {
        test("should transform Err<T>", () => {
            expect(orElse(err(0), v => ok(v + 1))).toEqual(ok(1))
            expect(orElse(err(0), v => err(v + 1))).toEqual(err(1))
        })

        test("should transform ErrP<T>", async () => {
            await expect(orElse(Promise.resolve(err(0)), v => ok(v + 1))).resolves.toEqual(ok(1))
            await expect(orElse(Promise.resolve(err(0)), v => err(v + 1))).resolves.toEqual(err(1))
        })

        test("should transform ErrP<T>", async () => {
            await expect(orElse(Promise.resolve(err(0)), async v => ok(v + 1))).resolves.toEqual(ok(1))
            await expect(orElse(Promise.resolve(err(0)), async v => err(v + 1))).resolves.toEqual(err(1))
        })

        test("should not touch Ok<T>", () => {
            expect(orElse(ok(0), () => err(1))).toEqual(ok(0))
        })

        test("should not touch OkP<T>", async () => {
            await expect(orElse(Promise.resolve(ok(0)), () => err(1))).resolves.toEqual(ok(0))
        })
    })

    describe("types", () => {
        test("orElse(Err<boolean>, (boolean) => Ok<number>): Ok<number>", () => {
            expectTypeOf(orElse(err(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Ok<number>
            })).toEqualTypeOf<Ok<number>>()
        })

        test("orElse(Err<boolean>, (boolean) => Err<number>): Err<number>", () => {
            expectTypeOf(orElse(err(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Err<number>
            })).toEqualTypeOf<Err<number>>()
        })

        test("orElse(Err<boolean>, (boolean) => Result<number, number>): Result<number, number>", () => {
            expectTypeOf(orElse(err(true), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Result<number, number>
            })).toEqualTypeOf<Result<number, number>>()
        })

        test("orElse(Result<boolean, string>, (boolean) => Ok<number>): Ok<boolean | number>", () => {
            expectTypeOf(orElse(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as Ok<number>
            })).toEqualTypeOf<Ok<boolean | number>>()
        })

        test("orElse(Result<boolean, string>, (boolean) => Err<number>): Result<boolean, number>", () => {
            expectTypeOf(orElse(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as Err<number>
            })).toEqualTypeOf<Result<boolean, number>>()
        })

        test("orElse(Result<boolean, string>, (boolean) => Result<number, number>): Result<boolean | number, number>", () => {
            expectTypeOf(orElse(ok(true) as Result<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as Result<number, number>
            })).toEqualTypeOf<Result<boolean | number, number>>()
        })

        test("orElse(ErrP<boolean>, (boolean) => Ok<number>): OkP<number>", () => {
            expectTypeOf(orElse(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Ok<number>
            })).toEqualTypeOf<OkP<number>>()
        })

        test("orElse(ErrP<boolean>, (boolean) => OkP<number>): OkP<number>", () => {
            expectTypeOf(orElse(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as OkP<number>
            })).toEqualTypeOf<OkP<number>>()
        })

        test("orElse(ErrP<boolean>, (boolean) => Err<number>): ErrP<number>", () => {
            expectTypeOf(orElse(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Err<number>
            })).toEqualTypeOf<ErrP<number>>()
        })

        test("orElse(ErrP<boolean>, (boolean) => ErrP<number>): ErrP<number>", () => {
            expectTypeOf(orElse(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as ErrP<number>
            })).toEqualTypeOf<ErrP<number>>()
        })

        test("orElse(ErrP<boolean>, (boolean) => Result<number, number>): ResultP<number, number>", () => {
            expectTypeOf(orElse(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as Result<number, number>
            })).toEqualTypeOf<ResultP<number, number>>()
        })

        test("orElse(ErrP<boolean>, (boolean) => ResultP<number, number>): ResultP<number, number>", () => {
            expectTypeOf(orElse(Promise.resolve(err(true)), (v) => {
                expectTypeOf(v).toEqualTypeOf<boolean>()
                return v as unknown as ResultP<number, number>
            })).toEqualTypeOf<ResultP<number, number>>()
        })

        test("orElse(ResultP<boolean, string>, (boolean) => Ok<number>): OkP<boolean | number>", () => {
            expectTypeOf(orElse(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as Ok<number>
            })).toEqualTypeOf<OkP<boolean | number>>()
        })

        test("orElse(ResultP<boolean, string>, (boolean) => OkP<number>): OkP<boolean | number>", () => {
            expectTypeOf(orElse(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as OkP<number>
            })).toEqualTypeOf<OkP<boolean | number>>()
        })

        test("orElse(ResultP<boolean, string>, (boolean) => Err<number>): ResultP<boolean, number>", () => {
            expectTypeOf(orElse(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as Err<number>
            })).toEqualTypeOf<ResultP<boolean, number>>()
        })

        test("orElse(ResultP<boolean, string>, (boolean) => ErrP<number>): ResultP<boolean, number>", () => {
            expectTypeOf(orElse(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as ErrP<number>
            })).toEqualTypeOf<ResultP<boolean, number>>()
        })

        test("orElse(ResultP<boolean, string>, (boolean) => Result<number, number>): ResultP<boolean | number, number>", () => {
            expectTypeOf(orElse(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as Result<number, number>
            })).toEqualTypeOf<ResultP<boolean | number, number>>()
        })

        test("orElse(ResultP<boolean, string>, (boolean) => ResultP<number, number>): ResultP<boolean | number, number>", () => {
            expectTypeOf(orElse(Promise.resolve(ok(true)) as ResultP<boolean, string>, (v) => {
                expectTypeOf(v).toEqualTypeOf<string>()
                return v as unknown as ResultP<number, number>
            })).toEqualTypeOf<ResultP<boolean | number, number>>()
        })
    })
})
