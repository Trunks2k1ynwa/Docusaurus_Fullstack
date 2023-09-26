# Pick

- Cú pháp : `Pick<Type, Keys>`
- Tạo ra một type bằng cách chọn 1 hoặc nhiều type từ `Type` chỉ được phép trùng với các key trong `Keys`

```ts
type Todo = {
  title: string
  description: string
  completed: boolean
}
// Pick các type từ Todo sao cho type đó là 'title' hoặc 'description'
type TodoPreview = Pick<Todo, 'title' | 'description'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false //error
}
```
