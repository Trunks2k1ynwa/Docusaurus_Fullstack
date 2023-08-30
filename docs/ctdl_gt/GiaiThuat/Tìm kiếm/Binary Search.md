# Binary Search

- Tìm kiếm nhị phân là một giải thuật tìm kiếm dựa trên nguyên tắc chia để trị
- Để giải thuật này làm việc một cách chính xác thì tập dữ liệu nên ở trong dạng đã được sắp xếp

## Mô Tả

- Tìm kiếm phần tự dựa trên so sánh phần tử tại vị trí giữa nhất của list
- Nếu tìm thấy thì return index
- Nếu phần tử cần tìm lớn hơn thì phần tử cần tìm nằm ở bên trong list con bên phải
- Nếu không thì sẽ tìm ở trong mảng con nằm bên trái
- Tiến trình tiếp tục như vậy cho tới khi tìm hết mọi phần tử trong mảng con này

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Tìm thấy target tại vị trí mid
    } else if (arr[mid] < target) {
      left = mid + 1; // Tiếp tục tìm phía bên phải của mid
    } else {
      right = mid - 1; // Tiếp tục tìm phía bên trái của mid
    }
  }

  return -1; // Không tìm thấy target trong mảng
}

```
