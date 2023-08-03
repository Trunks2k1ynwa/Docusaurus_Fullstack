# React

## Props State

### Props

- `Props` giống như tham số truyền vào trong 1 function.
- `Props` cho phép component cha truyền dữ liệu cho component con và tùy chỉnh nó để hiển thị
- VD : `Form` truyền `props` `color` vào `Button`

### State

- `State` giống như bộ nhớ của component.
- Nó cho phép 1 component theo dõi các thông tin và thay đổi nó để đáp ứng với tương tác.
- Các thông tin sẽ được lưu vào `State`

## Pure component

- Luôn giữ cho component thuần túy
- Nó không thay đổi bất cứ objects và biến nào đang tồn tại trước khi nó được gọi.
- Đầu vào giống nhau thì đầu ra sẽ giống nhau

## JSX

- `JSX` là cú pháp mở rộng của `Javascript` cho phép bạn viết `HTML` bên trong `Javascript`

## Virtual DOM

- DOM ảo (virtual DOM) là một đại diện được nằm trong bộ nhớ cho một thành phần HTML thật mà cấu thành nên giao diện cho chương trình.
- Khi một component được thông dịch lại (re-render), DOM ảo sẽ so sánh sự thay đổi với mô hình của DOM thật để tạo một danh sách cập nhật sẽ được thực hiện.
- Lợi ích chính của việc này là giúp tăng hiệu năng, chỉ tập trung vào các thay đổi nhỏ và thực sự cần thiết với DOM thật hơn là phải re-render lại một tập component lớn.

## Hooks

- Hook là nỗ lực của React để mang sự thuận tiện của component dựa theo class sang component dựa theo function (bao gồm state nội tại và các phương thức vòng đời)
- Hooks là một bổ sung mới trong React 16.8.
- Hooks là những hàm cho phép bạn kết nối React state và lifecycle vào các components sử dụng hàm.
- Với Hooks bạn có thể sử dụng state và lifecycles mà không cần dùng ES6 Class."
