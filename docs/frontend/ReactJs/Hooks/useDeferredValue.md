---
title: useDefferedValue
authors:
  name: Trunks
  title: Doc useDefferedValue
  url: https://github.com/wgao19
  image_url: https://github.com/wgao19.png
tags: [Trì hoãn update state, update in background]
---
# useDefferedValue
- `useDefferedValue` là 1 hook cho phép bạn trì hoãn lại việc cập nhật `state` trong bản cập nhật hiện tại
- Được sử dụng cho các thành phần UI tốn nhiều thời gian để tải, giảm hiện tượng lag, trễ.
- Nó cho phép trì hoãn việc cập nhật giá trị `state` cho đến khi các tác vụ ưu tiên đã hoàn thành.
- Sau đó nói mới cập nhật ở chế độ background

```js
const deferredValue = useDeferredValue(value)
```
## Tham số
- `value` : Giá trị mà bạn muốn trì hoãn
## Return
- Render lần đầu, trả về `deferredValue` chính là `value` mà bạn đã cung cấp
- Khi update, React sẽ re-render với `state` cũ, vì vậy `deferredValue` = `state` cũ
- Sau đó sẽ thử re-render trong nền với giá trị mới, khi render hoàn thành mới gán `deferredValue` = `state` mới
## Lưu ý
- Giá trị truyền vào trong `useDeferredValue` phải là chuỗi hoặc số hoặc 1 object được tạo ra bên ngoài component.
- `useDeferredValue` tương thích với `Suspense`. Cập nhật nền khi có `value` mới `suspense` UI. user sẽ không thấy `fallback` mà sẽ thấy giá trị cũ cho đến khi tải dữ liệu
## Cách sử dụng
### Hiển thị nội dung cũ trong khi đang tải nội dung mới
- Gọi `useDefferedValue` sẽ trì hoãn việc cập nhật 1 vài phần trong UI
```js
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```
- First render, `deferredQuery` = `query`
- Update state `query`, `deferredQuery`không gán với state `query` mới
- React re-render nhưng không cập nhật `deferredQuery`
- Sau đó re-render với giá trị mới nhận được trong nền
- Khi giá trị mới được render ra UI thì `deferredQuery` mới update với giá trị mới này

### Cho biết nội dung đã cũ
- Trong trường hợp kết quả của truy vấn mới nhất mất nhiều thời gian
- User không biết kết quả đang được tải hay không
- Để cho người dùng biết rằng danh sách kết quả hiện tại không phải là truy vấn mới nhất, bạn có thể làm như sau
```js
<div style={{
  opacity: query !== deferredQuery ? 0.5 : 1,
}}>
  <SearchResults query={deferredQuery} />
</div>
```

### Trì hoãn re-render cho 1 phần của UI
- Bạn muốn 1 phần của UI re-render chậm hơn các UI khác mà ko làm ảnh hướng đến các UI khác.
- Xác định độ ưu tiên để hiển thị trước
```js
function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
const SlowList = memo(function SlowList({ text }) {
  // ...
});
function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
  }

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}
```
- Khi cập nhật state `text`, value trong input sẽ thay đổi
- Render UI ShowList -> ShowItem
- ShowItem mất 1 khoảng thời gian mới render nên sẽ gây hiện tượng lag, trễ
- Lúc này khi change Input làm update state `text` mới
- Do `ShowItem` vẫn chưa render xong nên value trong input sẽ bị trễ và không hiển thị cho đến khi `ShowItem` render xong
- Điều này làm cho UI/UX trở nên tệ hơn.
- Thay vào đó nên dùng `useDeferredValue` để sử dụng giá trị `text` cũ cho UI cần nhiều thời gian để cập nhật, mà không làm ảnh hưởng đến UI khác (value trong input)
## Tổng quát
- `useDeferredValue` giúp trì hoãn việc update UI khi component re-render
- `useDeferredValue` hiển thị UI cũ cho đến khi UI mới được loading xong
- `useDeferredValue` thường sử dụng cho ứng dụng tìm kiếm
- `state` và `deferredText` tương ứng với hai trạng thái mới và cũ khi cập nhật UI
- `state` cập nhật, UI sẽ vẫn dùng `deferredText` để hiển thị UI của dữ liệu cũ cho đến khi `state` được cập nhật trong UI dưới nền xong thì `deferredText` = `state`
- Giá trị trả về `useDeferredValue` có thể được trì hoản so với giá trị thực tế để React ưu tiên những cập nhật khác quan trọng hơn.
- [Test useDeferredValue](http://localhost:3000/hooks/UseDeferredValue)
