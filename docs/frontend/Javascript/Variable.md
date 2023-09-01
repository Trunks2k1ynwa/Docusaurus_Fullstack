# Syntax khai báo biến
## Var
- Hoisting : undefined
- scope : function scope, global scope
- Có thể gán lại giá trị
- Có thể khai báo nhiều biến cùng tên
## Let 
- Hoisting : Refference error
- scope : block scope, local scope, global scope
- Có thể gán lại giá trị
## Const
- Hoisting : Refference error
- scope : block scope, local scope, global scope
- Không thể gán lại giá trị
## Chú ý
- Trong vòng lặp for nếu sử dụng :
  + var : var được khai báo bên ngoài vòng for-global, sau mỗi lần lặp i++ , biến var bên ngoài đó sẽ tăng, i++ được thực hiện cuối cùng sau mỗi lần lặp
  + let : let i được tạo ra bên trong for, mỗi lần lặp tạo ra i mới, i++ được thực hiện đầu tiên sau mỗi vòng lặp trừ lần đầu tiên
  + const : báo lỗi vì i++ làm thay đổi i
```js
  for(var i = 0; i<3 ; i++){
    setTimout(()=>{
      console.log(i)
    },2000)
  }
// 3 3 3
```
## Data Type  Kiểu dữ liệu
### Null
- Là đại diện cho 1 giá trị không tồn tại, không có giá trị
- Nó cần phải gán cho 1 biến
- `typeof of null` là 1 object
### Undefined
- Là không xác định, nó thường xuất hiện khi :
  + 1 biến được khai báo nhưng không được gán giá trị
  + Truy cập vào 1 thuộc tính không tồn tại
  + Giá trị trả về của 1 hàm hông return gì cả
  + Giá trị của tham số khi được gọi ko truyền vào

```js
null == undefined;//true
```
### NaN
- Viết tắt của `not a number`
- Biểu thị kết quả không phải là số hợp lệ
- `type of NaN` là number
