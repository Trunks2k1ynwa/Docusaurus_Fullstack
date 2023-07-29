# useRef
- `useRef` là 1 hook cho phép bạn tham chiếu đến 1 giá trị cái mà không cần thiết trong quá trình render
- `useRef` trả về 1 object với 1 thuộc tính duy nhất là `current`
```js
const ref = useRef(initialValue)
```
## Tham số
- `initialValue` : Giá trị ban đầu bạn muốn gán cho đối tượng tham được tham chiếu. Giá trị này sẽ bị loại bỏ sau lần render đầu tiên
- `ref` là 1 object với thuộc tính duy nhất là `current`
- Ban đầu, `ref.current` sẽ được gán với `initialValue`
- Bạn có thể chuyền `ref` cho react dưới dạng thuộc tính ref cho JSX node, react sẽ đặt `ref.current` bằng node đó

## Cách sử dụng
### Tham chiếu 1 giá trị với ref
-  `useRef` return tham chiếu của 1 object với thuộc tính duy nhất là `current` mặc định được gán với giá trị đã cung cấp
- Trong những lần component re-render,`useRef` sẽ luôn trả về cùng 1 object. Bạn có thể thay đổi thuộc tính `current`
- Thay đổi `ref` sẽ không kích hoạt component re-render
- Ta có thể sử dụng `ref` để lưu trữ các thông tin không ảnh hướng đến output của component
```js
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000);
  intervalRef.current = intervalId;
  const intervalId = intervalRef.current;
  clearInterval(intervalId);
}
```
- `useRef` lưu trữ thông tin giữa các lần re-render ( không giống như các biến, bị reset sau re-render)
- `useRef` không kích hoạt re-render khi thay đổi giá trị ( không giống như `state`)
### Thao tac dom với ref
- Đây là điều rất phổ biến và được React tích hợp
```js
import { useRef } from 'react';
function MyComponent() {
  const inputRef = useRef(null);
  return <input ref={inputRef} />;
}
```
- React tạo Dom node và vẽ lên screen
- React sẽ set `current` = Dom node
- React set set `current` = null khi node đó được remove khỏi Dom

## Chú ý
- Bạn nên đọc và ghi `refs` từ event handlers hoặc effect để giúp cho component được `pure`
- Khi truyền `ref` dưới dạng props ở component còn thì phải có `fowardRef`
- [Test useRef](http://localhost:3000/hooks/useRef)
- 