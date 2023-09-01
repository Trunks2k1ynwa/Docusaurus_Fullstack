# Event Loop
- Là 1 khái niệm liên quan đến cách browser xử lý các tác vụ bất đồng bộ và tương tác vơi Dom
- Event loop là cơ chế giúp Javascript có thể thực hiện nhiều thao tác cùng một lúc (concurrency)
## Call stack
- Call stack là 1 phần tử của JS Engine, không phải trình duyệt.
- Ngăn xếp, hàng đợi này dựa trên cơ thế Last in first out, vào sau thì sẽ ra trước.
```js
function firstFunction() {
    console.log("This is the first function");
    secondFunction();
}
function secondFunction() {
    console.log("This is the second function");
    thirdFunction();
}
function thirdFunction() {
    console.log("This is the third function");
}
firstFunction();
```
- Khi chạy thì `callstack sẽ như sau: `: `thirdFunction`,`secondFunction`,`firstFunction`
- Last in first out thì thằng nào vào sau sẽ ra trước, tức là `firstFunction` sẽ phải chờ 2 tk kia ra khỏi `callstack` thì nó mới ra
## Web API
- Là 1 chức năng mà trình duyệt cung cấp cho js để thực thi các tác vụ một cách bất đồng bộ, non-blocking
- DOM API, setTimout, http request
## MicroTask Queue
- Chứa các công việc (tasks) nhỏ hơn, có ưu tiên hơn so với callback queue (hàng đợi callback)
- Chúng thường được thực hiện ngay sau khi call stack trống, trước khi xử lý các công việc trong callback queue.
## CallbackQueue, task queue
- Hàng đợi là nơi các WebAPI dừng lại để đợi khi `CallStack` trống thì mới được `event loop` đưa vào `callstack`
- Hoạt động theo cơ chế first in first out
## OutPut
- Là kết quả trả về khi invok function
## Luồng hoặc động
- Khi 1 hàm được thực thi, gọi hàm đó
- Nó sẽ được thêm vào `call stack`
- Nếu trong hàm không chứa các tác vụ bất đồng bộ thì nó sẽ ném kết quả ra `output` và hiển thị lên trình duyệt
- Nếu trong hàm chứa các task bất đồng bộ được cung cấp bởi `Web APIS`
- Tác vụ này sẽ được thêm vào `Web API` để xử lý
- Sau khi xử lý xong thì kiểm tra`task` này :
    + nếu `task` đó được ưu tiên hơn như : fetch data, promise, Mutation Observer callbacks thì sẽ chuyển đến `MicroTask Queue` 
    + nếu `task` đó ko được ưu tiên như : setTimeOut, setInterval thì sẽ chuyển đến `Callback queue` 
- Nếu trong `Call stack` trống thì `event loop` sẽ chuyển `task` đầu tiên đang đợi ở `MicroTask Queue` nếu có trước, rồi mới đến `callback queue` vào `Call stack` để thực thi và hiển thị ra `output`