import type { InferErr, ResultLike, SimplifyResult } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { mapP } from "./internals"

/**
 * Allows you to peek into the `Err` value of a `Result`, triggering a side-effect while ignoring the output.
 *
 * If the result is an `Ok`, this has no effect.
 *
 * ```ts
 * tapErr(err("message"), (msg) => console.log(msg)); //=> err("message")
 * tapErr(errP("message"), async (msg) => console.log(msg)); //=> err("message")
 *
 * pipe(err("message"), (msg) => console.log(msg)); //=> err("message")
 * pipe(errP("message"), async (msg) => console.log(msg)); //=> err("message")
 * ```
 */
export const tapErr: {
    <T extends ResultLike>(tap: (error: InferErr<T>) => unknown): (result: T) => SimplifyResult<T>
    <T extends ResultLike>(result: T, tap: (error: InferErr<T>) => unknown): SimplifyResult<T>
} = dfdlT((result: any, tap: any): any => {
    mapP(result, (result: any) => !result.ok && tap(result.error))
    return result
})
