---
title: Hooks overview
authors: Trunks
tags: [react hook, docusaurus]
---
## 1.useState
- Là hook dùng để khai báo `state` trong component
```js
const [state, setState] = useState(initialStateValue)
```
## 2.useEffect
- Là hook dùng để xử lý các side-effect bên trong component
```js
useEffect(setup,dependencies?)
```
- `setup` là 1 function chứa logic của side-effect
- `setup` có thể return `cleanup` function để tránh các trường hợp memory-leak
- `dependencies` là điều kiện để chạy `setup` function
- `dependencies` : nothing,[ ], [prop,state]
  + nothing, setup chạy mỗi khi component re-render
  + [], setup chạy lần duy nhất khi component re-render
  + [props,state], setup sẽ chạy khi có `props` hoặc `state` thay đổi
- Component render : `jsx` -> `setup`(current `state`)
- Component re-render : `jsx` -> `cleanup`(previous ``state``) -> side-effect(current `state`)
- Component removed : `jsx` -> `cleanup`
## 3.useCallback
- Là hook cho phép bạn lưu giá trị tham chiếu (cache ref) của 1 function sau mỗi lần component re-render
```js
const cachedFn = useCallback(fn, dependencies)
```
- `cachedFn` dùng làm props của component để tránh re-render
- `cachedFn` làm dependencies trong 1 hooks effect khác để tránh effect chạy liên tục
- Khi viết custom hook, nếu bạn return function, bạn nên bọc function đó với `useCallback`
## 4.useMemo
- Là 1 hook dùng để cache giá trị tính toán của 1 function tốn nhiều thời gian
```js
const cachedValue = useMemo(calculateValue, dependencies)
```
- `useMemo` trả về kết quả tính toán của `calculateValue` function
- `useMemo` tránh re-render component khi truyền dưới dạng prop
- `useMemo` tránh chạy Effect không mong muốn bằng việc sử dụng giá trị đó làm dependency của các hook khác
- `useMemo` sử dụng trong vòng lặp cũng tương tự `useCallback`
## 5.useRef
- `useRef` là 1 hook cho phép bạn tham chiếu đến 1 giá trị, cái mà không cần thiết trong quá trình render
- `useRef` trả về 1 object với 1 thuộc tính duy nhất là `current`
- Khi truyền `ref` dưới dạng props ở component con thì phải có `fowardRef`
```js
const ref = useRef(initialValue)
```
- `useRef` thường dùng để thao tác với các phần tử DOM
## 6.useTransition
- `useTransition` là 1 hook cho phép bạn cập nhật `state` mà không chặn UI
```js
const [isPending, startTransition] = useTransition()
```
- `startTransition` là 1 function chứa các `setState`, các `state` trong này sẽ được đưa vào quá trình chuyển đổi, độ ưu tiên cập nhật thấp hơn.
```js
startTransition(() => {
  setTab(nextTab);      
});
```
- `isPending` là giá trị để xác định quá trình chuyển đổi có đang chờ hay không.
## 7.useDefferedValue
- `useDefferedValue` là 1 hook cho phép bạn trì hoãn lại việc cập nhật `state` trong bản cập nhật hiện tại cho đến khi các tác vụ ưu tiên đã hoàn thành.
- Sau đó nói mới cập nhật ở chế độ background
```js
const deferredValue = useDeferredValue(state)
```
- Giúp trì hoãn việc update UI (tốn nhiều thời gian) khi component re-render
- Hiển thị UI cũ cho đến khi UI mới được loading xong
- Thường sử dụng cho ứng dụng tìm kiếm
- `state` và `deferredValue` tương ứng với hai trạng thái mới và cũ khi cập nhật UI
## 8.useReducer
- `useReducer` là 1 hook cho phép bạn thêm `reducer` vào component
```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```
- `reducer` : Đây là 1 funtion thực thi việc update state như thế nào. Nhận hai tham số là `state`,`action` và return `next state`. Nó phải là pure function.
- `initialArg` : Tham số được dùng tính toán `init state` trong lần render đầu tiên qua đối số `init` 
- `init` : Hàm khởi tạo để trả về `init state`. Nếu nó không được chỉ định thì `init state` = `initialArg`. Mặt khác thì `init state` = `init(initialArg)`
## 9.useId
- `useId` là 1 hook cho phép bạn tạo ra các ID duy nhất để dùng cho các thuộc tính cần thiết trong component
```js
const id = useId()
```
## 10.useLayoutEffect
- Được khích hoạt trước khi trình duyệt vẽ lại màn hình (render UI mà người dùng có thể nhìn thấy)
- `state` update -> Dom update -> `LayoutEffect` -> Render JSX -> `Effect`
```js
useLayoutEffect(setup, dependencies?)
```
- `useLayoutEffect` return undefined
- Khi UI có hiện tượng chớp thì sửa `useEffect` -> `useLayoutEffect`
## 11.useContext
- Là 1 hook cho phép bạn đọc và áp dụng bối cảnh vào component của bạn
```js
 <ThemeContext.Provider value="dark">
      <Form />
  </ThemeContext.Provider>
```
```js
const value = useContext(ThemeContext) // dark
```
- Dùng để truyền state từ component cha -> con mà không bị Lifting state (Ông `state`-> cha -> con -> cháu `state`)
## 12.useDebugValue
- `useDebugValue` chỉ sử dụng khi custom hook
- `useDebugValue` giúp cho việc hiển thị value của data trong custom hook ở React dev tools để nhìn hơn
- `useDebugValue` không return ra bất cứ giá trị gì
```js
useDebugValue(value, format?)
```
## 13.useIntertionEffect
- `useInsertionEffect` cho phép bạn chèn phần tử vào trong DOM trước khi kích hoạt bất kì `LayoutEffect` nào
- `useInsertionEffect` return underined
```js
useInsertionEffect(setup, dependencies?)
```
- state update -> Dom update -> InsertionEffect -> LayoutEffect -> Render JSX -> Effect
## 14.useImperativeHandle
- `useImperativeHandle` dùng để custom các phương thức,thuộc tính từ `ref` của component con và return các thứ đó ra bên ngoài cho component cha dùng.
- Giúp đảm bảo tính toàn vẹn, riêng tư dữ liệu ở component con.
- `useImperativeHandle` return underfined
```js
useImperativeHandle(ref, createHandle, dependencies?)
```
```js
useImperativeHandle(
    ref,
    () => {

      return {
        play() {
          videoRef.current.play()
        },
        pause() {
          videoRef.current.pause()
        }
      }
    },
    [],
  )
```
- `ref` ở component cha chỉ truy cập được 2 method là `play()` và `pause()`

## 15.useSyncExternalStore