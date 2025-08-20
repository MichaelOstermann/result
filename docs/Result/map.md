# map

```ts
function Result.map(
    result: Result<T, E>,
    transform: (value: T) => U
): Result<U, E>
```

Transforms the value inside an Ok result using the `transform` function. If the `result` is an Err, it returns the Err unchanged.

## Example

::: code-group

```ts [data-first]
Result.map(ok(5), (x) => x * 2);
// Ok<number>

Result.map(err("fail"), (x) => x * 2);
// Err<string>
```

```ts [data-last]
pipe(
    ok(5),
    Result.map((x) => x * 2),
);
// Ok<number>
```

:::
