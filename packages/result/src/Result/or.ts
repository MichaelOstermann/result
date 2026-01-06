import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # or
 *
 * ```ts
 * function Result.or(
 *     a: Result<T, E>,
 *     b: Result<U, F>
 * ): Result<T | U, F>
 * ```
 *
 * Performs a logical OR operation on two results. Returns `a` if it's Ok, otherwise returns `b`.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.or(ok(1), ok(2));
 * // Ok<number>(1)
 *
 * Result.or(err("fail"), ok(2));
 * // Ok<number>(2)
 *
 * Result.or(err("fail1"), err("fail2"));
 * // Err<string>("fail2")
 * ```
 *
 * ```ts [data-last]
 * pipe(err("fail"), Result.or(ok(2)));
 * // Ok<number>(2)
 * ```
 *
 */
export const or: {
    <U extends Result>(b: U): <T extends Result>(a: T) => Result<InferOk<T> | InferOk<U>, InferErr<U>>
    <T extends Result, U extends Result>(a: T, b: U): Result<InferOk<T> | InferOk<U>, InferErr<U>>
} = dfdlT((a: Result, b: Result): any => {
    return a.ok ? a : b
}, 2)
