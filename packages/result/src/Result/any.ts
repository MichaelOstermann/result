import type { InferErr, InferOk } from "../types"
import type { Result } from "./types"

/**
 * Returns the first Ok result from the array of `results`, or an Err containing an array of all errors if all results are Err.
 *
 * @example
 * ```ts
 * Result.any([ok(1), err("fail"), ok(3)]);
 * // Ok<number>(1)
 *
 * Result.any([err("fail1"), err("fail2"), err("fail3")]);
 * // Err<string[]>(["fail1", "fail2", "fail3"])
 * ```
 */
export function any<const T extends readonly Result[]>(results: T): Result<{
    [K in keyof T]: InferOk<T[K]>
}[number], { [K in keyof T]: InferErr<T[K]>; }[number][]> {
    const errors: any = []
    for (const result of results) {
        if (!result.ok) errors.push(result.error)
        else return result as any
    }
    return errors
}
