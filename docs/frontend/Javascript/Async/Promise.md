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
- Then : Bắt kết quả khi promise resolve
- Catch : Bắt lỗi khi promise reject
- Finnaly : Luôn chạy vào dù resolve, reject, thường để clean up