## Array

- Mảng gồm các phần tử là chuỗi, là số vv
  - number[]
  - Array<number>

```ts
const array: number[] = [2, 3, 54, 2, 3]
```

- Mảng gồm các phần tử có type khác nhau thì dùng Tuples để khai báo type
  - [number,string,boolean]

```ts
type arrayT = [string, number]
const array: arrayT = ['trung', 231]
```
