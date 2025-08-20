# filter

```ts
function Result.filter(
    result: Result<T, E>,
    predicate: (value: T) => boolean
): Result<T, E | void>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with `void`. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

## Example

::: code-group

```ts [data-first]
Result.filter(ok(5), (x) => x > 3);
// Ok<number>(5)

Result.filter(ok(1), (x) => x > 3);
// Err<void>

Result.filter(err("fail"), (x) => x > 3);
// Err<string>("fail")
```

```ts [data-last]
pipe(
    ok(5),
    Result.filter((x) => x > 3),
);
// Ok<number>(5)
```

:::
