# filterOr

```ts
function ResultAsync.filterOr(
    result: AwaitableResult<T, E>,
    predicate: (value: T) => boolean,
    or: F
): ResultAsync<T, E | F>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with the `or` value. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

## Example

::: code-group

```ts [data-first]
await ResultAsync.filterOr(ok(5), (x) => x > 3, "too small");
// Ok<number>(5)

await ResultAsync.filterOr(ok(1), (x) => x > 3, "too small");
// Err<string>("too small")

await ResultAsync.filterOr(err("fail"), (x) => x > 3, "too small");
// Err<string>("fail")
```

```ts [data-last]
await pipe(
    ok(1),
    ResultAsync.filterOr((x) => x > 3, "too small"),
);
// Err<string>("too small")
```

:::
