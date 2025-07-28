# ResultP

`ResultP<T, E>`

Represents an asynchronous success or error.

```ts
import type { ResultP } from "@monstermann/result";

type Example = ResultP<boolean, string>;
// type Example = OkP<boolean> | ErrP<string>;
```
