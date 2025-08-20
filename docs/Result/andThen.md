# andThen

```ts
function Result.andThen(
    result: Result<T, E>,
    transform: (value: T) => Result<U, F>
): Result<U, E | F>
```

Chains Result-returning operations. If the `result` is Ok, applies the `transform` function to its value. If the `result` is Err, returns the Err unchanged.

## Example

::: code-group

```ts [data-first]
Result.andThen(ok(5), (x) => ok(x * 2));
// Ok<number>

Result.andThen(err("fail"), (x) => ok(x * 2));
// Err<string>
```

```ts [data-last]
pipe(
    ok(5),
    Result.andThen((x) => ok(x * 2)),
);
// Ok<number>
```

:::
