# startTranstion

- `startTranstion` cho phép bạn cập nhật `state` mà không chặn UI

```js
startTransition(scope);
```

- `startTransition(scope)` là 1 function cho phép bạn đánh dấu 1 state đang trong quá trình chuyển đổi (`transtion`)

```js
const [tab, setTab] = useState("about");

function selectTab(nextTab) {
  startTransition(() => {
    setTab(nextTab);
  });
}
```

## Tham số

- `scope` là 1 function cho phép bạn cập nhật các `state` bằng việc gọi set funtions
- React sẽ tự động gọi scope với ko tham số và đánh dấu tất cả state được lên lịch cập nhật đồng bộ
- Chúng phải là `non-blocking` và sẽ không hiển thị loading không mong muốn

## Cách sử dụng

- Đánh dấu cập nhật state như 1 quá trình chuyển đổi không bị chặn

```js
function TabContainer() {
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```
- Khi update state `tab`, do sử dụng transtion nên quá trình cập nhật giống như 1 quá trình chuyển đổi
- UI (state cũ) dù chưa render xong nhưng khi update `state` mới thì sẽ không chặn việc render UI(state mới) dù chưa hoàn thành
- Ví dụ: nếu người dùng nhấp vào một tab nhưng sau đó thay đổi ý định và nhấp vào một tab khác, họ có thể làm điều đó mà không cần đợi quá trình kết xuất lại đầu tiên kết thúc.
