# Enum

- Kiểu dữ liệu đặc biệt dùng để đại diện cho một tập hợp giới hạn các giá trị cố định

```ts
enum Color {
  Red,
  Green,
  Blue
}

enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}
```

## Sử dụng Enum

```ts
let selectedColor: Color = Color.Blue
let today: DayOfWeek = DayOfWeek.Wednesday

console.log(selectedColor) // In ra: 2 (vì Blue có giá trị 2)
console.log(today) // In ra: 3 (vì Wednesday có giá trị 3)
```
