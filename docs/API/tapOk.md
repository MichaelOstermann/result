# tapOk

`tapOk(result, fn)`

Allows you to peek into the `Ok` value of a `Result`, triggering a side-effect while ignoring the output.

If the result is an `Err`, this has no effect.

::: code-group

```ts [data-first]
tapOk(ok(true), (v) => console.log(v)); //=> ok(true)
tapOk(okP(true), async (v) => console.log(v)); //=> ok(true)
```

```ts [data-last]
pipe(ok(true), (v) => console.log(v)); //=> ok(true)
pipe(okP(true), async (v) => console.log(v)); //=> ok(true)
```

:::
