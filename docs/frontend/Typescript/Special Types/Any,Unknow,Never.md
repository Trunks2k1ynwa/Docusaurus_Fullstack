## Any

- Khi không định nghĩa types thì ts sẽ hiểu type ngầm định là any
- Dùng khi bạn không muốn giá trị cụ thể gây ra lỗi

```js
  let obj: any = { x: 0 };
  obj.foo();
  obj();
  obj.bar = 100;
  obj = "hello";
```

## Unknown

- Dùng khi bạn không biết chính xác type để gán

```js
  function Unknown(name:unknown,age:number){
    let height:unknown;
    if(typeof height === 'string')
    height = '200';
    console.log(name,height,age)
  }
  Unknown('trung',18)
```

## Never
