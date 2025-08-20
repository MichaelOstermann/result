# mapOrElse

```ts
function ResultAsync.mapOrElse(
    result: AwaitableResult<T, E>,
    transform: (value: T) => U | Promise<U>,
    orElse: (error: E) => F | Promise<F>
): Promise<U | F>
```

Unwraps the Ok value using the `transform` function, or transforms the Err value using the `orElse` function.

## Example

::: code-group

```ts [data-first]
await ResultAsync.mapOrElse(
    ok(5),
    (x) => x * 2,
    (e) => `Error: ${e}`,
);
// 10

await ResultAsync.mapOrElse(
    err("fail"),
    (x) => x * 2,
    (e) => `Error: ${e}`,
);
// "Error: fail"
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.mapOrElse(
        (x) => x * 2,
        (e) => `Error: ${e}`,
    ),
);
// 10
```

:::
