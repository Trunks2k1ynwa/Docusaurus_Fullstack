---
title: Usage Redux Toolkit
---

# Cách sử dụng

## Cài đặt Redux Toolkit và React-Redux

```bash
npm install @reduxjs/toolkit react-redux
```

## Tạo Redux Store

- Tạo file `src/app/store.js`. Import `configureStore` API từ Redux Toolkit
- Tạo 1 Redux store trống và import nó :

```js title=app/store.js
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
})

export default store
```
- Bạn có thể truyền các `slice reducers` và `configureStore` sẽ gọi `combineReducers` cho bạn
## Cung cấp Redux Store này đến React

- Sau khi tạo `store`, chúng ta sẽ cung cấp `store` cho React component bằng cách đặt React component bên trong `<Prodiver></Prodiver>` và truyền `props` `store` bằng `store` mà bạn đã tạo

```js title=index.js
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
```

## Reducers
- `Reducers` là khái niệm quan trọng trong concept của Redux. Đặc trưng cần có 
  + Xem xét trường `type` của `action` object để phản hồi lại như thế nào
  + Cập nhật `state` `immutably`,bằng cách tạo các bản sao của các phần của trạng thái cần thay đổi và chỉ sửa đổi các bản sao đó
### Reducers với createReducer
```js
const todosReducer = createReducer([], (builder) => {
  builder
    .addCase('ADD_TODO', (state, action) => {
      // "mutate" the array by calling push()
      state.push(action.payload)
    })
    .addCase('TOGGLE_TODO', (state, action) => {
      const todo = state[action.payload.index]
      // "mutate" the object by overwriting a field
      todo.completed = !todo.completed
    })
    .addCase('REMOVE_TODO', (state, action) => {
      // Can still return an immutably-updated value if we want to
      return state.filter((todo, i) => i !== action.payload.index)
    })
})
```
### Reducer từ Slices với createSlice
- Redux toolkit sử dụng `createSlice` sẽ tự động tạo ra `action types` và `action creators` cho bạn, dựa trên tên của `reducers` bạn cung cấp
```js
const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {},
  },
})
const { actions, reducer } = postsSlice
export const { createPost, updatePost, deletePost } = actions
export default reducer

console.log(createPost({ id: 123, title: 'Hello World' }))
// {type : "posts/createPost", payload : {id : 123, title : "Hello World"}}
```
- `createSlice` sẽ xem tất cả các function trong `reducers` đã định nghĩa như `case reducers` -> `action creator`, nó sẽ dựa theo tên của `reducer` như `action types` cho từng trường hợp
- `createSlice` cho phép chúng tao bảo vệ sự `mutate` của `state`
```js title=features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color }
        }
      }
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
// Sử dụng
dispatch(increment()) = dispatch({type:'counter/increment'})
```

- `createSlice` cho phép xử lý các tình huống bằng việc thêm `prepare` vào reducer. Chúng ta cần truyền 1 object với 2 function là `reducer` và `prepare`
- Khi gọi `action creators`, `prepare` sẽ được gọi với các tham số được truyền vào. Nó sẽ phải return object chứa trường`payload`, `payload` này sẽ là giá trị trong `action` ở `reducer`.
## Action Creators
- `Redux` khuyến khích viết các hàm `action creator` đóng gọi quá trị tạo một `action` object
- `Action Creator` là 1 function có 1 tham số và return ra object chứa 2 trường `type`,`payload` có giá trị là tham số truyền vào
```js
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: { text },
  }
}
```
### Định nghĩa Action Creators với createAction
- Tạo `action creator` sử dụng `createAction` truyền vào `action type`
- Khi gọi `action Creator` chỉ cần truyền vào `payload` sẽ tự động trả về `{type:action type,payload}`
```js
const addTodo = createAction('ADD_TODO')
addTodo({ text: 'Buy milk' })
// {type : "ADD_TODO", payload : {text : "Buy milk"}})
```
#### Sử dụng action creator như action types trong reducer
```js
const actionCreator = createAction('SOME_ACTION_TYPE')
console.log(actionCreator.toString())
// "SOME_ACTION_TYPE"
console.log(actionCreator.type)
// "SOME_ACTION_TYPE"
const reducer = createReducer({}, (builder) => {
  // actionCreator.toString() will automatically be called here

  builder.addCase(actionCreator, (state, action) => {})
  // Or, you can reference the .type field:
  // if using TypeScript, the action type cannot be inferred that way
  builder.addCase(actionCreator.type, (state, action) => {})
})
```
## Thêm Slice Reducers đến Store

- Thêm `slice` vào `store` để yêu cầu `store` sử dụng các chức năng của `slice` để xử lý tất cả các cập nhật cho `state` đo

```js title=app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

## Sử dụng Redux State và Actions trong ReactComponent
- `useSelector` dùng để lấy `data` từ `store`
- `useDispatch` dùng để `dispatch` 1 `action`
```js title=features/counter/Counter.js
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
export function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```
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
- Do Redux `toolkit` sử dụng `createSlice` nên khi `dispatch` 1 `action`, `action` sẽ thường là hàm gọi function action trong `slice` được export ra hoặc là `{type:'tên reducer/tên function actions'}`
- Vd:` dispath({type: "counter/increment"})` = `dispatch(increment())`

:::tipTổng kết
+ **Tạo Redux store với `configureStore`**
  +`configureStore` truyền vào reducer chứa các slice reducer
  + `configureStore` tự động setup store với những cài đặt mặc định
+ **Cung cấp Redux store vào trong React Components**
  + Đặt React-Redux là `Provider` bọc bên ngoài component của bạn
  + Truyền Redux `store` như `<Provider store={store}>`
+ **Tạo Redux `slice` với `createSlice`**
  + Gọi `createSlice` với tên slice, state ban đầu, tên reducer
  + Hàm `Reducer` có thể `mutate` `state` sử dụng `Immer`
  + Export các `slice reducer` và các `actions` được tạo
+ **Sử dụng `useSelector/useDispatch` trong React component**
  + Đọc dữ liệu từ `store` sử dụng `useSelector`
  + Lấy ra `dispatch` từ `useDispatch` để `dispatch` các `action` cần thiết
:::
- [**Setup với Typescript**](https://redux.js.org/tutorials/typescript-quick-start)