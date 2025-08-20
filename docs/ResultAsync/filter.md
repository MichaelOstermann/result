# filter

```ts
function ResultAsync.filter(
    result: AwaitableResult<T, E>,
    predicate: (value: T) => boolean
): ResultAsync<T, E | void>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with `void`. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

## Example

::: code-group

```ts [data-first]
await ResultAsync.filter(ok(5), (x) => x > 3);
// Ok<number>(5)

await ResultAsync.filter(ok(1), (x) => x > 3);
// Err<void>

await ResultAsync.filter(err("fail"), (x) => x > 3);
// Err<string>("fail")
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.filter((x) => x > 3),
);
// Ok<number>(5)
```

:::
