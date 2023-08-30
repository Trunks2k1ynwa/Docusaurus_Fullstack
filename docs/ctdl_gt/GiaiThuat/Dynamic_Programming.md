# Dynamic Programming
- Giải thuật quy hoạch động là giải thuật chia nhỏ bài toán thành các bài toán con nhỏ hơn
- Sau đó các bài toán nhỏ hơn nữa có thể
- Các bài toán con này không được giải 1 cách độc lập, thay vào đó kết quả của bài toán con này được lưu lại và sử dụng cho các bài toán con tương tự
- Chúng ta sử dụng Qui hoạch động (Dynamic Programming) khi chúng ta có các bài toán mà có thể được chia thành các bài toán con tương tự nhau, để mà các kết quả của chúng có thể được tái sử dụng
## So sánh
### Giải thuật tham lam và giải thuật qui hoạch động
- Giải thuật tham lam (Greedy Algorithms) là giải thuật tìm kiếm, lựa chọn giải pháp tối ưu địa phương ở mỗi bước với hi vọng tìm được giải pháp tối ưu toàn cục.
- Giải thuật Qui hoạch động tối ưu hóa các bài toán con gối nhau.
### Giải thuật chia để trị và giải thuật Qui hoạch động:
- Giải thuật chia để trị (Divide and Conquer) là kết hợp lời giải của các bài toán con để tìm ra lời giải của bài toán ban đầu.
- Giải thuật Qui hoạch động sử dụng kết quả của bài toán con và sau đó cố gắng tối ưu bài toán lớn hơn. Giải thuật Qui hoạch động sử dụng phương pháp lưu trữ (Memoization) để ghi nhớ kết quả của các bài toán con đã được giải.
## Ví dụ
- Dãy Fibonacci
- Bài toán tòa tháp