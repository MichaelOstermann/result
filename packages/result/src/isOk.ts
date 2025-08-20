import type { Ok } from "./Result/types"
import { dfdl } from "@monstermann/dfdl"
import { isResult } from "./isResult"

/**
 * Returns `true` if the `result` is an Ok, `false` otherwise.
 *
 * @example
 * ```ts
 * isOk(ok(42));
 * // true
 *
 * isOk(err("fail"));
 * // false
 * ```
 */
export const isOk = dfdl((value: unknown): value is Ok => {
    return isResult(value) && value.ok
}, 1)
