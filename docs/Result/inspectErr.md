# inspectErr

```ts
function Result.inspectErr(
    result: Result<T, E>,
    inspect: (error: E) => void
): Result<T, E>
```

Inspects the Err value using the `inspect` function without changing the result. If the result is an Err, calls the inspect function with the error value and returns the original result unchanged. If the result is Ok, returns it unchanged without calling inspect.

## Example

::: code-group

```ts [data-first]
Result.inspectErr(err("fail"), (e) => console.log(`Error: ${e}`));
// Err<string>("fail") - logs "Error: fail"

Result.inspectErr(ok(5), (e) => console.log(`Error: ${e}`));
// Ok<number>(5) - no log
```

```ts [data-last]
pipe(
    err("fail"),
    Result.inspectErr((e) => console.log(`Error: ${e}`)),
);
// Err<string>("fail") - logs "Error: fail"
```

:::
