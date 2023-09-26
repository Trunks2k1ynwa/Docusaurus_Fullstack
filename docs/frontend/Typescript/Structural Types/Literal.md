## Literal Types

- Dùng để chỉ định tập hợp cụ thể các giá trị có thể chấp nhận

```ts
let status: 'success' | 'error' | 'pending'

status = 'success' // OK
status = 'warning' // Lỗi, không phù hợp với literal type

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1
}
```
