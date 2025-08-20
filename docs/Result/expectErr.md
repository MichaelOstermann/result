# expectErr

```ts
function Result.expectErr(result: Result<T, E>, message: string): E
```

Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with the given `message`.

## Example

::: code-group

```ts [data-first]
Result.expectErr(err("fail"), "Expected an error");
// "fail"

Result.expectErr(ok(5), "Expected an error");
// throws ResultError("Expected an error")
```

```ts [data-last]
pipe(err("fail"), Result.expectErr("Expected an error"));
// "fail"
```

:::
