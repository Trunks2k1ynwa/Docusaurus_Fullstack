# Object

- Types của object là 1 object có danh sách các properties và types của chúng

```js
  const TypeObject = (x:{name:string,age:number})=>{
    console.log(x.name,x.age)
  }
  TypeObject({name:'trung',age:21})
```

- Sử dụng Interface hoặc Aliases để khai báo type cho object

```ts
interface Person {
  name: string
  age: number
}

function greet(person: Person) {
  return 'Hello ' + person.name
}
```

## Property Object

### Optional

- Type của property này có thể hoặc không

```ts
interface PaintOptions {
  shape: Shape
  xPos?: number
  yPos?: number
}
```

### readonly

- Property này chỉ được xem chứ ko được chỉnh sửa

```ts
interface SomeType {
  readonly prop: string
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`)

  // But we can't re-assign it.
  obj.prop = 'hello'
}
```

### Index Sinature

- Xác định type của key, type của value cho từng cái hoặc tất cả các key của 1 object

```ts
interface Dictionary {
  [index: string]: number
  length: number //ok
  Bob: string //error
}

// Tạo một đối tượng sử dụng index signature
const ageDictionary: Dictionary = {
  Alice: 30,
  Bob: 25,
  Charlie: 35
}
```
