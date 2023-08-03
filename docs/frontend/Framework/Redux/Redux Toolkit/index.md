# Redux Toolkit

**RTK cung cấp các API có sẵn để setup thay vì sử dụng `boilerplate` theo cách viết logic tay của Redux**

**RTK có 2 API chính giúp mọi thứ cơ bản đơn giản hơn trong mọi app Redux :**

- `configureStore` :
  - Dùng để thiết lập Redux `store` thay vì `createStore`
  - Được cấu hình tốt với các function như : `combining reducers`, `thunk middleware`, tương thích với `Redux DevTools `
- `createSlice` :
  - Cho phép bạn viết các `reducer` sử dụng thư viện `Immer` (Viết các bản update `immutable`, vd: state.value = 123 thay vì `spreads`)
  - Tự động tạo các hàm `action` cho mỗi `reducer`
  - Tự động tạo các `action type` dựa trên tên của `reducer`

## Ví dụ cơ bản về RTK

```js title=todosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
});
export const { todoAdded, todoToggled } = todosSlice.actions;
export default todosSlice.reducer;
```

- Các `action` types được tạo tự động qua function (`todoAdded`,`todoToggled`)
- Code bên trong `reducer` ngắn và dễ hiểu hơn
- Nó cũng rõ ràng hơn nhiều những gì thực sự được cập nhật trong từng trường hợp so với `Redux Core`

```js title=store.js
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
});
```

`configureStore` sẽ tự động setup tất cả các công việc thông thường mà bạn đã thực hiện thủ công:

- `slice reducer` tự động được thêm vào `combineReducers()`
- `middleware thunk` tự động được thêm vào
- `Redux Devtools` được thiếp lập tự động
- `middleware` và `DevTools` được kết hợp với nhau và thêm vào `store`

`configureStore` cung cấp các tùy chọn để sử đổi như ( tắt `thunks` và thêm `sagas`, tắt `DevTools`)
`RTK` cung cấp các API khác cho các tác vụ `Redux` phổ biến như sau :

- `createAsyncThunk` : Sử dụng khi `dispatch` các `actions` trước hoặc sau một `request` không đồng bộ
- `configureStore` : Dựng sẵn các `reducer` và `selectors` cho tính năng `CRUD` ở trạng thái thông thường
- `createListenerMiddleware` : là `middleware` gồm các `side-effect` để chạy các logic trong việc phản hồi đến các `action` đã được `dispatch`
- `createSelector`

_`RTK` cung cấp `RTK query`, 1 giải pháp trong việc `fetch` data và `caching` data đó truong `Redux app`_

:::tip
Redux khuyến khích sử dụng `Redux Toolkit`, không nên dùng `Redux core` cho ứng dụng Redux của bạn
:::
