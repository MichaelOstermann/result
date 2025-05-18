import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err.js"
import { ok } from "../src/ok.js"
import type { Ok, Err, Result, OkP, ErrP, ResultP } from "../src/types.js"

describe("ok", () => {
    describe("implementation", () => {
        test("ok(boolean): Ok<boolean>", () => {
            expect(ok(true)).toEqual({ ok: true, value: true })
        })

        test("ok(Promise<boolean>): OkP<boolean>", async () => {
            await expect(ok(Promise.resolve(true))).resolves.toEqual({ ok: true, value: true })
        })

        test("ok(Err<boolean>): Err<boolean>", () => {
            expect(ok(err(true))).toEqual({ ok: false, error: true })
        })

        test("ok(ErrP<boolean>): ErrP<boolean>", async () => {
            await expect(ok(Promise.resolve(err(true)))).resolves.toEqual({ ok: false, error: true })
        })

        test("ok(Ok<boolean>): Ok<boolean>", () => {
            expect(ok(ok(true))).toEqual({ ok: true, value: true })
        })

        test("ok(OkP<boolean>): OkP<boolean>", async () => {
            await expect(ok(Promise.resolve(ok(true)))).resolves.toEqual({ ok: true, value: true })
        })
    })

    describe("types", () => {
        test("ok(boolean): Ok<boolean>", () => {
            expectTypeOf(ok(true)).toEqualTypeOf<Ok<boolean>>()
        })

        test("ok(Promise<boolean>): OkP<boolean>", () => {
            expectTypeOf(ok(Promise.resolve(true))).toEqualTypeOf<OkP<boolean>>()
        })

        test("ok(Err<T>): Err<T>", () => {
            expectTypeOf(ok(err(true))).toEqualTypeOf<Err<boolean>>()
        })

        test("ok(ErrP<T>): ErrP<T>", () => {
            expectTypeOf(ok(Promise.resolve(err(true)))).toEqualTypeOf<ErrP<boolean>>()
        })

        test("ok(Ok<T>): Ok<T>", () => {
            expectTypeOf(ok(ok(true))).toEqualTypeOf<Ok<boolean>>()
        })

        test("ok(OkP<T>): OkP<T>", () => {
            expectTypeOf(ok(Promise.resolve(ok(true)))).toEqualTypeOf<OkP<boolean>>()
        })

        test("ok(Result<boolean, unknown>): Result<boolean, unknown>", () => {
            expectTypeOf(ok(ok(true) as Result<boolean, unknown>)).toEqualTypeOf<Result<boolean, unknown>>()
        })

        test("ok(ResultP<boolean, unknown>): ResultP<boolean, unknown>", () => {
            expectTypeOf(ok(Promise.resolve(ok(true)) as ResultP<boolean, unknown>)).toEqualTypeOf<ResultP<boolean, unknown>>()
        })
    })
})
