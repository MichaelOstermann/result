# okOrThrow

`okOrThrow(result)`

Extracts the `Ok` value from a `Result`, otherwise throws the `Err` value.

::: code-group

```ts [data-first]
okOrThrow(ok(true)); //=> true
okOrThrow(err("message")); // Throws "message"
await okOrThrow(okP(true)); //=> true
await okOrThrow(errP("message")); // Throws "message"
```

```ts [data-last]
pipe(ok(true), okOrThrow()); //=> true
pipe(err("message"), okOrThrow()); // Throws "message"
await pipe(okP(true), okOrThrow()); //=> true
await pipe(errP("message"), okOrThrow()); // Throws "message"
```

:::
