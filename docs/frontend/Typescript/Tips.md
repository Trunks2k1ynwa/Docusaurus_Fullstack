## Toán tử !

- Đây là toán tử dùng để xác định biến không phải null và bỏ qua lỗi

```js
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

## Toán tử in

- Kiểm tra thuộc tính, khóa có nằm trong 1 đối tượng hay không

```js
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

## instanceof

## constanceof

## keyof

- Là toán tử để truy xuất các key trong 1 object và trả 1 union type chứa các key của object đó
- Khi sử dụng keyof với generic type, để generic A phụ thuộc vào type của generic B, ta có thể dùng như sau

```ts
function <A,B extend keyof A>(val:A, key:B)
function({name:'Trung',age:21},'name|age')
// keyof A trả về union type 'name|age', nên B extend thì B sẽ có type là 1 trong 2 cái này
```

```js
  type Person = {
    [index:string]: string;
  };

  type PersonKeys = keyof Person;
  // PersonKeys sẽ có kiểu dữ liệu string | number
  const name :PersonKeys = 'address';
  console.log(name)
```

## typeof và ReturnType

- ReturnType dùng để trích xuất kiểu dữ liệu của giá trị trả về từ một hàm cụ thể

```js
type MyFunctionReturnType = ReturnType<typeof myFunction>;
```

- typeof dùng để lấy ra type của một biến hoặc dữ liệu nào đó mà bạn không biết

## Indexed Access Types

- Truy cập chỉ mục, phần tử của object, mảng để lấy ra type của phần tử đó

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; //number
type Age2 = Person[keyof Person]; //number | string | boolean
```
