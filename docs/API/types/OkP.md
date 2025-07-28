# OkP

`OkP<T>`

Represents an asynchronous success.

```ts
import type { OkP } from "@monstermann/result";

type Example = OkP<boolean>;

// type Example = Promise<{
//     readonly ok: true
//     readonly value: boolean
//     readonly error?: undefined
// }>
```
