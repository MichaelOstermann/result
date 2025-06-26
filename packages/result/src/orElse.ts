import type { SimplifyResultAsync } from "./internals"
import type { InferErr, InferOk, Result, ResultLike, ResultP, SimplifyResult } from "./types"
import { dual } from "@monstermann/dfdl"
import { mapP } from "./internals"

/**
 * Transforms a `Result` into another one by applying the provided function to the `Err` value and returning its result as-is.
 *
 * If the result is an `Ok`, it is returned unchanged.
 *
 * ```ts
 * orElse(err(0), (num) => ok(num + 1)); //=> ok(1)
 * orElse(err(0), (num) => err(num + 1)); //=> err(1)
 * orElse(errP(0), async (num) => ok(num + 1)); //=> okP(1)
 * orElse(errP(0), async (num) => err(num + 1)); //=> errP(1)
 * orElse(errP(0), async (num) => okP(num + 1)); //=> okP(1)
 * orElse(errP(0), async (num) => errP(num + 1)); //=> errP(1)
 *
 * pipe(
 *     err(0),
 *     orElse((num) => ok(num + 1)),
 * ); //=> ok(1)
 *
 * pipe(
 *     err(0),
 *     orElse((num) => err(num + 1)),
 * ); //=> err(1)
 *
 * pipe(
 *     errP(0),
 *     orElse(async (num) => ok(num + 1)),
 * ); //=> okP(1)
 *
 * pipe(
 *     errP(0),
 *     orElse(async (num) => err(num + 1)),
 * ); //=> errP(1)
 *
 * pipe(
 *     errP(0),
 *     orElse(async (num) => okP(num + 1)),
 * ); //=> okP(1)
 *
 * pipe(
 *     errP(0),
 *     orElse(async (num) => errP(num + 1)),
 * ); //=> errP(1)
 * ```
 */
export const orElse: {
    <T extends Result, U extends Result>(orElse: (error: InferErr<T>) => U): (result: T) => SimplifyResult<Result<InferOk<T> | InferOk<U>, InferErr<U>>>
    <T extends ResultP, U extends ResultLike>(orElse: (error: InferErr<T>) => U): (result: T) => SimplifyResultAsync<ResultP<InferOk<T> | InferOk<U>, InferErr<U>>>

    <T extends Result, U extends Result>(result: T, orElse: (error: InferErr<T>) => U): SimplifyResult<Result<InferOk<T> | InferOk<U>, InferErr<U>>>
    <T extends ResultP, U extends ResultLike>(result: T, orElse: (error: InferErr<T>) => U): SimplifyResultAsync<ResultP<InferOk<T> | InferOk<U>, InferErr<U>>>
} = dual(2, (result: any, orElse: any): any => {
    return mapP(result, (result: any) => result.ok ? result : orElse(result.error))
})
