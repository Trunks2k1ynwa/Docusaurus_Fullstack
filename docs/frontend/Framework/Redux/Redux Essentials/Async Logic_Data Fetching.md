---
title: Async Logic và Data Fetching
---
## Middleware

- `Middleware` thường dùng để xử lý các logic không đồng bộ khác nhau tương tác với store
  - Thực thi các logic bổ sung khi bất kì action nào được dispatched
  - Tạm dừng, sửa đổi, trì hoãn,thay thế hoặc tạm dừng các hành động được gửi đi
  - Viết thêm code có quyền truy nhập vào `dispatch` , `getState`
  - Dạy cho `dispatch` cách chấp nhận giá trị khác bên cạnh action object như : function, promise bằng cách chặn chúng và thay vào đối gửi đi các action object thực

![middleware](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

## Thunk function

- Khi `thunk` `middleware` được thêm vào `Redux store`, điều này cho phép bạn truyền `thunk` `function` vào trong `store.dispatch`
- `Thunk` function sẽ luôn gọi với 2 đối số là : `dispatch`, `getState`
- `Thunks` thường sẽ gửi các action đơn giản đến store như : `dispatch(increment())`

```js
const store = configureStore({ reducer: counterReducer });

const exampleThunkFunction = (dispatch, getState) => {
  const stateBefore = getState();
  dispatch(increment());
  const stateAfter = getState();
};

store.dispatch(exampleThunkFunction);
```

```js
const logAndAdd = (amount) => {
  return (dispatch, getState) => {
    const stateBefore = getState();
    dispatch(incrementByAmount(amount));
    const stateAfter = getState();
  };
};
store.dispatch(logAndAdd(5));
```

## Async Thunks

- `Thunks` có thể xử lý các logic bất đồng bộ bên trong như : `setTimout`, `Promise`, `Async,await`. Điều này làm cho chúng thành một nơi tốt để call API to server
- `Redux toolkit `cung cấp API `createAsyncThunk` để thực thi việc tạo và `dispatch` các action này

## Trích xuất Selectors

```js
export const selectAllPosts = (state) => state.posts;
// Sử dụng
const posts = useSelector(selectAllPosts);

export const selectPostById = (state, postId) =>
  // Sử dụng
  state.posts.find((post) => post.id === postId);
const post = useSelector((state) => selectPostById(state, postId));
```

## Tạo state Loading cho các yêu cầu

- Khi call API, chúng ta có thể theo dõi tiến trình của nó qua các giai đoạn :
  - Yêu cầu chưa bắt đầu
  - Yêu cầu được triển khai
  - Yêu cầu thành công, chúng ta có dữ liệu chúng ta cần
  - Yêu cầu thất bài, hiện error message

```js
{
  // Multiple possible status enum values
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}
```

## Fetching Data với createAsyncThunk

- API `createAsyncThunk` của Redux toolkit tạo ra các thunks tự động gửi các hành động "start/success/failure" đó cho bạn.
- `createAsyncThunk` có hai đối số :
  - Một chuỗi được dùng làm tiền tố việc tự đồng tạo ra `action types`
  - `payload creator` là callback function sẽ phải return `Promise` chứa dữ liệu hoặc error nếu `Promise` bị `reject`

```js
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.data;
});
```
- Khi `dispatch(fetchPosts())`, `fetchPosts` `thunk` sẽ dispatch lần đầu với action type là `posts/fetchPosts/pending`
![Alt text](image.png)
![Alt text](image-1.png)

## Dispatching Thunks từ components

- Tại component, để cập nhật dữ liệu của chúng ta để thực sự tự động tìm nạp dữ liệu này
- Chúng ta sẽ import `fetchPost` thunk vào trong component

```js
const postStatus = useSelector((state) => state.posts.status);
useEffect(() => {
  if (postStatus === "idle") {
    dispatch(fetchPosts());
  }
}, [postStatus, dispatch]);
```

## Reducer và Loading trong các Actions

- `extraReducers` là 1 hàm nhận tham số gọi là `builder`
- `builder` object cung cấp các method cho phép xác định các trường hợp reducers bổ sung
- Chúng tôi dùng `builder.addCase(actionsCreator,reducer)` để xử lý mỗi `actions` được `dispatch` bởi các `thunks async`

```js
import { increment } from "../features/counter/counterSlice";

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // slice-specific reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase("counter/decrement", (state, action) => {})
      .addCase(increment, (state, action) => {});
  },
});
```

- `builder` object trong `extraReducers` cung cấp các methodss cho phép định nghĩa các trường hợp `reducers` sẽ chạy để phản hồi lại các `action` được xác định bên trong `slice`:
  - `builder.addCase(actionCreator, reducer)`: Xác định 1 `reducer` xử lý các `RTK action creator` hoặc `action` là `type:string`
  - `builder.addMatcher(matcher, reducer)` : Xác định 1 `reducer` có thể chạy để phản hồi bất kì action với điều kiện là `matcher` function return true
  - `builder.addDefaultCase(reducer)` : Xác định 1 `reducer` chạy sẽ chạy nếu không có `reducer` nào được thực thi cho `action` này

```js title=features/posts/postsSlice.js
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
```

- Xử lý 3 action types có thể được dispatched bởi thunk vừa trên promise trả về.

## Hiển thị Loading State
- Lấy trạng thái loading trong store để hiện thi loading trên UI
```js
const postStatus = useSelector(state => state.posts.status)
const error = useSelector(state => state.posts.error)
```
## Loading Users
```js title=userSlice.js
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})
```
```js title=index.js
 store.dispatch(fetchUsers())
```
## Adding New Posts
### Gửi data với thunks
```js
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async initialPost => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  }
)
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // The existing `postAdded` reducer and prepare callback were deleted
    reactionAdded(state, action) {}, // omit logic
    postUpdated(state, action) {} // omit logic
  },
  extraReducers(builder) {
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload)
    })
  }
})
```
