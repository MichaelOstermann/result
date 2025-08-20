# match

```ts
function ResultAsync.match(
    result: AwaitableResult<T, E>,
    patterns: {
        Ok: (value: T) => U | Promise<U>,
        Err: (error: E) => F | Promise<F>
    }
): Promise<U | F>
```

Pattern matches on the `result` using the provided `patterns` object. Calls the `Ok` function if the result is Ok, or the `Err` function if the result is an Err.

## Example

::: code-group

```ts [data-first]
await ResultAsync.match(ok(5), {
    Ok: (x) => `Value: ${x}`,
    Err: (e) => `Error: ${e}`,
});
// "Value: 5"

await ResultAsync.match(err("fail"), {
    Ok: (x) => `Value: ${x}`,
    Err: (e) => `Error: ${e}`,
});
// "Error: fail"
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.match({
        Ok: (x) => `Value: ${x}`,
        Err: (e) => `Error: ${e}`,
    }),
);
// "Value: 5"
```

:::
