# any

```ts
function ResultAsync.any(
    results: AwaitableResult<T, E>[]
): ResultAsync<T, E[]>
```

Returns the first Ok result from the array of `results`, or an Err containing an array of all errors if all results are Err.

## Example

```ts
await ResultAsync.any([err("fail1"), ok(2), err("fail2")]);
// Ok<number>(2)

await ResultAsync.any([err("fail1"), err("fail2"), err("fail3")]);
// Err<string[]>(["fail1", "fail2", "fail3"])
```
