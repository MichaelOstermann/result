# attemptOr

```ts
function ResultAsync.attemptOr<T, U>(
    unsafeFn: () => T | Promise<U>,
    or: U | Promise<U>
): ResultAsync<T, U>
```

Wraps a function that may throw an exception in a Result, using a specific error value. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the `or` value wrapped in Err.

## Example

```ts
await ResultAsync.attemptOr(() => 5, "default error");
// Ok<number>(5)

await ResultAsync.attemptOr(() => {
    throw new Error("Something went wrong");
}, "default error");
// Err<string>("default error")

await ResultAsync.attemptOr(() => JSON.parse("invalid json"), "parse failed");
// Err<string>("parse failed")
```
