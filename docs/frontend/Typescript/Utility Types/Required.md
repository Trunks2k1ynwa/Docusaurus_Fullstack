# Required

- Cấu trúc : `Required<Type|Interface>`
- Xây dựng một type từ tất cả các thuộc tính của `Type|Interface` và set cho nó là `required` tức là bắt buộc

```ts
interface Props {
  a?: number
  b?: string
}

const obj: Props = { a: 5 }

const obj2: Required<Props> = { a: 5 }
```
