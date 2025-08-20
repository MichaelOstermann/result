# attemptOr

```ts
function Result.attemptOr(unsafeFn: () => T, or: E): Result<T, E>
```

Wraps a function that may throw an exception in a Result, using a specific error value. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the `or` value wrapped in Err.

## Example

```ts
Result.attemptOr(() => 5, "default error");
// Ok<number>(5)

Result.attemptOr(() => {
    throw new Error("Something went wrong");
}, "default error");
// Err<string>("default error")

Result.attemptOr(() => JSON.parse("invalid json"), "parse failed");
// Err<string>("parse failed")
```
