import type { Result } from "."
import type { InferErr, InferOk } from "../types"

/**
 * Combines multiple `results` into a single result. If all results are Ok, returns an Ok containing an array of all values. If any result is an Err, returns the first Err encountered.
 *
 * @example
 * ```ts
 * Result.all([ok(1), ok(2), ok(3)]);
 * // Ok<number[]>([1, 2, 3])
 *
 * Result.all([ok(1), err("fail"), ok(3)]);
 * // Err<string>("fail")
 * ```
 */
export function all<const T extends readonly Result[]>(results: T): Result<{
    -readonly [K in keyof T]: InferOk<T[K]>
}, { [K in keyof T]: InferErr<T[K]>; }[number]> {
    const oks: any = []
    for (const result of results) {
        if (result.ok) oks.push(result.value)
        else return result as any
    }
    return oks
}
