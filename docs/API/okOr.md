# okOr

`okOr(result, fallback)`

Extracts the `Ok` value from a `Result`, otherwise returns the fallback.

::: code-group

```ts [data-first]
okOr(ok(true), false); //=> true
okOr(err(false), true); //=> true
await okOr(okP(true), Promise.resolve(false)); //=> true
await okOr(errP(false), Promise.resolve(true)); //=> true
```

```ts [data-last]
pipe(ok(true), okOr(false)); // true
pipe(err(false), okOr(true)); // true
await pipe(okP(true), okOr(Promise.resolve(false))); // true
await pipe(errP(false), okOr(Promise.resolve(true))); // true
```

:::
