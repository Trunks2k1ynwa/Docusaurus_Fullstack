## Intersection Type

- Type A & Type B
- Type này và type kia
- Dùng trong trường hợp kế thừa type

```ts
interface Indentity {
  id: number
  name: string
}
interface Person {
  male: string
  status: boolean
}
type Employee = Indentity & Person
const person: Employee = {
  id: 1,
  male: 'Male',
  name: 'Strung',
  status: true
}
```

## Assertions Types : As

- Cho phép bạn nói cho thằng complier biết rõ hơn về kiểu dữ liệu của một biến hoặc biểu thứ để nó biết được
- Ts sẽ tin tưởng bạn làm điều nay

```ts
const input = document.querySelector('input') as HTMLInputElement
```
