# ErrP

`ErrP<T>`

Represents an asynchronous error.

```ts
import type { ErrP } from "@monstermann/result";

type Example = ErrP<boolean>;

// type Example = Promise<{
//     readonly ok: false
//     readonly value?: undefined
//     readonly error: boolean
// }>
```
