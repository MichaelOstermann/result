import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"
import { ok } from "../ok"

/**
 * Swaps the Ok and Err values of the `result`. An Ok becomes an Err and an Err becomes an Ok.
 *
 * @example
 * ```ts
 * // data-first
 * Result.flip(ok(5));
 * // Err<number>(5)
 *
 * Result.flip(err("fail"));
 * // Ok<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(ok(5), Result.flip());
 * // Err<number>(5)
 * ```
 */
export const flip: {
    (): <T extends Result>(result: T) => Result<InferErr<T>, InferOk<T>>
    <T extends Result>(result: T): Result<InferErr<T>, InferOk<T>>
} = dfdlT((result: Result): any => {
    return result.ok
        ? err(result.value)
        : ok(result.error)
}, 1)
