# useState
- `useState` là 1 hook cho phép bạn thêm biến trạng thái vào component
```js
const [state, setState] = useState(initialState);
```
## Tham số
### initialState
- `initialState` là giá trị ban đầu của state. Nó có thể là bất kì kiểu dữ liệu nào
- Nếu `initialState` là 1 function, nó sẽ được coi như 1 hàm khởi tạo, hàm này phải là pure function, React sẽ gọi hàm khởi tạo khi khơi tạo component, save giá trị trả về của nó làm trạng thái ban đầu
## Return
- `useState` return 1 array với hai phần tử :
  1. `state`. Ở lần render đầu tiên, `state` = `initialState`
  2. `set function` cho phép bạn cập nhật `state` và kích hoạt việc `re-render`

## set function
- Cập nhật `state` và re-render componet
```js
  setName('Taylor');
  setAge(a => a + 1);
```
- React sẽ bỏ qua việc re-render nếu `state` cần update bằng với `state` trước đó
- React sẽ update nhiều `state` và re-render lại 1 lần duy nhất thay vì sẽ re-render lại khi có `set function`. Đây là cơ chết **batching state update**
