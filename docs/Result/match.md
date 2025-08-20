# match

```ts
function Result.match(result: Result<T, E>, patterns: {
    Ok: (value: T) => A
    Err: (error: E) => B
}): A | B
```

Pattern matches on the `result` using the provided `patterns` object. Calls the `Ok` function if the result is Ok, or the `Err` function if the result is an Err.

## Example

::: code-group

```ts [data-first]
Result.match(ok(5), {
    Ok: (x) => `Value: ${x}`,
    Err: (e) => `Error: ${e}`,
});
// "Value: 5"

Result.match(err("fail"), {
    Ok: (x) => `Value: ${x}`,
    Err: (e) => `Error: ${e}`,
});
// "Error: fail"
```

```ts [data-last]
pipe(
    ok(5),
    Result.match({
        Ok: (x) => `Value: ${x}`,
        Err: (e) => `Error: ${e}`,
    }),
);
// "Value: 5"
```

:::
