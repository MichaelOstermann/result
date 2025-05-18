import { mapP } from "./internals.js"
import { isResult } from "./isResult.js"
import type { Ok, OkP, ResultLike, SimplifyResult } from "./types.js"

/**
 * - Casts `T` into `Ok<T>`
 * - Casts `Promise<T>` into `OkP<T>`
 * - Forwards any `Result` type as-is
 *
 * ```ts
 * ok(true); //=> Ok<boolean>
 * ok(Promise.resolve(true)); //=> OkP<boolean>
 * ok(ok(true)); //=> Ok<boolean>
 * ok(err(true)); //=> Err<boolean>
 * ok(okP(true)); //=> OkP<boolean>
 * ok(errP(true)); //=> ErrP<boolean>
 * ```
 */
export function ok(value: void): Ok<void>
export function ok<T>(value: T): OkOrForwardResult<T>
export function ok(value: unknown): unknown {
    return mapP(value, (value: any) => isResult(value) ? value : { ok: true, value })
}

type OkOrForwardResult<T> = SimplifyResult<T extends unknown
    ? T extends ResultLike
        ? T
        : T extends Promise<infer U>
            ? OkP<U>
            : Ok<T>
    : never>
