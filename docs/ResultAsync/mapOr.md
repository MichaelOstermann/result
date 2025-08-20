# mapOr

```ts
function ResultAsync.mapOr(
    result: AwaitableResult<T, E>,
    transform: (value: T) => U | Promise<U>,
    fallback: F
): Promise<U | F>
```

Unwraps the Ok value using the `transform` function, or returns the `fallback` value if the result is an Err.

## Example

::: code-group

```ts [data-first]
await ResultAsync.mapOr(ok(5), (x) => x * 2, 0);
// 10

await ResultAsync.mapOr(err("fail"), (x) => x * 2, 0);
// 0
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.mapOr((x) => x * 2, 0),
);
// 10
```

:::
