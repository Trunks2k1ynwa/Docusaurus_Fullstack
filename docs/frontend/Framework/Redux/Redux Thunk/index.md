---
title: Redux Thunk
---

# Thunks

- Redux Toolkit có `createAsyncThunk` API sẽ tạo ra các thunk
- Nó cũng sẽ sinh ra `action types` và `action creator` cho các request status và `dispatch` các `action` đó tự động dựa trên kết quả `Promise`

## Sử dụng createAsyncThunk

- `createAsyncThunk` có hai đối số :
  - 1 chuỗi sẽ sử dụng là tiền tố để tạo ra `action types`
  - 1 `payload creator` function trả về 1 `promise`. Nó thường viết sử dụng cú pháp `async/await`. Khi `async` function sẽ tự động return `promise`

```js title = todosSlice.js
const initialState = {
  status: "uninitialized",
  todos: [],
  error: null,
};
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  // This will automatically dispatch a `pending` action first,
  // and then `fulfilled` or `rejected` actions based on the promise.
  // as needed based on the
  const response = await client.get("/fakeApi/todos");
  return response.todos;
});
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // omit reducer cases
  },
  extraReducers: (builder) => {
    // Use `extraReducers` to handle actions that were generated
    // _outside_ of the slice, such as thunks or in other slices
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        // Same "mutating" update syntax thanks to Immer
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.todos = []
        state.error = action.error
      })
  },
});
```

- Ở ví dụ trên, `todos/fetchTodos` là chuỗi tiền tố của `action.types`
- `payload creator` là function gọi API và return promise
- `createAsyncThunk` sẽ tạo ra 3 `action creators` and các `action types` tương ứng
- Khi `thunk` function được gọi, nó sẽ tự động dispatch những action kia, `action creators` và `types` tương ứng như sau :
  - `fetchTodos.pending`: `todos/fetchTodos/pending`
  - `fetchTodos.fulfilled`: `todos/fetchTodos/fulfilled`
  - `fetchTodos.rejected`: `todos/fetchTodos/rejected`
- Do `thunk` được định nghĩa bên ngoài `createSlice` vì thế không thể xử lý các `action` này trong `createSlice.reducers` bới vì `thunk` sinh ra các `actions types` mới
- `extraReducers` là tùy chọn của `createSlice`, nơi có thể sử dụng để chứa cùng `slice reducers` và lắng nghe các `action types` khác
- Trường này thường là 1 callback function với tham số là `builder`, và chúng ta sẽ gọi `builder.addCase(actionCreator,caseReduers)` để lắng nghe các `action khác`
