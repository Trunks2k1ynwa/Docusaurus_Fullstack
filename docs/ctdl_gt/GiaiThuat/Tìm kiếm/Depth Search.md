# Depth First Search
- Tìm kiếm theo chiều sâu là giải thuật duyệt hoặc tìm kiếm trên một cây, một đồ thị
- Thuật toán bắt đầu tại nút gốc và kiếm tra từng nhánh càng xa càng tốt trước khi quay lui
- Sử dụng Stack để để lưu trữ node
## Mô tả
- Lấy 1 đỉnh bất kì trong đồ thì và đưa và ngăn xếp
- Lấy giá trị của đầu tiên trong stack thêm vào mảng Visited
- Tạo một list bao gồm các đỉnh liền kề của đỉnh đang xét, thêm những đỉnh không có trong Visted vào ngăn xếp
- Tiếp tục lặp lại bước 2 và bước 3 đến khi ngăn xếp rỗng

## https://viblo.asia/p/data-structure-algorithm-graph-algorithms-depth-first-search-dfs-qPoL7zyXJvk