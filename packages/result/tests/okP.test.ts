import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err.js"
import { ok } from "../src/ok.js"
import type { Result, OkP, ErrP, ResultP } from "../src/types.js"
import { okP } from "../src/okP.js"

describe("okP", () => {
    describe("implementation", () => {
        test("okP(boolean): OkP<boolean>", async () => {
            await expect(okP(true)).resolves.toEqual({ ok: true, value: true })
        })

        test("okP(Promise<boolean>): OkP<boolean>", async () => {
            await expect(okP(Promise.resolve(true))).resolves.toEqual({ ok: true, value: true })
        })

        test("okP(Err<boolean>): ErrP<boolean>", async () => {
            await expect(okP(err(true))).resolves.toEqual({ ok: false, error: true })
        })

        test("okP(ErrP<boolean>): ErrP<boolean>", async () => {
            await expect(okP(Promise.resolve(err(true)))).resolves.toEqual({ ok: false, error: true })
        })

        test("okP(Ok<boolean>): OkP<boolean>", async () => {
            await expect(okP(ok(true))).resolves.toEqual({ ok: true, value: true })
        })

        test("okP(OkP<boolean>): OkP<boolean>", async () => {
            await expect(okP(Promise.resolve(ok(true)))).resolves.toEqual({ ok: true, value: true })
        })
    })

    describe("types", () => {
        test("okP(boolean): OkP<boolean>", () => {
            expectTypeOf(okP(true)).toEqualTypeOf<OkP<boolean>>()
        })

        test("okP(Promise<boolean>): OkP<boolean>", () => {
            expectTypeOf(okP(Promise.resolve(true))).toEqualTypeOf<OkP<boolean>>()
        })

        test("okP(Err<T>): ErrP<T>", () => {
            expectTypeOf(okP(err(true))).toEqualTypeOf<ErrP<boolean>>()
        })

        test("okP(ErrP<T>): ErrP<T>", () => {
            expectTypeOf(okP(Promise.resolve(err(true)))).toEqualTypeOf<ErrP<boolean>>()
        })

        test("okP(Ok<T>): OkP<T>", () => {
            expectTypeOf(okP(ok(true))).toEqualTypeOf<OkP<boolean>>()
        })

        test("okP(OkP<T>): OkP<T>", () => {
            expectTypeOf(okP(Promise.resolve(ok(true)))).toEqualTypeOf<OkP<boolean>>()
        })

        test("okP(Result<boolean, unknown>): ResultP<boolean, unknown>", () => {
            expectTypeOf(okP(ok(true) as Result<boolean, unknown>)).toEqualTypeOf<ResultP<boolean, unknown>>()
        })

        test("okP(ResultP<boolean, unknown>): ResultP<boolean, unknown>", () => {
            expectTypeOf(okP(Promise.resolve(ok(true)) as ResultP<boolean, unknown>)).toEqualTypeOf<ResultP<boolean, unknown>>()
        })
    })
})
