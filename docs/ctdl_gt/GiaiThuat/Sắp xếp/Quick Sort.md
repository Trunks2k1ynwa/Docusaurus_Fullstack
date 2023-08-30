# Quick Sort

- Là thuật toán sắp xếp 1 cách hiệu quả dựa trên việc chia thành các mảng nhỏ hơn

## Mô tả

- Chọn phần tử pivot (giữa mảng)
- Chia mảng thành 2 phần , trái và phải của pivot
- Left: elements < pivot, Right: elements: > pivot
- Chọn pivot ở Left và Right và làm tương tự
- Tiến trình chia diễn ra cho tới khi độ dài của các mảng con đều bằng 1
- Độ phức tạp là 0(log(n))

### Code

```js
function quickSort(arr, left, right) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
}

function partition(arr, left, right) {
  const pivotValue = arr[right];
  let partitionIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }

  swap(arr, partitionIndex, right);
  return partitionIndex;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const unsortedArray = [9, 3, 6, 2, 8, 5, 1, 4, 7];
console.log("Mảng ban đầu:", unsortedArray);

quickSort(unsortedArray, 0, unsortedArray.length - 1);

console.log("Mảng sau khi sắp xếp:", unsortedArray);
```
