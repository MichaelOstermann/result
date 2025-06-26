import type { Result, ResultP } from "../src/types"
import { describe, expect, expectTypeOf, test } from "vitest"
import { err } from "../src/err"
import { ok } from "../src/ok"
import { okOrThrow } from "../src/okOrThrow"

describe("okOrThrow", () => {
    describe("implementation", () => {
        test("should return Ok<T>", () => {
            expect(okOrThrow(ok(0))).toBe(0)
        })

        test("should return OkP<T>", async () => {
            await expect(okOrThrow(Promise.resolve(ok(0)))).resolves.toBe(0)
        })

        test("should throw Err<T>", () => {
            expect(() => okOrThrow(err("failed"))).toThrow("failed")
        })

        test("should throw ErrP<T>", async () => {
            await expect(okOrThrow(Promise.resolve(err("failed")))).rejects.toThrow("failed")
        })
    })

    describe("types", () => {
        test("okOrThrow(Ok<boolean>): boolean", () => {
            expectTypeOf(okOrThrow(ok(true))).toEqualTypeOf<boolean>()
        })

        test("okOrThrow(Err<boolean>): never", () => {
            try {
                expectTypeOf(okOrThrow(err(true))).toEqualTypeOf<never>()
            }
            // eslint-disable-next-line unused-imports/no-unused-vars
            catch (_error) {}
        })

        test("okOrThrow(Result<boolean, string>): boolean", () => {
            expectTypeOf(okOrThrow(ok(true) as Result<boolean, string>)).toEqualTypeOf<boolean>()
        })

        test("okOrThrow(OkP<boolean>): Promise<boolean>", () => {
            expectTypeOf(okOrThrow(Promise.resolve(ok(true)))).toEqualTypeOf<Promise<boolean>>()
        })

        test("okOrThrow(ErrP<boolean>): Promise<never>", async () => {
            const p = okOrThrow(Promise.resolve(err(true)))
            try {
                await expectTypeOf(p).toEqualTypeOf<Promise<never>>()
                await p
            }
            // eslint-disable-next-line unused-imports/no-unused-vars
            catch (_error) {}
        })

        test("okOrThrow(ResultP<boolean, string>): Promise<boolean>", () => {
            expectTypeOf(okOrThrow(Promise.resolve(ok(true)) as ResultP<boolean, string>)).toEqualTypeOf<Promise<boolean>>()
        })
    })
})
