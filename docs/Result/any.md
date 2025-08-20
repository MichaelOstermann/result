# any

```ts
function Result.any(results: Result<T, E>[]): Result<T, E[]>
```

Returns the first Ok result from the array of `results`, or an Err containing an array of all errors if all results are Err.

## Example

```ts
Result.any([ok(1), err("fail"), ok(3)]);
// Ok<number>(1)

Result.any([err("fail1"), err("fail2"), err("fail3")]);
// Err<string[]>(["fail1", "fail2", "fail3"])
```
