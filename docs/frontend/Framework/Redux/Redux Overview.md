# Redux Overview.md

## Redux là gì ?

- `Redux` là 1 `pattern` và `libray` để quản lý và cập nhật trạng thái ứng dúng, sử dụng các sự kiện gọi là `actions`/ Nó phục vụ như một kho lưu trữ tập trung cho trạng thái cần được sử dụng trên toàn bộ ứng dụng của bạn.
- 1 `store` duy nhất chứa `state` global
- Gửi các hành động đến `store` khi có điều gì đó xảy ra trong app
- Các `reducer` xem xét các hành động đó và trả về `state` được cập nhật

## Thuật ngữ và khái niệm trong Redux

### Immutability (tính bất biến)

- `Mutable` nghĩa là có thể thay đổi. Nếu cái gì đó `immutable` có nghĩ là không thể thay đổi được
- Mặc định, `object` và `array` trong javascript đều là `mutable`, tức là có thể thay đổi được
- Vd : Thay đổi nội dung trong `object`, thay đổi phần tử trong mảng

```js
const obj = { a: 1, b: 2 };
// still the same `object` outside, but the contents have changed
obj.b = 3;

const arr = ["a", "b"];
// In the same way, we can change the contents of this `array`
arr.push("c");
arr[1] = "d";
```

- Điều này được gọi là `mutating`, thay đổi `object` hoặc `array`
- Nó vẫn là cùng 1 tham chiếu của `object` hoặc `array` đó trong bọ nhớ, nhưng bây giờ nội dung bên trong đã thay đổi
- Để cập nhật giá trị một cách `immutably`, mã của bạn phải tạo các bản sao của `object`/`array` hiện có, sau đó sửa đổi các bản sao đó.
- Thông thường chúng ta sẽ sử dụng `spreads` `array`/`object`, hoặc các method trả về bản sao mới thay vì sử dụng mảng ban đầu.
- Redux kì vọng tất cả các cập nhật được thực hiện 1 cách `immutably`
:::danger
Hãy nhớ rằng: các hàm `reducer` phải luôn tạo các giá trị state mới một cách `immutably`, bằng cách tạo các bản sao! 
Sẽ an toàn khi gọi các hàm `mutating` như `Array.push()` hoặc sửa đổi các trường đối tượng như `state.someField = someValue` bên trong `createSlice()`, bởi vì nó chuyển đổi các `mutations` đó thành các bản cập nhật `immutable` an toàn bên trong bằng cách sử dụng thư viện `Immer`, nhưng đừng cố thay đổi bất kỳ dữ liệu nào bên ngoài createSlice!
:::

### Actions

- `action` là 1 object đơn giản với trường `type`.
- `action` là một sự kiện mô tả những gì diễn ra trong ứng dụng
- `type` trong `action` là 1 chuỗi mô tả hành động này
  - Chuỗi thường có dạng : `tên miền/tên sự kiện`: `todos/todoAdded`
  - Phần đầu tiên sẽ là tính năng, danh mục thuộc về hành động
  - Phần thứ hai là sự việc cụ thể xảy ra
- `action` có thể chứa thêm trường khác chứa thông tin bổ sung về những gì đã xảy ra : `payload`

```js
const addTodoAction = {
  type: "todos/todoAdded",
  payload: "Buy milk",
};
```

### Actions Creators

- Là hàm trả về một đối tượng `action`. Thường sử dụng những thứ này để không phải viết lại đối tượng `action` bằng tay mỗi lần :

```js
const addTodo = (text) => {
  return {
    type: "todos/todoAdded",
    payload: text,
  };
};
```

### Reducers

- Tương tự như việc lắng nghe 1 sự kiện dựa trên `type` của `action` truyền đi
- Là 1 functions nhật vào 2 tham số `current state` và `action` object
- Nó quyết định xem `state` cập nhật như thế nào và sẽ return `new state`
- Khái quát : `(state,action)=> newState`
- `Reducers` phải tuân theo :
  - `newState` chỉ tính toán dựa trên 2 tham số là `state` và `action`
  - Không được chép sửa đổi `state` hiện tại. Hay update `state` 1 cách `immutable` bằng cách sao chép `state` hiện tại và thực hiện thay đổi trên bản sao chép đó.
  - **Không thực hiện các logic bất đồng bộ**

### Store

- Nơi chứa `state` của ứng dụng `Redux` hiện tại gọi là `store`
- `store` được tạo bằng việc truyền reducer vào trong đó và có phương thức `getState` trả về `state` hiện tại

```js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: counterReducer });

console.log(store.getState());
// {value: 0}
```

- Redux store cần phải có 1 hàm `root reducer` duy nhất chứa nhiều các slice reducer trong ứng dụng của chúng ta.
- Redux có 1 function gọi là combineReducer để gộp các reducer lại làm 1 reducer duy nhất

```js
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
```

### Dispatch

- Redux `store` có 1 phương thức gọi là `dispatch`
- Đây là cách duy nhất để cập nhật `state` là gọi đến `store`.`dispatch()` và truyền vào `action` object
- `store` sẽ chạy nó trong `reducer` và lưu `newState` bên trong, lúc này có thể gọi `getState()` để nhận `state` sau khi update

### Selector

- Là 1 function giúp bạn lấy ra `state` trong `store`

```js
const selectCounterValue = (state) => state.value;

const currentValue = selectCounterValue(store.getState());
console.log(currentValue);
// 2
```

## Luồng dữ liệu trong ứng dụng Redux

- **Thiết lập ban đầu :**
  - `Redux store` được tạo sử dụng root reducer
  - `store` gọi root reducer lần đầu và lưu giá trị trả về như là `Initial state`
  - Khi UI render lần đâu, UI component sẽ truy cập vào `state` hiện tại trong Redux `store` và dùng data đó để render
  - UI component cũng sẽ lắng nghe bất kì bản update `store` để có thể biết `state` đã được thay đổi.
- **Cập nhật :**
  - Điều gì đó diễn ra trong app, như là user click button
  - Khi `dispatch` 1 `action` đến Redux,vd : `dispatch({type: 'counter/increment'})` trong hàm sử lý sự kiện click button
  - `Store` sẽ chạy reducer lại với `state` trước đó và `action` hiện tại, sau đó sẽ lưu và trả về giá trị chính là `newState`
  - `Store` sẽ thông báo cho tất cả các component UI rằng `store` đã được update
  - Mỗi UI component cần dữ liệu nào từ `store` sẽ kiểm tra xem liệu `state` của họ cận có thay đổi hay không
  - Nếu UI component nhìn thấy dữ liệu của nó đã thay đổi thì sẽ re-render lại với dữ liệu mới, và cập nhật `state` mới đó lên màn hình

![Luồng hoạt động Redux](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)
