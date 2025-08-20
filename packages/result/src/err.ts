import type { Err, Ok } from "./Result/types"
import { isResult } from "./isResult"

/**
 * Creates an Err result containing the given `error`. If the `error` is already a Result, it returns it unchanged.
 *
 * @example
 * ```ts
 * err();
 * // Err<void>
 *
 * err("failed");
 * // Err<string>
 *
 * err(404);
 * // Err<number>
 *
 * err(ok(true));
 * // Ok<boolean>
 *
 * err(err("fail"));
 * // Err<string>
 * ```
 */
export function err(error: void): Err<void>
export function err<T>(error: Ok<T>): Ok<T>
export function err<T>(error: Err<T>): Err<T>
export function err<T>(error: T): Err<T>
export function err(error: unknown): unknown {
    return isResult(error) ? error : { error, ok: false }
}
