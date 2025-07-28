# SimplifyResult

`SimplifyResult<T>`

Takes any combination of `Result` types and simplifies its representation.

```ts
import type { SimplifyResult, Ok, Err, Result } from "@monstermann/result";

// Ok<boolean>
type A = SimplifyResult<Result<boolean, never>>;

// Err<boolean>
type B = SimplifyResult<Result<never, boolean>>;

// Result<boolean | number, string | void>
type C = SimplifyResult<
    Ok<true> | Ok<false> | Ok<number> | Err<string> | Err<void>
>;
```
