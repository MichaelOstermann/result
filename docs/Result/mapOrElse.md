# mapOrElse

```ts
function Result.mapOrElse(
    result: Result<T, E>,
    transform: (value: T) => U,
    orElse: (error: E) => F
): U | F
```

Unwraps the Ok value using the `transform` function, or transforms the Err value using the `orElse` function.

## Example

::: code-group

```ts [data-first]
Result.mapOrElse(
    ok(5),
    (x) => x * 2,
    (e) => `Error: ${e}`,
);
// 10

Result.mapOrElse(
    err("fail"),
    (x) => x * 2,
    (e) => `Error: ${e}`,
);
// "Error: fail"
```

```ts [data-last]
pipe(
    ok(5),
    Result.mapOrElse(
        (x) => x * 2,
        (e) => `Error: ${e}`,
    ),
);
// 10
```

:::
