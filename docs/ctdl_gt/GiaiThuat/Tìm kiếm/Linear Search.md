# Linear search
- Tìm kiếm tuyến tính là giải thuật tìm kiếm cơ bản
- Hoạt động tìm kiếm sẽ diễn ra khi duyệt qua từng phần tử, nếu phần tử được duyệt === phần tử đang tìm kiếm thì return
- Độ phức tạp của thuật toán là O(n)
### Mô tả
```js
Bắt đầu hàm linear_search (list, value)

   for mỗi phần tử trong danh sách

      if match item == value

         return vị trí của phần tử

      kết thúc if

   kết thúc for

kết thúc hàm
```