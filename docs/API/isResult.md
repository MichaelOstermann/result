# isResult

`isResult(value)`

A function that takes an `unknown` value and narrows it to `Result<unknown, unknown>`.

::: code-group

```ts [data-first]
isResult(ok(true)); //=> true
isResult(err(false)); //=> true
isResult(true); //=> false
```

```ts [data-last]
pipe(ok(true), isResult()); //=> true
pipe(err(false), isResult()); //=> true
pipe(true, isResult()); //=> false
```

:::
