import { dual } from "@monstermann/dfdl"
import type { SimplifyResultAsync, SimplifyResultSync } from "./internals.js"
import { isP } from "./internals.js"
import type { InferErr, InferOk, Result, ResultP } from "./types.js"

/**
 * Transforms a `Result<T, E>` into a `Result<U, E>` by applying the given function to the `Ok` value.
 *
 * If the result is an `Err`, it is returned unchanged.
 *
 * ```ts
 * mapOk(ok(0), (num) => num + 1); //=> ok(1)
 * mapOk(okP(0), async (num) => num + 1); //=> okP(1)
 *
 * pipe(
 *     ok(0),
 *     mapOk((num) => num + 1),
 * ); //=> ok(1)
 *
 * pipe(
 *     okP(0),
 *     mapOk(async (num) => num + 1),
 * ); //=> okP(1)
 * ```
 */
export const mapOk: {
    <T extends Result, U>(map: (value: InferOk<T>) => U): (result: T) => SimplifyResultSync<Result<U, InferErr<T>>>
    <T extends ResultP, U>(map: (value: InferOk<T>) => U): (result: T) => SimplifyResultAsync<ResultP<Awaited<U>, InferErr<T>>>

    <T extends Result, U>(result: T, map: (value: InferOk<T>) => U): SimplifyResultSync<Result<U, InferErr<T>>>
    <T extends ResultP, U>(result: T, map: (value: InferOk<T>) => U): SimplifyResultAsync<ResultP<Awaited<U>, InferErr<T>>>
} = dual(2, (result: any, map: any): any => {
    return isP(result)
        ? result.then(async (result: any) => !result.ok ? result : { ok: true, value: await map(result.value) })
        : !result.ok ? result : { ok: true, value: map(result.value) }
})
