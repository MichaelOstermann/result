import type { Err, ErrP, Ok, OkP, Result, ResultP } from "../src/types"
import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err"
import { ok } from "../src/ok"

describe("err", () => {
    describe("implementation", () => {
        test("err(boolean): Err<boolean>", () => {
            expect(err(true)).toEqual({ error: true, ok: false })
        })

        test("err(Promise<boolean>): ErrP<boolean>", async () => {
            await expect(err(Promise.resolve(true))).resolves.toEqual({ error: true, ok: false })
        })

        test("err(Err<boolean>): Err<boolean>", () => {
            expect(err(err(true))).toEqual({ error: true, ok: false })
        })

        test("err(Ok<boolean>): Ok<boolean>", () => {
            expect(err(ok(true))).toEqual({ ok: true, value: true })
        })

        test("err(ErrP<boolean>): ErrP<boolean>", async () => {
            await expect(err(Promise.resolve(err(true)))).resolves.toEqual({ error: true, ok: false })
        })

        test("err(OkP<boolean>): OkP<boolean>", async () => {
            await expect(err(Promise.resolve(ok(true)))).resolves.toEqual({ ok: true, value: true })
        })
    })

    describe("types", () => {
        test("err(boolean): Err<boolean>", () => {
            expectTypeOf(err(true)).toEqualTypeOf<Err<boolean>>()
        })

        test("err(Promise<boolean>): ErrP<boolean>", () => {
            expectTypeOf(err(Promise.resolve(true))).toEqualTypeOf<ErrP<boolean>>()
        })

        test("err(Err<T>): Err<T>", () => {
            expectTypeOf(err(err(true))).toEqualTypeOf<Err<boolean>>()
        })

        test("err(ErrP<T>): ErrP<T>", () => {
            expectTypeOf(err(Promise.resolve(err(true)))).toEqualTypeOf<ErrP<boolean>>()
        })

        test("err(Ok<T>): Ok<T>", () => {
            expectTypeOf(err(ok(true))).toEqualTypeOf<Ok<boolean>>()
        })

        test("err(OkP<T>): OkP<T>", () => {
            expectTypeOf(err(Promise.resolve(ok(true)))).toEqualTypeOf<OkP<boolean>>()
        })

        test("err(Result<unknown, boolean>): Result<unknown, boolean>", () => {
            expectTypeOf(err(err(true) as Result<unknown, boolean>)).toEqualTypeOf<Result<unknown, boolean>>()
        })

        test("err(ResultP<unknown, boolean>): ResultP<unknown, boolean>", () => {
            expectTypeOf(err(Promise.resolve(err(true)) as ResultP<unknown, boolean>)).toEqualTypeOf<ResultP<unknown, boolean>>()
        })
    })
})
