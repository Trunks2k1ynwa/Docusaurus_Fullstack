# Promise
## Trạng thái
- Pending : Trạng thái ban đầu
- Fulfilled : Trạng thái hoàn thành
- Rejected : Promise bị thất bại
## Promise chain
- Để xử lý các trường hợp một chuỗi các tác vụ không đồng bộ được thực hiện lần lượt
- Bình thường sẽ dùng callback nhưng sẽ gặp trường hợp callback hell, vì thế thì promise chain sẽ handle giúp cho code tường minh hơn
```js
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```
- Ý tưởng là sử dụng nhiều then để xử lý dữ liệu giữa các tác vụ,
- Trong mỗi then sẽ return 1 promise và sử dụng then tiếp theo để xử lý
## Method
### Then
- Xác định hành động sẽ được thực hiện khi Promise hoàn thành thành công (onFulfilled) hoặc khi nó bị từ chối (onRejected).
- onFulfilled và onRejected là các hàm callback mà bạn cung cấp để xử lý kết quả hoặc lỗi của Promise.
```js
Promise.prototype.then(onFulfilled, onRejected)
```
### Catch
- Phương thức này là một cách rút gọn để xử lý lỗi của Promise. Nó tương đương với .then(null, onRejected) và được sử dụng để xác định hành động khi Promise bị từ chối.
```js
Promise.prototype.catch(onRejected)
```
### Finnaly
- Xác định một hành động sẽ luôn được thực hiện sau khi Promise hoàn thành, bất kể thành công hay thất bại. Điều này hữu ích để thực hiện các tác vụ dọn dẹp hoặc giải phóng tài nguyên sau khi Promise kết thúc.
```js
Promise.prototype.finally(onFinally)
```
### all
- Phương thức này nhận vào một mảng các Promise hoặc một iterable (ví dụ: mảng Promise)
- Chạy các promise bên trong song song với nhau
- `Promise.all([pr1,pr2])` trả về 1 promiseReturn
- Nếu tất cả các promise trong mảng đều resolve thì promiseReturn.then sẽ là 1 mảng các giá trị resolve
- Nếu 1 trong các promise trong mảng bị reject thì promiseReturn.then sẽ là 1 giá trị bị reject
```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 1 resolved'), 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject('Promise 2 resolved'), 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 3 resolved'), 1500);
});

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // ["Promise 1 resolved", "Promise 2 resolved", "Promise 3 resolved"]
  })
  .catch(error => {
    console.error(error+'adsfdf');
  });
```
### race
- Lấy kết quả của Promise chạy nhanh nhất bất kể thành công hay thất bại
```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 1 resolved'), 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject('Promise 2 rejected'), 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 3 resolved'), 1500);
});

Promise.race([promise1, promise2, promise3])
  .then(result => {
    console.log(result); // "Promise 2 rejected"
  })
  .catch(error => {
    console.error(error);
  });
```
### resolve
- Tạo một Promise đã được giải quyết với giá trị đã cho. Nếu value là một Promise, nó sẽ được trả về nguyên thủy mà không thay đổi.
### reject
- Tạo một Promise đã bị từ chối với lý do đã cho.