# Selection sort
- Duyệt qua từng phần tử của mảng
- Mỗi lần duyệt, sẽ gọi min = vị trí của phần tử cần duyệt
- Duyệt từ vị trí tiếp theo đến cuối mảng, nếu có phần tử nhỏ hơn min thì gán vị trí của phần tử đó với min
- Thay đổi giá trị của phần tử đang duyệt với min
- Độ phức tạp là O(n^2)

```js
function SelectionSort(arr) {
  const n = arr.length
  for (let i = 0; i < n-1; i++) {
    let min = i;
    for (j = i + 1; j < n;j++){
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min != i) {
      [arr[i],arr[min]] = [arr[min],arr[i]]
    }
  }
}
```