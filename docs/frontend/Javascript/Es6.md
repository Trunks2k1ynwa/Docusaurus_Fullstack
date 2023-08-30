# ECMASCIPRT 6 (2015)
## Biến : Let, const
- Const : Hỗ trợ tính bất biến (immutable)
- Let : Có thể gán lại, no hoisting
## Arrow Functions
```js
const name = (a,b)=>a+b
```
## Xử lý tham số mở rộng
- Default parameter
```js
const name = (a='Trung',b=20)=>a+b
```
- Rest parameter
```js
const name = (x,y,...z)=> (x+y)*z.lenght
```
- Spread operator
```js
const list = [1,3,4,5];
const name = (...list)=>list[0]
```
- Destructuring Assignments
```js
let list = [ 1, 2, 3 ]
let [ a, , b ] = list
[ b, a ] = [ a, b ]
```
- for..of
- Template literals
```js
const x = 'Trung';
const name = `Họ tên của tôi là : ${x}`
```
- Multi-line string
```js
var content = 'Toi ten la Tran Van My,\n\t'
    + 'La mot developer cua cong ty Framgia\n\t'
    + 'Ad: 13F Keangnam Landmark 72 Tower, Plot E6, Pham Hung Road, Nam Tu Liem District\n\t'
    + 'So thich la: code, xem anime, va ngu\n\t'

console.log(content);
```
## Object Properties
- Property shorthand
```js
const x = 2, y = 4
obj = { x, y }
```
- Computed Property Names: Hỗ trợ tên thuộc tính được tính toán
```js
let obj = {
    foo: "bar",
    [ "baz" + quux() ]: 42
}
```
- Method properties
```js
let obj = {
  // es6
  foo(a,b){},
  // es5
  foo:function(a,b){}
}
```
- Es6 Modules
```js
export const x = 5
export default function sum(a,b){}

import * as all from 'lib/math';
import {sum,pi} from 'lib/math';
import trung from 'name'
```
## ES6 Classes
- Định nghĩa
```js
class Shape{
  constructor(id,x){
    this.id=id;
    this.x = 2;
    this.y=3
  }
  move(z){
    return this.x + this.y+z
  }
}
```
- Kế thừa
```js
class Square extends Shape{
  constructor(id,x,y,width,height){
    super(id,x,y);
    this.width = width;
    this.height = height;
  }
  transform(){
    console.log('Trung transform');
    super.move()
  }
}
```
- Static : Định nghĩa phương thức hoặc thuộc tính tĩnh
```js
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}
// Truy cập các phương thức tĩnh trực tiếp từ lớp mà không cần tạo thể hiện
const sum = MathUtils.add(5, 3);
const product = MathUtils.multiply(4, 7);
```
## Interators:  
- Là tính năng giúp bạn lặp qua từng phần tử của cấu trúc dữ liệu như mảng
- Đối tượng có thể lặp là `Iterable Objects`
### Iterator
- Là 1 đối tượng được trả về bởi `Symbol.iterator`
- Cung cấp method`next` dùng để gọi lấy phần tử tiếp theo và return `{value,done}`
```js
const numbers = [1, 2, 3, 4, 5];
const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // Output: { value: 1, done: false }
```
- Việc gọi phương thức `symbol.iterator()` cho mảng, chuỗi sẽ trả về các đối tượng interator tương ứng của chúng
- Sử dụng `for of` để duyệt qua các đối tượng `iterator`
- Xem thêm tại['https://tek4.vn/tutorial/javascript-tutorial/iterator-iterable]
## Generators
## Es6 collections : Map, Set, Weak Map, WeakSet
## Promise