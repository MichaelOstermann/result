import type { Err, ErrP, ResultLike, SimplifyResult } from "./types"
import { mapP } from "./internals"
import { isResult } from "./isResult"

/**
 * - Casts `T` into `Err<T>`
 * - Casts `Promise<T>` into `ErrP<T>`
 * - Forwards any `Result` type as-is
 *
 * ```ts
 * err(true); //=> Err<boolean>
 * err(Promise.resolve(true)); //=> ErrP<boolean>
 * err(ok(true)); //=> Ok<boolean>
 * err(err(true)); //=> Err<boolean>
 * err(okP(true)); //=> OkP<boolean>
 * err(errP(true)); //=> ErrP<boolean>
 * ```
 */
export function err(error: void): Err<void>
export function err<T>(error: T): ErrOrForwardResult<T>
export function err(error: unknown): unknown {
    return mapP(error, (error: any) => isResult(error) ? error : { error, ok: false })
}

type ErrOrForwardResult<T> = SimplifyResult<T extends unknown
    ? T extends ResultLike
        ? T
        : T extends Promise<infer U>
            ? ErrP<U>
            : Err<T>
    : never>
