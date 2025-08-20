# filterOr

```ts
function Result.filterOr(
    result: Result<T, E>,
    predicate: (value: T) => boolean,
    or: F
): Result<T, E | F>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with the `or` value. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

## Example

::: code-group

```ts [data-first]
Result.filterOr(ok(5), (x) => x > 3, "too small");
// Ok<number>(5)

Result.filterOr(ok(1), (x) => x > 3, "too small");
// Err<string>("too small")

Result.filterOr(err("fail"), (x) => x > 3, "too small");
// Err<string>("fail")
```

```ts [data-last]
pipe(
    ok(1),
    Result.filterOr((x) => x > 3, "too small"),
);
// Err<string>("too small")
```

:::
