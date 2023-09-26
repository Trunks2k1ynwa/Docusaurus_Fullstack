# Generics

- Cho phép tạo ra các `function`, `class`, `Aliases`, `interface` có thể hoạt động với nhiều kiểu dữ liệu khác nhau mà không cần viết lại code
- Thay vì cố định kiểu dữ liệu, bạn có thể tham số hóa với một kiểu dữ liệu xác định sau đó

```js
// Hàm identity sử dụng generics để trả về giá trị đầu vào
function identity<T,B extends keyof T>(arg: T,val:B): T {
  return arg;
}

let result = identity<string>("Hello, Generics!");
console.log(result); // In ra: Hello, Generics!

result = identity<number>(42);
console.log(result); // In ra: 42
```
