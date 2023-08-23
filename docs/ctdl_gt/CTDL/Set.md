# Set
- Set là 1 cấu trúc dữ liệu lưu trữ `tập hợp` các giá trị
- Các giá trị trong set phải là duy nhất
- Set có kích thước tự động, vì thế không được khai báo kích thước của nó khi tạo
```js
const set = new Set([1,2,3])
set.add(4)
set.delete(3)
set.clear()
set.has(2)
set.size
```