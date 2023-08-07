---
title: Redux
---

## Tips

### Actions trong slice

- `createSlice` cho phép chúng ta viết `prepare callback` function
- `prepare` return `aciton.payload`
- Hàm này nhận vào nhiều đối số, tạo ra các giá trị ngẫu nhiên như ID duy nhất,sau khi trả về giá trị (object, array, value)
- Sau khi `prepare` handle xong sẽ chạy vào action object với `action.payload` = gọi hàm `callback prepare`, giá trị trả về trong hàm

```js
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    // other reducers here
  },
});
```

- Khi user dispatch `postAdded(title,content)`
- `store` sẽ chạy `reducer`, `prepare` được chạy trước với hai đối số này từ dispatch
- `prepare` trả về giá trị, `reducer` sẽ chạy với `state`,`action`
- Cập nhật `state` với `action`.`payload` bằng giá trị trả về trong `prepare`

## Cấu hình Redux với typescript

- `store` với `typescript`

```js title=store.ts
import { configureStore } from '@reduxjs/toolkit'
// omit any other imports

const store = configureStore({
  reducer: {
    todos: todosReducer,
    counter: counterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

- `useSelector, useDispach` với `typescript`

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

- `slice` với `typescript`

```js title=todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
  id: string
  text: string
  completed: boolean
}
// Declare and export a type for the slice's state
export type TodosState = Todo[]
const initialState: TodosState = []

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<{ id: string; text: string }>) {
      // omit logic
    },
    todoToggled(state, action: PayloadAction<string>) {
      // omit logic
    }
  }
})
```
- Trong component
```ts title=TodoListItem.tsx
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  todoToggled,
  todoDeleted,
  selectTodoById,
  selectActiveTodoId
} from './todosSlice'

interface TodoListItemProps {
  todoId: string
}

function TodoListItem({ todoId }: TodoListItemProps) {
  // Use the pre-typed hooks in the component
  const dispatch = useAppDispatch()
  const activeTodoId = useAppSelector(selectActiveTodoId)
  const todo = useAppSelector(state => selectTodoById(state, todoId))

}
```