# isErr

```ts
function isErr(result: unknown): result is Err;
```

Returns `true` if the `result` is an Err, `false` otherwise.

## Example

```ts
isErr(err("fail"));
// true

isErr(ok(42));
// false
```
