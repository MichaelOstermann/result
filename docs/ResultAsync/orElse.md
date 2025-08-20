# orElse

```ts
function ResultAsync.orElse(
    result: AwaitableResult<T, E>,
    orElse: (error: E) => AwaitableResult<U, F>
): ResultAsync<T | U, F>
```

Uses a fallback result computed by `transform` if the current result is an Err. If the result is Ok, returns it unchanged. If the result is an Err, calls `transform` with the error value to produce an alternative result.

## Example

::: code-group

```ts [data-first]
await ResultAsync.orElse(ok(5), (e) => ok(0));
// Ok<number>(5)

await ResultAsync.orElse(err("fail"), (e) => ok(0));
// Ok<number>(0)

await ResultAsync.orElse(err("fail"), (e) => err(`Handled: ${e}`));
// Err<string>("Handled: fail")
```

```ts [data-last]
await pipe(
    err("fail"),
    ResultAsync.orElse((e) => ok(0)),
);
// Ok<number>(0)
```

:::
