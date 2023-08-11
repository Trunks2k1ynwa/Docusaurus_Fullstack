# Bind, Call, Apply
- Bind, Call, Apply là các built function của function prototype, vì thế chỉ có function mới dùng được 3 hàm này
## Bind
- Thiết lập tham số `this` cho một function
- `bind()` cho phép chúng ta dễ dàng thiết lập một đối tượng cụ thể sẽ bị ràng buộc này khi một chức năng hoặc phương pháp được gọi.
- Truyền được các tham số vào cho hàm
```js
const person = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function() {
    return this.firstName + " " + this.lastName;
  }
};
const fullNameFunc = person.getFullName;
console.log(fullNameFunc()); // undefined undefined
const boundFullNameFunc = fullNameFunc.bind(person);
console.log(boundFullNameFunc()); // John Doe
```
## Call
- Được sử dụng để gọi một hàm và thiết lập giá trị của this cho hàm đó. Sau đó, bạn có thể truyền vào các đối số của hàm dưới dạng các tham số riêng biệt.
```js
var obj = {
    firstName: "Ahihi",
    lastName : "Ihaha",
 
    mMethod: function(firstName, lastName) {
        var firstName = firstName || this.firstName
        var lastName = lastName || this.lastName
        console.log("Hello " + firstName + " " + lastName)
    }
}
 
var obj1 = {
    firstName: "xxx",
    lastName : "yyy"
};
obj.mMethod() // Hello Ahihi Ihaha
obj.mMethod.call(obj1) // Hello xxx yyy
obj.mMethod.call(obj1, "xxx", "yyy") // Hello xxx yyy
```
## Apply
- Được sử dụng để gọi một hàm và thiết lập giá trị của this cho hàm đó. 
- Sau đó, bạn có thể truyền vào các đối số của hàm dưới dạng mảng các tham số
```js
obj.mMethod() // Hello Ahihi Ihaha
obj.mMethod.apply(obj1) // Hello xxx yyy
obj.mMethod.apply(obj1, ["xxx", "yyy"]) // Hello xxx yyy
```