# Đệ Quy
- Gọi lại chính nó để tạo ra vòng lặp
- Điều kiện để tạo đệ quy:
  + Điều kiện dừng
  + Tiệm cận : Khi hàm đệ quy được gọi lại thì nó phải càng tiệm cận đến điều kiện dừng
```js
const sumArray = (array,index) => {
  if (index < 0) {
    return 0
  } else {
    return array[index] + sumArray(array,index-1)
  }
}
```