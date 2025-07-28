# InferOk

`InferOk<T>`

Extracts `Ok` values from any combination of results, including asynchronous ones:

```ts
import type { InferOk, Result, Ok } from "@monstermann/result";

// boolean | string
type Example = InferOk<Ok<boolean> | Result<string, string>>;
```
