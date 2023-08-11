# Copy Array, Object

## Shallow copy : Sao chép nông

- Tạo ra bản sao của array, object, nhưng chỉ sao chép các tham chiếu đến các đối tượng con, hoặc các phần tử
- Các thành phần được sao chép sẽ trỏ tới cùng 1 tham chiếu với thành phần gốc

```js
const originalArray = [1, 2, { a: 3 }];
const shallowCopy = [...originalArray];

shallowCopy[2].a = 99;

console.log(originalArray); // [1, 2, { a: 99 }]
console.log(shallowCopy); // [1, 2, { a: 99 }]
```

## Deep copy : Sao chép sâu

- Tạo ra bản sao hoàn toàn độc lập của đối tượng hoặc mảng gốc
- Thay đổi trong sao chép không ảnh hướng đến đối tượng gốc và ngược lại
- Để tạo Deep copy sử dụng JSON.stringify() và JSON.parse()

```js
let ingredients_list = ["noodles", { list: ["eggs", "flour", "water"] }];
let ingredients_list_deepcopy = JSON.parse(JSON.stringify(ingredients_list));
```
