# Lazy

- `Lazy` cho phép bạn trì hoãn việc tải component cho đến khi nó được render lần đầu tiên

```js
const SomeComponent = lazy(load);
```

## Các thành phần

### lazy(load)

- Gọi `lazy` bên ngoài component của bạn để định nghĩa một component khác được tải chậm

```js
import { lazy } from "react";

const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
```

- `load` là 1 function return `Promise` hoặc 1 đối tượng giống như `Promsie` với method then
- React sẽ không gọi load cho đến lần đầu tiên bạn render component
- Sau đó, React sẽ gọi `load`, nó sẽ đợi cho đến khi `resolve` và sau render `resolve` dưới dạng react component
- Các `Promise` được trả về và giá trị `resolve` của `Promise` sẽ được cached
- Vì vậy React sẽ không gọi nhiều hơn 1 lần
- Nếu `Promise` reject, React sẽ ném lý do `Error` vào `Error Boundary` gần nhất để xử lý

## Cách sử dụng

### Lazy component với Suspense
```js
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

```
- Để chỉ định những gì sẽ được hiển thị trong khi component đang tải. Bạn có thể sử dụng `Suspense` bằng cách gói component cha me, hoặc chính nó vào `Suspense`

```js
<Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
</Suspense>
```
