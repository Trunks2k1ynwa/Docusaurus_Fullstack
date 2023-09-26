# Readonly

- Cấu trúc : `Readonly<Type>`
- Xây dựng type với tất cả các thuộc tính từ `Type` được đặt thành `readOnly`, không được gán lại

```ts
interface Todo {
  title: string
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users'
}

todo.title = 'Hello'
//Cannot assign to 'title' because it is a read-only property.
```
