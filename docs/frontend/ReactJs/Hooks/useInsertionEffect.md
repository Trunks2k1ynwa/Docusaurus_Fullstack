# useInsertionEffect 
- `useInsertionEffect` cho phép bạn chèn phần tử vào trong DOM trước kích hoạt bất kì layoutEffect nào
- `useInsertionEffect` return underined
```js
useInsertionEffect(setup, dependencies?)
```

## Tham số
### setup
- Là function chứa các logic Effect bên trong, có thể chứa `cleanup` function hoặc không
- Component add DOM, `setup` function run
- Sau mỗi lần re-render, `cleanup` function run với giá trị cũ
- Sau đó `setup` function run với giá trị mới
- Component removed DOM, `cleanup` function run
### dependencies
- List value : state, props, value, function được khai báo trong component
```js
 [dep1,dep2,dep3]
```
- React sẽ so sánh từng dependency với giá trị trước đó bằng phép so sánh Object.is
## Lưu ý
- `Effects` chỉ chạy ở clinet, không chạy ở server
- Không thể update `state` bên trong `useInsertionEffect`
- Vào thời điểm `useInsertionEffect` chạy, các tham chiếu chưa được đính kèm
- `useInsertionEffect` có thể chạy trước hoặc sau khi DOM được cập nhật
- Không giống như các effect khác  kích hoạt `cleanup` sau đó `setup` cho mỗi Effect
- `useInsertionEffect` sẽ kích hoạt cả hai cho component ở cùng 1 thời điểm
## Các sử dụng
### Chèn các styles từ các thư viện css-in-js
- `useInsertionEffect` giúp chèn styles trước khi bất kì layout nào được thêm vào DOM:
## Tổng quát
- `useInsertionEffect` chạy trước `useLayoutEffect` và `useEffect`
- [Test useInsertionEffect](http://localhost:3000/hooks/useInsertionEffect)