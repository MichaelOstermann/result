import type { Err, Ok } from "./Result/types"
import { isResult } from "./isResult"

/**
 * Creates an Ok result containing the given `value`. If the `value` is already a Result, it returns it unchanged.
 *
 * @example
 * ```ts
 * ok();
 * // Ok<void>
 *
 * ok(42);
 * // Ok<number>
 *
 * ok("hello");
 * // Ok<string>
 *
 * ok(ok(true));
 * // Ok<boolean>
 *
 * ok(err("fail"));
 * // Err<string>
 * ```
 */
export function ok(value: void): Ok<void>
export function ok<T>(value: Ok<T>): Ok<T>
export function ok<T>(value: Err<T>): Err<T>
export function ok<T>(value: T): Ok<T>
export function ok(value: unknown): unknown {
    return isResult(value) ? value : { ok: true, value }
}
