# useSyncExternalStore
- `useSyncExternalStore` là 1 hook cho phép đăng ký một store bên ngoài
```js
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```
## Tham số
### subscribe
- Là 1 hàm nhận 1 đối số là `callback` và đăng ký nó vào store.
- Khi store thay đổi, nó sẽ gọi `callback` thực thi.
- Điều này làm cho component re-render
- `subscribe` nên trả về 1 function dùng để `cleanup`, xóa đăng ký `store`
- `store` có là nơi mà nó dùng để lấy dữ liệu: window, history vv
```js
function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}
```
- `store` trong ví dụ này chính là window
### getSnapshot
- Là 1 hàm trả về `snapshot` của dữ liệu lữu trữ trên store mà component cần.
- Khi store không thay đổi,các lệnh gọi `getSnapshot` sẽ trả về cùng một giá trị
- Nếu store thay đổi và giá trị trả về khác với giá trị trước, React sẽ re-render lại component đó
- `snapshot` có thể hiểu là dữ liệu cần lấy để hiển thị hoặc làm gì đó
```js
const history = useHistory();
const hash = useSyncExternalStore(history.listen, () =>
   (history) => history.location.hash
  );
  return <div>{hash}</div>;
```
- `hash` chính là `snapshot` mà `getSnapshot` return ra
### getServerSnapshot
- Là hàm trả về `snapshot` ban đầu của dữ liệu trong `store`
- Nó chỉ được sử dụng trong quá trình render ở máy chủ và trong quá trình hydrat do máy chủ render trên máy khách
- `snapshot` ở máy chủ phải giống ở máy khách. Nếu bỏ qua đối số này, việc hiển thị component ở máy chủ sẽ gây ra lỗi.
## Return
- `useSyncExternalStore` trả về `current snapshot` của store nơi bạn có thể sử dụng trong quá trình render
## Cách sử dụng
### Đăng ký một store bên ngoài
- Thông thường component của bạn sẽ đọc data từ `props`,`state`,`context`. Tuy nhiên đôi khi component cần đọc dữ liệu từ `store` bên ngoài, cái mà có thể thay đổi theo thời gian như : 
*Các thư viện quả lý state bên ngoài React*
*Dữ liệu từ API ném ra giá trị có thể thay đổi và các sự kiện có thể đăng ký các thay đổi đó*
```js
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  // ...
}
```
- Return `snapshot` của data trong `store`. Cần truyền đối số là 2 function 
- `subscribe function` : Đăng ký `store` và return function dùng để hủy đăng ký
- `getSnapshot function` đọc `snapshot` của dữ liệu từ store
- React sẽ sử dụng các function này để giữ cho component đăng ký vào store và re-render lại khi có thay đổi
## Tổng quát
- [Tìm hiểu thêm](https://thisweekinreact.com/articles/useSyncExternalStore-the-underrated-react-api)