# isOk

`isOk(value)`

A function that takes an `unknown` value and narrows it to `Ok<unknown>`.

::: code-group

```ts [data-first]
isOk(ok(true)); //=> true
isOk(err(false)); //=> false
isOk(true); //=> false
```

```ts [data-last]
pipe(ok(true), isOk()); //=> true
pipe(err(false), isOk()); //=> false
pipe(true, isOk()); //=> false
```

:::
