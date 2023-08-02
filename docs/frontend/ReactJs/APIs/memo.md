# Memo

- `memo` cho phép bạn bỏ qua việc component re-render khi props không thay đổi
- `memo` return 1 component mới. Nó hoạt động giống như component được cung cấp Ngoại trừ việc React sẽ không re-render lại nó khi cha me nó được re-render trừ khi props thay đổi

```js
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

## Các thành phần

### memo(Component, arePropsEqual?)

- Bọc component trong `memo` để có phiên bản ghi nhớ của cpn đó
- Phiên bản này thường không bị re-render khi `props` không có sự thay đổi

```js
import { memo } from "react";

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

- Component : Chính là component mà bạn muốn ghi nhớ. `memo` không sửa đổi component mà chỉ trả về component mới đã được ghi nhớ
- arePropsEqual : Là 1 hàm nhận 2 đối số (props cũ, props mới). Nó return true nếu props cũ và `props` mới bằng nhau và component không bị re-render. Ngược lại false thì cpn re-render. Mặc định chúng ta không cần chỉ định trường này

## Cách sử dụng

### Bỏ qua lần re-render khi `props` không thay đổi

- React sẽ tự động re-render 1 component khi component cha re-render
- Với `memo`, component sẽ không bị re-render trừ `props` mới khác `props` cũ.
- Nhưng component như vậy được coi là đã ghi nhớ.

```js
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

### Cập nhật 1 component được ghi nhớ bằng state

- Cho dù component được `memoized`. Nó vẫn sẽ bị re-render khi `state` trong component thay đổi
- `Memoization` chỉ hoạt động khi `props` được truyền xuống từ component cha

### Cập nhật 1 component được gi nhớ bằng context

- Component được memo vẫn sẽ re-render khi `context` của nó thay đổi

## Tổng quát

- `memo` giúp ghi nhớ lại component để tránh re-render khi component cha re-render + props không thay đổi
