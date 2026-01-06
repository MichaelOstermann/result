import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # and
 *
 * ```ts
 * function ResultAsync.and(
 *     a: AwaitableResult<T, E>,
 *     b: AwaitableResult<U, F>
 * ): ResultAsync<U, E | F>
 * ```
 *
 * Performs a logical AND operation on two results. Returns `b` if `a` is Ok, otherwise returns `a` (which must be an Err).
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.and(ok(1), ok("success"));
 * // Ok<string>("success")
 *
 * await ResultAsync.and(err("fail"), ok("success"));
 * // Err<string>("fail")
 *
 * await ResultAsync.and(ok(1), err("fail"));
 * // Err<string>("fail")
 * ```
 *
 * ```ts [data-last]
 * await pipe(ok(1), ResultAsync.and(ok("success")));
 * // Ok<string>("success")
 * ```
 *
 */
export const and: {
    <U extends AwaitableResult>(b: U): <T extends AwaitableResult>(a: T) => ResultAsync<InferOk<U>, InferErr<T> | InferErr<U>>
    <T extends AwaitableResult, U extends AwaitableResult>(a: T, b: U): ResultAsync<InferOk<U>, InferErr<T> | InferErr<U>>
} = dfdlT(async (a: AwaitableResult, b: AwaitableResult): Promise<any> => {
    if (!(await b).ok) return b
    if (!(await a).ok) return a
    return b
}, 2)
