# Redux Core

## Redux core làm gì
Redux core là 1 thư viện rất nhỏ, nó cung cấp cá API nguyên thủy như :
- `createStore` : Tạo ra Redux store
- `combineReducers` : Kết hợp nhiều `slice` reducer thành một `reducer` lớn
- `applyMiddleware` : Kết hợp nhiều middleware vào bên trong store duy nhất
- `compose` : Kết hợp nhiều store thành 1 store duy nhất

### Ví dụ về redux core
```js title=counterReducer.js
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}
```
```js title=store.js
import { createStore, combineReducers } from "redux";
import counterReducer from "./counter.js";

const reducer = combineReducers({
  // key : value
  counter: counterReducer,
});
const store = createStore(reducer);
// const store = createStore(counterReducer)
export default store;
store.dispatch({ type: 'counter/incremented' })
// {value: 1}
```
- Setup như trên thì khá dài dòng và không tối ưu trong việc sử dụng các tiện tích,API từ Redux
- Vấn đề cập nhật `state` thường sẻ sử dụng spreads, array operations -> dễ gây ra lỗi vì làm cho `state` bị `mutate`
- `Store` được setup như trên sẽ không sử dụng được các `middleware` như `thunks`, `saga` và sẽ không tương thích được với `Redux Devtools`