# useReducer
- `useReducer` là 1 hook cho phép bạn thêm `reducer` vào component
```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```
## Tham số
- `reducer` : Đây là 1 funtion thực thi việc update state như thế nào. Nhận hai tham số là `state`,`action` và return `next state`. Nó phải là pure function.
- `initialArg` : Tham số được dùng tính toán `init state` trong lần render đầu tiên qua đối số `init` 
- `init` : Hàm khởi tạo để trả về `init state`. Nếu nó không được chỉ định thì `init state` = `initialArg`. Mặt khác thì `init state` = `init(initialArg)`
## Return
- useReducer trả về 1 array với 2 giá trị :
  1. `state` hiện tại. Trong lần render đầu tiên, `state` = `init(initialArg)` hoặc `initialArg` (Nếu không có `init`).
  2. `dispatch` là 1 function cho phép bạn cập nhật state với giá trị khác và kích hoạt re-render
## dispatch function
- Được return bởi `useReducer` để cập nhật `state` và kích hoạt re-render
- Bạn cần truyền `action` là đối số duy nhất của function `dispatch`

```js
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
  dispatch({ type: 'incremented_age' });
  // ...
}
```
## Cách sử dụng
### Thêm reducer vào component
- `useReducer` trả về 1 mảng với hai phần tử 
- `current state`, ban đầu được đặt thành giá trị mà bạn cung cấp
- `dispatch` cho phép thay đổi `current state`
```js
function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
}
```
- Cập nhật `current state`
```js
function handleClick() {
  dispatch({ type: 'incremented_age' });
}
```
- Sau khi `dispatch` 1 `action`, `reducer` sẽ tính toán và trả về `state updated`
- React sẽ lưu trữ `state updated` và render component với giá trị này -> update UI
### Thiết kế reducer function
- `reducer` được khai báo như sau:
```js
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}
```
- `action` theo quy ước là 1 object với thuộc tính `type`, ngoài ra có thể có các thuộc tính khác chứa thông tin cần thiết cần truyền xuống `reducer`
```js
 function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }
```
- Trong `reducer` nên trả về `state` mới, tránh thay đổi `state` ban đầu. `state` thì chỉ được đọc, không nên sửa
### Tránh tạo lại state ban đầu
- Khi bạn truyền trong `useReducer` `createInitialState(username)`
- Hàm này được gọi để trả ra `initial state`, điều này gây lãng phí sau mỗi lần re-render
- Thay vào nó nên viết như dưới để tránh việc invok function này nhiều lần
```js
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
}
  // ...
```

## Vấn đề thường gặp
### Dispatch action nhưng hiển thị vẫn ra state cũ
- Khi `dispatch` action trong function handler thì sẽ chỉ yêu cầu cập nhật `state` chứ không cập nhật `state` ngay lập tức nên sẽ chỉ hiện thị `state` cũ trong function đó
- Để lấy `state` mới có thể sử dụng
```js
const action = { type: 'incremented_age' };
dispatch(action);

const nextState = reducer(state, action);
console.log(state);     // { age: 42 }
console.log(nextState); // { age: 43 }
```
### Đã dispatch 1 action nhưng UI không cập nhật
- React sẽ bỏ qua cập nhật nếu `state` cũ trùng với `state` mới qua phép so sánh Object.is
- Bạn không được thay đổi `state` và return `state` sau khi đã thay đổi đó làm `state` mới
- Bạn phải chắc chắn luôn luôn update object, array trong `state` cũ và trả ra `state` mới thay vì biến đổi `state cũ`
```js
case 'incremented_age': {
      // 🚩 Wrong: mutating existing object
      state.age++;
      return state;
    }
case 'changed_name': {
      // 🚩 Wrong: mutating existing object
      state.name = action.nextName;
      return state;
}
//// Should use
case 'incremented_age': {
  // ✅ Correct: creating a new object
  return {
    ...state,
    age: state.age + 1
  };
}
case 'changed_name': {
  // ✅ Correct: creating a new object
  return {
    ...state,
    name: action.nextName
  };
}
```
- [Test useReducer](http://localhost:3000/hooks/useReducer)