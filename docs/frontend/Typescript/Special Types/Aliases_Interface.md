## Aliases type

- Sử dụng để khai báo type dùng ở nhiều nơi
- Type này có thể sử dụng cho biến, function, object..vv

```ts
type Point = {
  x: number
  y: number
}
type Number = number | string
function printCoord(pt: Point, val: Number) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
  console.log(val)
}

printCoord({ x: 100, y: 100 }, 'trung')
```

## Interface

- Cũng tương tự như Aliases dùng để khai báo type cho 1 object

```ts
interface Point {
  x: number
  y: number
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })
```

## Kế thừa trong Aliases và Interface

```js title=Aliases
type Animal = {
  name: string;
}

type Bear = Animal & {
  honey: boolean;
}

```

```js title=Interface
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

```

## Thêm trường mới vào Aliases và Interface

### Aliases

```ts
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}
```

- Không thể định nghĩa 2 Type cùng tên
- Nếu bạn muốn thêm field mới thì phải sử dụng kế thừa

### Interface

```ts
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}
```
