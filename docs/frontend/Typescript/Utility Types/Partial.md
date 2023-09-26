# Partial

- Cấu truc : `Partial<Type>`
- Tạo ra type mới từ `Type` với tất cả các property là `optional`

```ts
Interface Todo {
    title: string;
    description: string;
  }

  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
  }

  const todo1 = {
    title: "organize desk",
    description: "clear clutter",
  };

  const todo2 = updateTodo(todo1, {
    description: "throw out trash",
  });
```
