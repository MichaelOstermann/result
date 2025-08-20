# andThen

```ts
function ResultAsync.andThen(
    result: AwaitableResult<T, E>,
    transform: (value: T) => AwaitableResult<U, F>
): ResultAsync<U, E | F>
```

Chains Result-returning operations. If the `result` is Ok, applies the `transform` function to its value. If the `result` is Err, returns the Err unchanged.

## Example

::: code-group

```ts [data-first]
await ResultAsync.andThen(ok(5), (x) => ok(x * 2));
// Ok<number>(10)

await ResultAsync.andThen(err("fail"), (x) => ok(x * 2));
// Err<string>("fail")
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.andThen((x) => ok(x * 2)),
);
// Ok<number>(10)
```

:::
