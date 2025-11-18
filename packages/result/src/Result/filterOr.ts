import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"

/**
 * Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with the `or` value. If the result is already an Err, returns it unchanged.
 *
 * Can be used for type narrowing.
 *
 * @example
 * ```ts
 * // data-first
 * Result.filterOr(ok(5), (x) => x > 3, "too small");
 * // Ok<number>(5)
 *
 * Result.filterOr(ok(1), (x) => x > 3, "too small");
 * // Err<string>("too small")
 *
 * Result.filterOr(err("fail"), (x) => x > 3, "too small");
 * // Err<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(
 *     ok(1),
 *     Result.filterOr((x) => x > 3, "too small"),
 * );
 * // Err<string>("too small")
 * ```
 */
export const filterOr: {
    <T extends Result, U extends InferOk<T>, V>(
        predicate: (value: InferOk<T>) => value is U,
        or: V
    ): (result: T) => Result<U, InferErr<T> | V>

    <T extends Result, V>(
        predicate: (value: InferOk<T>) => boolean,
        or: V
    ): (result: T) => Result<InferOk<T>, InferErr<T> | V>

    <T extends Result, U extends InferOk<T>, V>(
        result: T,
        predicate: (value: InferOk<T>) => value is U,
        or: V
    ): Result<U, InferErr<T> | V>

    <T extends Result, V>(
        result: T,
        predicate: (value: InferOk<T>) => boolean,
        or: V
    ): Result<InferOk<T>, InferErr<T> | V>
} = dfdlT((result: Result, predicate: any, or: any): any => {
    if (!result.ok) return result
    if (predicate(result.value)) return result
    return err(or)
}, 3)
