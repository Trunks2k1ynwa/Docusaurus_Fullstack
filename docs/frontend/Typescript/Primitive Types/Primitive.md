# typeof :

- Kiểm tra type của 1 giá trị mà bạn ko chắc chán
- Type Assignment
- Number Types
- String Types
- Boolean Types
- null
- undefined
  - Sử dụng toán tử ! để ngầm định giá trị không phải null và undefined
  ```ts
  function liveDangerously(x?: number | null) {
    // No error
    console.log(x!.toFixed())
  }
  ```
