# orElse

```ts
function Result.orElse(
    result: Result<T, E>,
    transform: (error: E) => Result<U, F>
): Result<T | U, F>
```

Uses a fallback result computed by `transform` if the current result is an Err. If the result is Ok, returns it unchanged. If the result is an Err, calls `transform` with the error value to produce an alternative result.

## Example

::: code-group

```ts [data-first]
Result.orElse(ok(5), (e) => ok(0));
// Ok<number>(5)

Result.orElse(err("fail"), (e) => ok(0));
// Ok<number>(0)

Result.orElse(err("fail"), (e) => err(`Handled: ${e}`));
// Err<string>("Handled: fail")
```

```ts [data-last]
pipe(
    err("fail"),
    Result.orElse((e) => ok(0)),
);
// Ok<number>(0)
```

:::
