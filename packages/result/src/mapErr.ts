import type { SimplifyResultAsync, SimplifyResultSync } from "./internals"
import type { InferErr, InferOk, Result, ResultP } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { isP } from "./internals"

/**
 * Transforms a `Result<T, E>` into a `Result<T, U>` by applying the given function to the `Err` value.
 *
 * If the result is an `Ok`, it is returned unchanged.
 *
 * ```ts
 * mapErr(err(0), (num) => num + 1); //=> err(1)
 * mapErr(errP(0), async (num) => num + 1); //=> errP(1)
 *
 * pipe(
 *     err(0),
 *     mapErr((num) => num + 1),
 * ); //=> err(1)
 *
 * pipe(
 *     errP(0),
 *     mapErr(async (num) => num + 1),
 * ); //=> errP(1)
 * ```
 */
export const mapErr: {
    <T extends Result, U>(map: (error: InferErr<T>) => U): (result: T) => SimplifyResultSync<Result<InferOk<T>, U>>
    <T extends ResultP, U>(map: (error: InferErr<T>) => U): (result: T) => SimplifyResultAsync<ResultP<InferOk<T>, Awaited<U>>>

    <T extends Result, U>(result: T, map: (error: InferErr<T>) => U): SimplifyResultSync<Result<InferOk<T>, U>>
    <T extends ResultP, U>(result: T, map: (error: InferErr<T>) => U): SimplifyResultAsync<ResultP<InferOk<T>, Awaited<U>>>
} = dfdlT((result: any, map: any): any => {
    return isP(result)
        ? result.then(async (result: any) => result.ok ? result : { error: await map(result.error), ok: false })
        : result.ok ? result : { error: map(result.error), ok: false }
})
