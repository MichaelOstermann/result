# filterOrElse

```ts
function Result.filterOrElse(
    result: Result<T, E>,
    predicate: (value: T) => boolean,
    orElse: (value: T) => F
): Result<T, E | F>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, calls `orElse` with the Ok value and returns an Err with the result. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

## Example

::: code-group

```ts [data-first]
Result.filterOrElse(
    ok(5),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Ok<number>(5)

Result.filterOrElse(
    ok(1),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Err<string>("1 is too small")

Result.filterOrElse(
    err("fail"),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Err<string>("fail")
```

```ts [data-last]
pipe(
    ok(1),
    Result.filterOrElse(
        (x) => x > 3,
        (x) => `${x} is too small`,
    ),
);
// Err<string>("1 is too small")
```

:::
