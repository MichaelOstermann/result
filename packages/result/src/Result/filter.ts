import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"

/**
 * Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with `void`. If the result is already an Err, returns it unchanged.
 *
 * Can be used for type narrowing.
 *
 * @example
 * ```ts
 * // data-first
 * Result.filter(ok(5), (x) => x > 3);
 * // Ok<number>(5)
 *
 * Result.filter(ok(1), (x) => x > 3);
 * // Err<void>
 *
 * Result.filter(err("fail"), (x) => x > 3);
 * // Err<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(
 *     ok(5),
 *     Result.filter((x) => x > 3),
 * );
 * // Ok<number>(5)
 * ```
 */
export const filter: {
    <T extends Result, U extends InferOk<T>>(
        predicate: (value: InferOk<T>) => value is U,
    ): (result: T) => Result<U, InferErr<T> | void>

    <T extends Result>(
        predicate: (value: InferOk<T>) => boolean,
    ): (result: T) => Result<InferOk<T>, InferErr<T> | void>

    <T extends Result, U extends InferOk<T>>(
        result: T,
        predicate: (value: InferOk<T>) => value is U,
    ): Result<U, InferErr<T> | void>

    <T extends Result>(
        result: T,
        predicate: (value: InferOk<T>) => boolean,
    ): Result<InferOk<T>, InferErr<T> | void>
} = dfdlT((result: Result, predicate: any): any => {
    if (!result.ok) return result
    if (predicate(result.value)) return result
    return err()
}, 2)
