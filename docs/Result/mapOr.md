# mapOr

```ts
function Result.mapOr(
    result: Result<T, E>,
    transform: (value: T) => U,
    fallback: F
): U | F
```

Unwraps the Ok value using the `transform` function, or returns the `fallback` value if the result is an Err.

## Example

::: code-group

```ts [data-first]
Result.mapOr(ok(5), (x) => x * 2, 0);
// 10

Result.mapOr(err("fail"), (x) => x * 2, 0);
// 0
```

```ts [data-last]
pipe(
    ok(5),
    Result.mapOr((x) => x * 2, 0),
);
// 10
```

:::
