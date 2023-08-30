# Insertion Sort
- Sắp xếp chèn là thuật toán sắp xếp sẽ chia mảng ra hai phần: Mảng đã sắp xếp, mảng chưa sắp xếp
- Sau mỗi lần duyệt ở vị trí i : 
  + sorted : 0->i-1
  + not sorted : i -> n-1
- Trong mỗi lần duyệt, get current và position
- current là phần tử đang duyệt dùng để so sánh với các giá trị trong sorted array
- postion để thay đổi nếu current < element sorted array
- Lặp qua sorted array
- Nếu element > current và index của element >=0 thì postion --
- Khi phần tử nào trong sorted array <  current thì sẽ di chuyển về phía sau đồng thời thay đổi vị trí của postion lại cho hợp lý
- Độ phức tạp là o(n^2)
```js
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const currentElement = arr[i];
        let j;
        
        // Di chuyển các phần tử lớn hơn currentElement về phía sau
        for (j = i - 1; j >= 0 && arr[j] > currentElement; j--) {
            arr[j + 1] = arr[j];
        }
        
        // Đặt currentElement vào vị trí đúng sau khi dịch chuyển
        arr[j + 1] = currentElement;
    }
}

```