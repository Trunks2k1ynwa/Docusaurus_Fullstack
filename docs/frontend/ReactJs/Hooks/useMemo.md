# useMemo
- `useMemo` là 1 hook cho phép bạn cache giá trị của việc tính toán giữa các lần re-render
```js
const cachedValue = useMemo(calculateValue, dependencies)
```
## Tham số
### calculateValue
- Là 1 function tính toán giá trị mà bạn muốn cache
- Function này nên là pure function( ko có tham số)
- React sẽ gọi function này trong lần render đầu tiên
- Ở lần render tiếp theo, React sẽ return giá trị của lần tính toán trước nếu `dependencies` không thay đổi
- Nếu `dependencies` thay đổi, sẽ thực hiện tính toán lại calculateValue
- Kết quả trả về được lưu trữ và sử dụng trong lần tiếp theo
### dependencies
- Danh sách tất cả các giá trị được sử dụng trong **fn**
- Danh sách các dependencies thường được viết như `[dep1,dep2,dep2]`. React sẽ so sánh từng `dep` với giá trị trước đó bằng Object.is
## Return
- Lần render đầu tiên : `useMemo` return ra kết quả của `calculateValue` với không có tham số
- Trong các lần render tiếp theo : `useMemo` return `calculateValue` được lưu trữ lại từ lần render trước đó

## Cách sử dụng
### Bỏ qua những tính toán tốn kém
- Để cache giá trị tính toán giữa các lần re-render, bọc nó bên trong `useMemo`
```js
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```
### Tránh re-render của component
- Trong 1 số trường hợp, `useMemo` có thể giúp tối ưu hiệu suất, tránh re-rendering ở component con bằng việc catch giá trị props truyền xuống component con
```js
export default function TodoList({ todos, tab, theme }) {
   // theme changes, this will be a different array...
  const visibleTodos = filterTodos(todos, tab);

  // to cache your calculation between re-renders...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...so as long as these dependencies don't change...
  );
  return (
    <div className={theme}>
    {/* ...List will receive the same props and can skip re-rendering */}
      <List items={visibleTodos} />
    </div>
  );
}

const List = memo(function List({ items }) {
  // ...
});
```
- Ngoài ra, bạn cũng có thể bọc `List` trong memo, hai cách này hoạt động tương tự nhau nhưng bọc jsx trong memo có nhiều điểm ko thuật tiện
```js
export default function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
  return (
    <div className={theme}>
      {children}
    </div>
  );
}
```
### Sử dụng giá trị của useMemo làm dependency của hook khác
- Trong 1 số trườngh hợp, bạn có thể sử dụng giá trị tính toán của `useMemo` làm dependency của các hook khác như `useMemo`,`useCallback`,`useEffect`
### Cache 1 function
- Để ghi nhớ 1 hàm bằng `useMemo`, hàm tính toán của bạn sẽ phải trả về một hàm khác
```js
export default function Page({ productId, referrer }) {
  const handleSubmit = useMemo(() => {
    return (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails
      });
    };
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```
- Trong những trường hợp này, bạn nên sử dụng `useCallback` sẽ phù hợp hơn và tránh function lồng nhau

## Các sự cố thường gặp với useMemo
### Hàm tính toán chạy 2 lần sau mỗi lần re-render
- Thông thường với chế độ `strict mode`, component sẽ render hai lần
- Ở chế độ phát triển, hành vi này giúp cho bạn giữ `component pure`
- Miễn các hàm tính toán và component pure thì sẽ ko ảnh hương đến logic
- Tuy nhiên, chẳng may chúng `mutate` bất biến, điều này sẽ tạo ra `impure` và bạn gặp phải lỗi.
```js
const visibleTodos = useMemo(() => {
    // 🚩 Mistake: mutating a prop
    todos.push({ id: 'last', text: 'Go for a walk!' });
    const filtered = filterTodos(todos, tab);
    return filtered;
  }, [todos, tab]);
```
- Sau 2 lần render ở `strict mode`, `todos` sẽ push vào 2 lần làm cho prop thay đổi, ko được pure
- todos là 1 prop được truyền vào trong dependencies, prop chỉ nên truyền vào sử dụng chứ không nên thay đổi
```js
  const visibleTodos = useMemo(() => {
    const filtered = filterTodos(todos, tab);
    // ✅ Correct: mutating an object you created during the calculation
    filtered.push({ id: 'last', text: 'Go for a walk!' });
    return filtered;
  }, [todos, tab]);
```
- Khi sửa lại như sau, prop todos không bị thay đổi và logic vẫn như thế

### useMemo hỗ trợ return 1 object, nhưng lại return undefined
- Trường hợp lỗi
```js
 // 🔴 You can't return an object from an arrow function with () => {
  const searchOptions = useMemo(() => {
    matchMode: 'whole-word',
    text: text
  }, [text]);
```
- Sửa lại như sau
```js
  // ✅ This works and is explicit
  const searchOptions = useMemo(() => {
    return {
      matchMode: 'whole-word',
      text: text
    };
  }, [text]);
```
### Mỗi khi component re-render, hàm tính toán trong useMemo chạy lại
Thông thường có 1 số lý do như sau :
- Không truyền dependencies
- Truyền dependencies không chính xác

### Sử dụng useMemo trong vòng lặp
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
  // ✅ Call useMemo at the top level:
  const data = useMemo(() => calculateReport(item), [item]);
  return (
    <figure>
      <Chart data={data} />
    </figure>
  );
}
```
- Items thay đổi -> ReportList re-render -> Report re-render -> Chart re-render
- Trường hợp các item trong Items giống nhau thì việc Chart re-render lại là không cần thiết
- Khi sử dụng `useMemo`, item thay đổi thì Chart re-render
- Ngoài ra, bạn cũng có thể sử dụng memo thay vì useMemo
```js
const Report = memo(function Report({ item }) {
  const data = calculateReport(item);
  return (
    <figure>
      <Chart data={data} />
    </figure>
  );
});
```
- item thay đổi thì Report re-render -> Chart re-render
- item không thay đổi thì cả hai không bị re-render

## Chú ý
- `useMemo` cache giá trị của 1 function tính toán tốn kém
- `useMemo` tránh re-render component khi truyền dưới dạng prop
- `useMemo` tránh chạy Effect không mong muốn bằng việc sử dụng giá trị đó làm dependency của các hook khác
- `useMemo` return kết quả của 1 function tính toán
- `useMemo` sử dụng trong vòng lặp cũng tương tự `useCallback`