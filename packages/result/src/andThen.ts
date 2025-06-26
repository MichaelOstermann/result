import type { SimplifyResultAsync, SimplifyResultSync } from "./internals"
import type { InferErr, InferOk, Result, ResultLike, ResultP } from "./types"
import { dual } from "@monstermann/dfdl"
import { mapP } from "./internals"

/**
 * Transforms a `Result` into another one by applying the provided function to the `Ok` value and returning its result as-is.
 *
 * If the result is an `Err`, it is returned unchanged.
 *
 * ```ts
 * andThen(ok(0), (num) => ok(num + 1)); //=> ok(1)
 * andThen(ok(0), (num) => err(num + 1)); //=> err(1)
 * andThen(okP(0), async (num) => ok(num + 1)); //=> okP(1)
 * andThen(okP(0), async (num) => err(num + 1)); //=> errP(1)
 * andThen(okP(0), async (num) => okP(num + 1)); //=> okP(1)
 * andThen(okP(0), async (num) => errP(num + 1)); //=> errP(1)
 *
 * pipe(
 *     ok(0),
 *     andThen((num) => ok(num + 1)),
 * ); //=> ok(1)
 *
 * pipe(
 *     ok(0),
 *     andThen((num) => err(num + 1)),
 * ); //=> err(1)
 *
 * pipe(
 *     okP(0),
 *     andThen(async (num) => ok(num + 1)),
 * ); //=> okP(1)
 *
 * pipe(
 *     okP(0),
 *     andThen(async (num) => err(num + 1)),
 * ); //=> errP(1)
 *
 * pipe(
 *     okP(0),
 *     andThen(async (num) => okP(num + 1)),
 * ); //=> okP(1)
 *
 * pipe(
 *     okP(0),
 *     andThen(async (num) => errP(num + 1)),
 * ); //=> errP(1)
 * ```
 */
export const andThen: {
    <T extends Result, U extends Result>(andThen: (value: InferOk<T>) => U): (result: T) => SimplifyResultSync<Result<InferOk<U>, InferErr<T> | InferErr<U>>>
    <T extends ResultP, U extends ResultLike>(andThen: (value: InferOk<T>) => U): (result: T) => SimplifyResultAsync<ResultP<InferOk<U>, InferErr<T> | InferErr<U>>>

    <T extends Result, U extends Result>(result: T, andThen: (value: InferOk<T>) => U): SimplifyResultSync<Result<InferOk<U>, InferErr<T> | InferErr<U>>>
    <T extends ResultP, U extends ResultLike>(result: T, andThen: (value: InferOk<T>) => U): SimplifyResultAsync<ResultP<InferOk<U>, InferErr<T> | InferErr<U>>>
} = dual(2, (result: any, andThen: any): any => {
    return mapP(result, (result: any) => !result.ok ? result : andThen(result.value))
})
