import type { Result } from "./Result/types"
import { dfdl } from "@monstermann/dfdl"

/**
 * Returns `true` if the `value` is a Result (either Ok or Err), `false` otherwise.
 *
 * @example
 * ```ts
 * isResult(ok(42));
 * // true
 *
 * isResult(err("fail"));
 * // true
 *
 * isResult(42);
 * // false
 *
 * isResult("hello");
 * // false
 * ```
 */
export const isResult = dfdl((value: unknown): value is Result => {
    return typeof value === "object"
        && value !== null
        && "ok" in value
        && typeof value.ok === "boolean"
        && ("value" in value || "error" in value)
}, 1)
