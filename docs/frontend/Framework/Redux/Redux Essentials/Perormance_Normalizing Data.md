---
title : Performance and Normalizing Data
---
## Giới thiệu
- Cách để đảm bảo hiệu suất tốt trong ứng dụng và các ký thuật để tự động update dữ liệu phổ biến trong store
## Thunk Arguments
- `ThunkAPI` là đối số thứ hai của `payload creator`
- `thunkAPI` là function chứa:
  +`dispatch`,`getState`: Đây là 2 method của redux store, bạn có thể sử dụng bên trong thunk để dispatch nhiều action, hoặc lấy state trong store mới nhất
  +`extra`
  + `requestID`: Giá trị ID cho lần gọi của thunk. Hữu ích để kiểm tra trạng thái của mỗi lần request
  + `signal`: function dùng để hủy request
  + `rejectWithVallue`: Đơn vị để chỉnh sửa nội dụng của `reject`