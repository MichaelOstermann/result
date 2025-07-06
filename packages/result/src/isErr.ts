import type { Err } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { isResult } from "./isResult"

/**
 * A function that takes an `unknown` value and narrows it to `Err<unknown>`.
 *
 * ```ts
 * isErr(ok(true)); //=> false
 * isErr(err(false)); //=> true
 * isErr(true); //=> false
 *
 * pipe(ok(true), isErr()); //=> false
 * pipe(err(false), isErr()); //=> true
 * pipe(true, isErr()); //=> false
 * ```
 */
export const isErr: {
    (): (value: unknown) => value is Err<unknown>
    (value: unknown): value is Err<unknown>
} = dfdlT((value: unknown): value is Err<unknown> => {
    return isResult(value) && !value.ok
})
