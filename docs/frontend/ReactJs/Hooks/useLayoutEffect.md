# useLayoutEffect
- Là phiên bản của useEffect khích hoạt trước khi trình duyệt vẽ lại màn hình (render UI mà người dùng có thể nhìn thấy)
```js
useLayoutEffect(setup, dependencies?)
```
- `useLayoutEffect` return undefined

## Tham số
### setup
- setup là 1 function chứa các logic Effect, nó cũng có tùy chọn return cleanup function
- Trước khi component được thêm vào DOM, setup function run
- Sau mỗi lần re-render, cleanup function run với giá trị cũ
- Sau đó run setup với giá trị mới
- Component remove DOM, cleanup run lần cuối
### dependencies
- Danh sách tất cả các giá trị được sử dụng trong **fn**
- Danh sách các dependencies thường được viết như `[dep1,dep2,dep2]`. React sẽ so sánh từng `dep` với giá trị trước đó bằng Object.is
## Cách sử dụng
- Thông thường, component sẽ không cần biết vị trí của nó và kích thước màn hình để quyết định render
- Chúng chỉ trả về JSX và browser sẽ tính toán layout và vẽ lên màn hình
- Ví dụ bạn muốn hiển thị tooltip khi hover vào element
- Bạn không biết tooltip hiển thị có đủ khoảng trông hay không và cần tính toán các element xung quanh trước khi render
- Sử dụng `useLayoutEffect` để xác định layout trước khi browser vẽ lên màn hình
## useEffect và useLayoutEffect
### useEffect
  - Cập nhật state
  - Cập nhật DOM (mutated)
  - Render lại UI
  - Gọi cleanup nếu deps thay đổi
  - Gọi useEffect callback
```js
useEffect(() => {
    if (!show) return
    const { bottom } = button.current.getBoundingClientRect()
    popup.current.style.top = `${bottom+25}px`
  },[show])
```
- Khi state `show` : false -> true
- Update DOM (JSX với `show` = true) -> Render UI : Hiển thị UI popup 
- Chạy vào useEffect : Thay đổi vị trí popup xuống dưới bottom 25px
- User gặp hiện tượng chớp vì pop di chuyển 25px
### useLayoutEffect
- Cập nhật lại state
- Cập nhật DOM (mutated)
- Gọi cleanup nếu deps thay đổi (sync)
- Gọi useLayoutEffect callback (sync)
- Render lại UI
```js
useLayouEffect(() => {
    if (!show) return
    const { bottom } = button.current.getBoundingClientRect()
    popup.current.style.top = `${bottom+25}px`
  },[show])
```
- Khi state `show` : false -> true
- Update DOM (JSX với `show` = true)
- Chạy vào useLayoutEffect : Thay đổi vị trí popup xuống dưới bottom 25px
- Render UI : Hiển thị UI popup 
- User nhìn thấy UI popup đã ở vị trí dưới 25px so với button


## Chú ý
- Khi state thay đổi, component re-render
- Dom sẽ cập nhật jsx với state mới 
- Gọi useLayoutEffect callback (đồng bộ, chạy xong effect mới Render UI)
- Render lại UI để người dùng có thể thấy sự thay đổi
- Khi UI có hiện tượng chớp thì sửa `useEffect` -> `useLayoutEffect`
- [Test useLayoutEffect](http://localhost:3000/hooks/useLayoutEffect)