# useEffect
- `useEffect` là 1 react hook cho phép bạn xử lý đồng bộ 1 component với các thành phần bên ngoài
- `useEffect` thường được sử dụng để xử lý các sideEffect
- `useEffect` return undefined
```js
useEffect(setup,dependencies?)
```
## Setup
### side-effect 
  Hiểu nôm na là những thứ tác động và nó chạy phía bên ngoài component của mình:
- Gọi API lấy dữ liệu
- Tương tác với DOM
- setTimout, setInterval
### cleanUp function
- Chạy khi component re-render hoặc khi unmonted khỏi DOM
## How it work
- `component mount` : jsx -> side-effect = `componentDidMount`
- `component update`: jsx -> cleanup(old_value) -> side-effect(new_value) = `componentDidUpdate`
- `component unmount` : jsx -> cleanup = `componentWillUnmount`
## dependencies
- List value : state, props, value, function được khai báo trong component
```js
 [dep1,dep2,dep3]
```
- React sẽ so sánh từng dependency với giá trị trước đó bằng phép so sánh Object.is
- Có ba trường hợp dependencies trong useEffect

### nothing dependencies
- Effect bên trong sẽ được chạy sau mồi lần render và re-render của component
```js
useEffect(() => {
  // ...
}); // Always runs again
```
### [] dependencies
- Nếu Effect không dùng đến các giá biến, khi dùng một mảng rỗng dependency thì effect chỉ chạy lần đầu tiên khi component render
```js
useEffect(() => {
  // ...
}, []); // Does not run again (except once in development)
```
### [dep1,dep2,dep3]
- Effect run again when có 1 trong các dep changes
```js
useEffect(() => {
  // ...
}, [dep1,dep2]); // // Runs again if a or b are different
```

## Chú ý
- Nếu sử dụng array, object, function trong dependencies có thể làm component re-render không cần thiết
- [Test useEffect](http://localhost:3000/hooks/useEffect)
