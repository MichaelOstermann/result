import type { Err } from "./Result/types"
import { dfdl } from "@monstermann/dfdl"
import { isResult } from "./isResult"

/**
 * Returns `true` if the `result` is an Err, `false` otherwise.
 *
 * @example
 * ```ts
 * isErr(err("fail"));
 * // true
 *
 * isErr(ok(42));
 * // false
 * ```
 */
export const isErr = dfdl((value: unknown): value is Err => {
    return isResult(value) && !value.ok
}, 1)
