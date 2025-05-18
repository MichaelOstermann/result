import { dual } from "@monstermann/dfdl"
import type { InferOk, ResultLike, SimplifyResult } from "./types.js"
import { mapP } from "./internals.js"

/**
 * Allows you to peek into the `Ok` value of a `Result`, triggering a side-effect while ignoring the output.
 *
 * If the result is an `Err`, this has no effect.
 *
 * ```ts
 * tapOk(ok(true), (v) => console.log(v)); //=> ok(true)
 * tapOk(okP(true), async (v) => console.log(v)); //=> ok(true)
 *
 * pipe(ok(true), (v) => console.log(v)); //=> ok(true)
 * pipe(okP(true), async (v) => console.log(v)); //=> ok(true)
 * ```
 */
export const tapOk: {
    <T extends ResultLike>(tap: (value: InferOk<T>) => unknown): (result: T) => SimplifyResult<T>
    <T extends ResultLike>(result: T, tap: (value: InferOk<T>) => unknown): SimplifyResult<T>
} = dual(2, (result: any, tap: any): any => {
    mapP(result, (result: any) => result.ok && tap(result.value))
    return result
})
