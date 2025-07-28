# isErr

`isErr(value)`

A function that takes an `unknown` value and narrows it to `Err<unknown>`.

::: code-group

```ts [data-first]
isErr(ok(true)); //=> false
isErr(err(false)); //=> true
isErr(true); //=> false
```

```ts [data-last]
pipe(ok(true), isErr()); //=> false
pipe(err(false), isErr()); //=> true
pipe(true, isErr()); //=> false
```

:::
