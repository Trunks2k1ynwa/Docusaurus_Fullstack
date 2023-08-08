---
title: Redux
---
## Redux core
- `store` cấu hình theo `createStore`
- `reducer` theo kiểu `switch-case`
- `dispatch` `action` theo kiểu `action plain object`
- Không có `middleware` và ko tương thích với `Redux Devtools extension`
## Redux Toolkit
- `store` cấu hình theo `configureStore` :
  + Tự động thêm `Middleware`, `Redux Devtools extention`
  + Tự động gom các `reducer` theo `combine reducer`
- `slice` chứa các reducer tạo bằng `createSlice`:
  + `initialState` giá trị ban đầu
  + `name`: Tên của slice
  + `reducers` : chứa các `action creator` nhận 2 đối số `dispatch`,`state`
  + `action creator` có thể viết theo kiểu `reducer` và `prepare` để tách logic như thêm `id`
  + Sử dụng `immer` để update `state`
- Có 2 API quan trọng khác : 
  + `createAsyncThunk`: Tạo `thunk` function xử lý các yêu cầu bất đồng bộ
  + `createEntityAdapter` : Chuẩn hóa dữ liệu dùng thuận tiện hơn
## Redux Thunk
- Cung cấp `middleware` xử lý các side-effect trước khi được dispatch vào `reducer`
- Sử dụng Thunk theo 2 cách: 
  + Cấu hình thông thường , dài dòng, ko clean : Dùng `thunk function` chứa `side-effect` và `dispatch` lên `reducer`
  + Cấu hình `createAsyncThunk` ngắn gọn, dễ hiểu: Cũng tạo `thunk function`(`action type`,`async/await` fn return `data`) kết hợp với `extraReducers` để `handle` từng giai đoạn
## Redux Saga
## RTK Query
- Dùng để feching data và catching data trong bộ nhớ đêm
- Mỗi Redux app chứa 1 `apiSlice` tạo bằng `createApi` duy nhất cũng tương tự như `store` duy nhât
- Trong `createAPI` truyền vào object chứa các key:
  + `reducerPath`
  + `baseQuery`
  + `endpoints`

