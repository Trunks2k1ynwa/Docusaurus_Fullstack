## Buble Sort
- Sắp xếp nổi bọt là giải thuật sắp xếp đẩy phần tử lớn nhất xuống cuối list sau mỗi lần lặp, nổi bọt phần tử đó 
- Là giải thuật sắp xếp chậm nhất trong số các giải thuật cơ bản
- Độ phức tạp của thuật toán là O(n bình)
- Sẽ dùng 2 vòng lặp
- Vòng lặp đầu tiên để xác định số phần tử cần phải lặp trong vòng lặp thứ hai
- Sau mỗi lần lặp, sẽ có 1 phần tử được sắp xếp theo đúng vị trí và nổi bọt xuống cuối list
- Vòng lặp thứ 2 sẽ chạy từ 0 -> n-i-1, bỏ qua i, bỏ qua số phần tử đã được sắp xếp , để kiểm tra và swap nếu điều kiện không thỏa mãn
- Sau mỗi lần lặp thì sẽ có 1 phần tử Lớn nhất sẽ được đẩy xuống cuối mảng,
- Lần lặp sau sẽ sẽ bỏ quả phần tử được đẩy ở trước và chỉ swap nhưng phần tử còn lại nên sẽ chỉ chạy từ 0-> n-i-1
```js
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n ; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Hoán đổi giá trị của hai phần tử
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```