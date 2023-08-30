# Currying
- Là kỹ thuật mà trong đó 1 hàm có nhiều tham sôs được chuyển đổi thành một chuỗi các hàm con, mỗi hàm chỉ nhận 1 tham số
```js
// Hàm gốc không sử dụng currying
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // Output: 6

// Sử dụng currying để tạo ra chuỗi các hàm con
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

const addWithCurrying = curriedAdd(1)(2)(3);
console.log(addWithCurrying); // Output: 6

```