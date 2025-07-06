import type { Ok } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { isResult } from "./isResult"

/**
 * A function that takes an `unknown` value and narrows it to `Ok<unknown>`.
 *
 * ```ts
 * isOk(ok(true)); //=> true
 * isOk(err(false)); //=> false
 * isOk(true); //=> false
 *
 * pipe(ok(true), isOk()); //=> true
 * pipe(err(false), isOk()); //=> false
 * pipe(true, isOk()); //=> false
 * ```
 */
export const isOk: {
    (): (value: unknown) => value is Ok<unknown>
    (value: unknown): value is Ok<unknown>
} = dfdlT((value: unknown): value is Ok<unknown> => {
    return isResult(value) && value.ok
})
