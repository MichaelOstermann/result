# isOk

```ts
function isOk(result: unknown): result is Ok;
```

Returns `true` if the `result` is an Ok, `false` otherwise.

## Example

```ts
isOk(ok(42));
// true

isOk(err("fail"));
// false
```
