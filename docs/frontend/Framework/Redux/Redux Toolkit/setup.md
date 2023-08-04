---
title: Setup Redux Toolkit
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
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {},
});
```

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

## Tạo 1 Redux Slice chứa state và các reducer

- Để tạo 1 `slice` qua `createSlice` yêu cầu:
  - Tên của `slice` đó
  - Giá trị `state` ban đầu
  - Một hoặc nhiều hàm `reducer` để xác định cách update `state`
- Khi 1 `slice` được tạo, chúng ta sẽ `export` :
  - Các `action` ở trong `reducers` thông qua `slice.actions`
  - `Slice` vừa tạo như một `reducer` thông qua `slice.reducer`

```js title=features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

- `Slice` cũng tựa như `Reducer` đều chứa `initialState` và `action`
- Thay vì sử dụng `switch-case` như `reducer` thì `slice` sử dụng function và `export` ra từng `action` sẽ dễ nhìn và gọn gàng hơn

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