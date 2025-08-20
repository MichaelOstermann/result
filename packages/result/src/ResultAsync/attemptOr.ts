import type { ResultAsync } from "./types"
import { err } from "../err"
import { ok } from "../ok"

/**
 * Wraps a function that may throw an exception in a Result, using a specific error value. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the `or` value wrapped in Err.
 *
 * @example
 * ```ts
 * await ResultAsync.attemptOr(() => 5, "default error");
 * // Ok<number>(5)
 *
 * await ResultAsync.attemptOr(() => {
 *     throw new Error("Something went wrong");
 * }, "default error");
 * // Err<string>("default error")
 *
 * await ResultAsync.attemptOr(() => JSON.parse("invalid json"), "parse failed");
 * // Err<string>("parse failed")
 * ```
 */
export async function attemptOr<T, U>(unsafeFn: () => T, or: U): ResultAsync<Awaited<T>, Awaited<U>> {
    try {
        return ok(await unsafeFn())
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error) {
        return err(await or)
    }
}
