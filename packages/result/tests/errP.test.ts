import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err.js"
import { ok } from "../src/ok.js"
import type { ErrP, OkP, Result, ResultP } from "../src/types.js"
import { errP } from "../src/errP.js"

describe("errP", () => {
    describe("implementation", () => {
        test("errP(boolean): ErrP<boolean>", async () => {
            await expect(errP(true)).resolves.toEqual({ ok: false, error: true })
        })

        test("errP(Promise<boolean>): ErrP<boolean>", async () => {
            await expect(errP(Promise.resolve(true))).resolves.toEqual({ ok: false, error: true })
        })

        test("errP(Err<boolean>): ErrP<boolean>", async () => {
            await expect(errP(err(true))).resolves.toEqual({ ok: false, error: true })
        })

        test("errP(Ok<boolean>): OkP<boolean>", async () => {
            await expect(errP(ok(true))).resolves.toEqual({ ok: true, value: true })
        })

        test("errP(ErrP<boolean>): ErrP<boolean>", async () => {
            await expect(errP(Promise.resolve(err(true)))).resolves.toEqual({ ok: false, error: true })
        })

        test("errP(OkP<boolean>): OkP<boolean>", async () => {
            await expect(errP(Promise.resolve(ok(true)))).resolves.toEqual({ ok: true, value: true })
        })
    })

    describe("types", () => {
        test("errP(boolean): ErrP<boolean>", () => {
            expectTypeOf(errP(true)).toEqualTypeOf<ErrP<boolean>>()
        })

        test("errP(Promise<boolean>): ErrP<boolean>", () => {
            expectTypeOf(errP(Promise.resolve(true))).toEqualTypeOf<ErrP<boolean>>()
        })

        test("errP(Err<T>): ErrP<T>", () => {
            expectTypeOf(errP(err(true))).toEqualTypeOf<ErrP<boolean>>()
        })

        test("errP(ErrP<T>): ErrP<T>", () => {
            expectTypeOf(errP(Promise.resolve(err(true)))).toEqualTypeOf<ErrP<boolean>>()
        })

        test("errP(Ok<T>): OkP<T>", () => {
            expectTypeOf(errP(ok(true))).toEqualTypeOf<OkP<boolean>>()
        })

        test("errP(OkP<T>): OkP<T>", () => {
            expectTypeOf(errP(Promise.resolve(ok(true)))).toEqualTypeOf<OkP<boolean>>()
        })

        test("errP(Result<unknown, boolean>): ResultP<unknown, boolean>", () => {
            expectTypeOf(errP(err(true) as Result<unknown, boolean>)).toEqualTypeOf<ResultP<unknown, boolean>>()
        })

        test("errP(ResultP<unknown, boolean>): ResultP<unknown, boolean>", () => {
            expectTypeOf(errP(Promise.resolve(err(true)) as ResultP<unknown, boolean>)).toEqualTypeOf<ResultP<unknown, boolean>>()
        })
    })
})
