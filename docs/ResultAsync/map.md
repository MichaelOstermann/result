# map

```ts
function ResultAsync.map(
    result: AwaitableResult<T, E>,
    transform: (value: T) => U | Promise<U>
): ResultAsync<U, E>
```

Transforms the value inside an Ok result using the `transform` function. If the `result` is an Err, it returns the Err unchanged.

## Example

::: code-group

```ts [data-first]
await ResultAsync.map(ok(5), (x) => x * 2);
// Ok<number>

await ResultAsync.map(err("fail"), (x) => x * 2);
// Err<string>
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.map((x) => x * 2),
);
// Ok<number>
```

:::
