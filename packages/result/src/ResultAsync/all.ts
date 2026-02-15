import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { ok } from "../ok"

/**
 * # all
 *
 * ```ts
 * function ResultAsync.all(results: AwaitableResult<T, E>[]): ResultAsync<T[], E>
 * ```
 *
 * Combines multiple `results` into a single result. If all results are Ok, returns an Ok containing an array of all values. If any result is an Err, returns the first Err encountered.
 *
 * ## Example
 *
 * ```ts
 * await ResultAsync.all([ok(1), ok(2), ok(3)]);
 * // Ok<number[]>([1, 2, 3])
 *
 * await ResultAsync.all([ok(1), err("fail"), ok(3)]);
 * // Err<string>("fail")
 * ```
 *
 */
export async function all<const T extends readonly AwaitableResult[]>(results: T): ResultAsync<{
    -readonly [K in keyof T]: InferOk<T[K]>
}, { [K in keyof T]: InferErr<T[K]>; }[number]> {
    const oks: any = []
    for await (const result of results) {
        if (result.ok) oks.push(result.value)
        else return result as any
    }
    return ok(oks)
}
