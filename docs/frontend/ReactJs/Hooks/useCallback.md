# useCallBack
`useCallback` là 1 hook cho phép bạn cache 1 function giữa các lần re-render, lưu trữ giá trị tham chiếu của function đó vào bộ nhớ đệm sau mỗi re-render

```js
const cachedFn = useCallback(fn, dependencies)
```
## Tham số trong useCallback
### fn
- Là function mà bạn muốn cache
- React sẽ trả về chứ không gọi lại
- Trong lần render tiếp theo, React sẽ trả về function tương tự nếu `dependencies` không thay đổi kể từ lần render cuối cùng
- React sẽ cung cấp function mà bạn muốn dùng trong lần render hiện tại và lưu trữ nó trong trường hợp có thể sử dụng lại sau này
### dependencies
- Danh sách tất cả các giá trị được sử dụng trong **fn**
- Danh sách các dependencies thường được viết như `[dep1,dep2,dep2]`. React sẽ so sánh từng `dep` với giá trị trước đó bằng Object.is

## Return
- Lần render đầu tiên : `useCallack` return **fn** mà bạn đã truyền vào
- Trong các lần render tiếp theo : `useCallback` return **fn** được lưu trữ lại từ lần render trước đó
## Cách sử dụng
### Tránh việc re-render của component
- Cache function mà bạn truyền qua props vào component con
```js
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  //// Every time the theme changes, this will be a different function...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  return (
    <div className={theme}>
    {/* ... so ShippingForm's props will never be the same, and it will re-render every time */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
------
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```
- `ShippingForm` sẽ không bị re-render nếu tất cả props giống với props của lần render trước.

### Cập nhật state bên trong `useCallback`
- Đôi khi bạn muốn update state dựa trên state trước đó từ trong `useCallback`
```js
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    //setTodos([...todos, newTodo]);
    setTodos(todos => [...todos, newTodo]);
  }, [/*todos*/]); // ✅ No need for the todos dependency
  // ...
```
## Ngăn chặn Effect(useEffect) kích hoạt không mong muốn
- Đôi khi bạn muốn gọi 1 function bên trong Effect 
```js
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Only changes when roomId changes

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ Only changes when createOptions changes
}
```
- Hoặc muốn tối ưu hơn nữa có thể viết hết vào useEffect và truyền `dependencies` là `roomId`

### Tối ưu hóa với customHook
- Nếu bạn muốn viết 1 customHook, bạn nên bọc các funtion mà bạn muốn trả ra bằng `useCallback`

## Các sự cố thường gặp với useCallback
### Component re-render, useCallback return a different function
- Khi component re-render, useCallback trả về một function mới, bạn nền truyền dependencies vào useCallback, không nên sử dung `useCallback` ko có dependencies
```js
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }); // 🔴 Returns a new function every time: no dependency array
  [productId, referrer]); // ✅ Does not return a new function unnecessarily
  // ...
```
### Sử dụng useCallback trong vòng lặp
- Ví dự component còn được bọc bởi `memo` và bạn muốn tránh việc re-render mỗi khi component cha thay đổi bằng việc sử dụng `useCallback`
- Tuy nhiên khi sử dụng vòng lặp, chúng ta ko thể sử dụng `useCallback` trong vòng lặp được

```js
function ReportList({ items }) {
  return (
    <article>
      {items.map(item => {
        // 🔴 You can't call useCallback in a loop like this:
        const handleClick = useCallback(() => {
          sendReport(item)
        }, [item]);

        return (
          <figure key={item.id}>
            <Chart onClick={handleClick} />
          </figure>
        );
      })}
    </article>
  );
}
```
- Bạn phải tạo component con khác chứa `useCallback` và chứa component con bọc `memo`
```js
function ReportList({ items }) {
  return (
    <article>
      {items.map(item =>
        <Report key={item.id} item={item} />
      )}
    </article>
  );
}

function Report({ item }) {
  // ✅ Call useCallback at the top level:
  const handleClick = useCallback(() => {
    sendReport(item)
  }, [item]);

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
}
```
- 1 cách tối ưu hơn nữa là bạn bọc `Report` component vào memo, khi nào item thay đổi thì component mới bị re-render lại, tránh việc dùng useCallback

## Tổng quát
- `useCallback` dùng để cache funtion, lưu tham chiếu
- Khi truyền prop là 1 function vào `memo(component con)`, sử dụng `useCallback` function đó để tránh functio con re-render
- Nếu dependencies của 1 `useEffect` là 1 function, để tránh Effect chạy ko mong muốn, sử dụng `useCallback` cho function đó.
- Nếu bạn muốn viết 1 customHook, bạn nên bọc các funtion mà bạn muốn trả ra bằng `useCallback`