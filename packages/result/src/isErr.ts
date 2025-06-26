import type { Err } from "./types"
import { dual } from "@monstermann/dfdl"
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
} = dual(1, (value: unknown): value is Err<unknown> => {
    return isResult(value) && !value.ok
})
