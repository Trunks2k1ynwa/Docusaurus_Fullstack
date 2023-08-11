# Set,Map
## Set
- Là tập đối tượng chỉ xảy ra 1 lần duy nhất
```js
const arr = [1,3,2,1,45,2,4]
const a = new Set(arr)
console.log(a)// Set(5) { 1, 3, 2, 45, 4 }
```
### Set Method
### add()
### delete()
### clear()
## Map
- Map là một cấu trúc dữ liệu hữu ích để lưu trữ cặp khóa-giá trị, tương tự như đối tượng
- Map cho phép sử dụng bất kỳ kiểu dữ liệu nào làm khóa (trong khi đối tượng chỉ cho phép sử dụng chuỗi hoặc các ký tự làm khóa).
```js
const myMap = new Map();
,
// Thêm dữ liệu vào Map
myMap.set("key1", "value1");
myMap.set("key2", "value2");

// Sử dụng các kiểu dữ liệu khác làm khóa
const objKey = { id: 1 };
myMap.set(objKey, "value3");

```