# Interpolation Search
- Tìm kiếm nội suy là biến thể cải tiến của tìm kiếm nhị phần
- Yêu cầu tệp dữ liệu phải được sắp xếp
- Thay vì luôn kiểm tra ở giữa mảng như tìm kiếm nhị phân, tìm kiếm nội suy ước tính vị trí gần đúng của phần tử tìm kiếm dựa trên phân phối của các phần tử trong mảng.
- Độ phức tạp của thuật toán là O(log(logn))
- Nhanh hơn binary search trong trường hợp tệp đã sắp xếp và các phần tử cách đều nhau
```js
function interpolationSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right && target >= arr[left] && target <= arr[right]) {
        let pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));

        if (arr[pos] === target) {
            return pos;
        }

        if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }

    return -1;
}
```