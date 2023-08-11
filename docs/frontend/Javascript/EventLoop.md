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
## Queue
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
- Sau khi xử lý xong thì `task` này sẽ được chuyển đến `Queue`(hàng đợi) để chờ
- Nếu trong `Call stack` trống thì `event loop` sẽ chuyển `task` đầu tiên đang đợi vào `Call stack` để thực thi và hiển thị ra `output`