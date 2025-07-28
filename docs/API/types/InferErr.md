# InferErr

`InferErr<T>`

Extracts `Err` values from any combination of results, including asynchronous ones:

```ts
import type { InferErr, Result, Err } from "@monstermann/result";

// boolean | string
type Example = InferErr<Err<boolean> | Result<string, string>>;
```
