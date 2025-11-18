import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Performs a logical AND operation on two results. Returns `b` if `a` is Ok, otherwise returns `a` (which must be an Err).
 *
 * @example
 * ```ts
 * // data-first
 * Result.and(ok(1), ok("success"));
 * // Ok<string>("success")
 *
 * Result.and(err("fail"), ok("success"));
 * // Err<string>("fail")
 *
 * Result.and(ok(1), err("fail"));
 * // Err<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(ok(1), Result.and(ok("success")));
 * // Ok<string>("success")
 * ```
 */
export const and: {
    <U extends Result>(b: U): <T extends Result>(a: T) => Result<InferOk<U>, InferErr<T> | InferErr<U>>
    <T extends Result, U extends Result>(a: T, b: U): Result<InferOk<U>, InferErr<T> | InferErr<U>>
} = dfdlT((a: Result, b: Result): any => {
    if (!b.ok) return b
    if (!a.ok) return a
    return b
}, 2)
