# useId
- `useId` là 1 hook cho phép bạn tạo ra các ID duy nhất để dùng cho các thuộc tính cần thiết trong component
- `useId` không có tham số truyền vào
- `useId` return 1 chuỗi `ID` duy nhất
- `useId` không nên dùng để tạo ra `key` của 1 danh sách
```js
const id = useId()
```

## Cách sử dụng
### Sử dụng cho các thuộc tính
- Thuộc tính `aria-describedby` cho phép bạn chỉ định hai thẻ có liên quan với nhau
- Tuy nhiên khi khi để giá trị bằng chuỗi nào đó thì không tốt trong React. Có thể chuỗi đó suất hiện ở ID của trang khác làm cho nó không có tính duy nhất
- Sử dụng `useId` để tạo ra ID duy nhất làm thuộc tính cho các thẻ có liên quan theo ID đó
```js
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  <>
    <input type="password" aria-describedby={passwordHintId} />
       <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
  </>
}
```
- Ngay cả khi `PasswordField` xuất hiện nhiều lần thì các ID cũng sẽ không xung đột
```js
export default function App() {
  return (
    <>
      <h2>Choose password</h2>
      <PasswordField />
      <h2>Confirm password</h2>
      <PasswordField />
    </>
  );
}
```
- `useId` sẽ tạo ra các `ID` duy nhất qua mỗi lần re-render.
## Tạo ra các ID cho các thành phần liên quan
```js
  <form>
      <label htmlFor={id + '-firstName'}>First Name:</label>
      <input id={id + '-firstName'} type="text" />
      <hr />
      <label htmlFor={id + '-lastName'}>Last Name:</label>
      <input id={id + '-lastName'} type="text" />
  </form>
```
## Chú ý
- Với server rendering, `useID` yêu cầu 1 cấu trúc cây giống nhau ở cả `server` và `client`. Nếu cây không giống nhau trên `server` và `client` thì ID tạo ra sẽ không trùng nhau