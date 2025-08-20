# expect

```ts
function Result.expect(result: Result<T, E>, message: string): T
```

Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with the given `message`.

## Example

::: code-group

```ts [data-first]
Result.expect(ok(5), "Expected a value");
// 5

Result.expect(err("fail"), "Expected a value");
// throws ResultError("Expected a value")
```

```ts [data-last]
pipe(ok(5), Result.expect("Expected a value"));
// 5
```

:::
