# Breadth First Search
- Tìm kiếm theo chiều rông là duyệt qua một đồ thị theo chiều rộng và sử dụng hàng đợi để ghi nhớ đỉnh liền kề để bắt đầu việc tìm kiếm
## Mô tả thuật toán BFS
- Lấy 1 đỉnh bất kỳ trong đồ thị thêm vào cuối hàng đợi
- Lấy phần tử đầu tiên của hàng đợi và thêm nó vào danh sách đã duyệt
- Tạo 1 danh sách các đỉnh liền kề của đỉnh đang xét, thêm những đỉnh không có trong danh sách đã duyệt vào cuối hàng đời
- Tiếp tục lặp lại bước 2 và bước 3 khi hàng đợi trống