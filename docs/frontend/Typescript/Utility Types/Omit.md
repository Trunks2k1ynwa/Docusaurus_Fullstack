# Omit

- Cấu trúc : `Omit<Type, Keys>`
- Tạo ra type mới từ các type trong `Type` và loại ra các type trùng với key trong `Keys`

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
  createdAt: number
}

type TodoPreview = Omit<Todo, 'description'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
  description: '1615544252770' // error
}
```
