# inspect

```ts
function ResultAsync.inspect(
    result: AwaitableResult<T, E>,
    inspect: (value: T) => void
): ResultAsync<T, E>
```

Inspects the Ok value using the `inspect` function without changing the result. If the result is Ok, calls the inspect function with the value and returns the original result unchanged. If the result is an Err, returns it unchanged without calling inspect.

## Example

::: code-group

```ts [data-first]
await ResultAsync.inspect(ok(5), (x) => console.log(`Value: ${x}`));
// Ok<number>(5) - logs "Value: 5"

await ResultAsync.inspect(err("fail"), (x) => console.log(`Value: ${x}`));
// Err<string>("fail") - no log
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.inspect((x) => console.log(`Value: ${x}`)),
);
// Ok<number>(5) - logs "Value: 5"
```

:::
