# expect

```ts
function ResultAsync.expect(
    result: AwaitableResult<T, E>,
    message: string
): Promise<T>
```

Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with the given `message`.

## Example

::: code-group

```ts [data-first]
await ResultAsync.expect(ok(5), "Expected a value");
// 5

await ResultAsync.expect(err("fail"), "Expected a value");
// throws ResultError("Expected a value")
```

```ts [data-last]
await pipe(ok(5), ResultAsync.expect("Expected a value"));
// 5
```

:::
