# useDefferedValue
- `useDefferedValue` là 1 hook cho phép bạn trì hoãn lại việc cập nhật 1 phần trong UI
```js
const deferredValue = useDeferredValue(value)
```
## Tham số
- `value` : Giá trị mà bạn muốn trì hoãn
## Return
- Render lần đầu, trả về `deferredValue` chính là `value` mà bạn đã cung cấp
- Khi update, React sẽ re-render với giá trị cũ, vì vậy sẽ return giá trị cũ. Sau đó sẽ thử re-render trong nền với giá trị mới( vì vậy nó sẽ trả về giá trị được cập nhật)
## Cách sử dụng
### Hiển thị nội dung cũ trong khi đang tải nội dung mới
- Gọi `useDefferedValue` sẽ trì hoãn việc cập nhật 1 vài phần trong UI
```js
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```
- First render, `deferredQuery` = `query`
- Update state `query`, `deferredQuery`không gán với state `query` mới
- React re-render nhưng không cập nhật `deferredQuery`
- Sau đó re-render với giá trị mới nhận được trong nền

