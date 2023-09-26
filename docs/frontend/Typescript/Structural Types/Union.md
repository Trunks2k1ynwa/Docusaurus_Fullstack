## Union Type

- Type A | Type B
- Type này hoặc type kia
- Định nghĩa nhiều type có thể sử dụng
- Thường sử dụng `typeof` để kiểm tra

```js
  function UnionType(list:string[] | string){
    if(typeof list === 'string'){
      console.log(list)
    }else{
      console.log(list.length)
    }
  }
  UnionType(['trung','name','hdajsf'])
  UnionType('Lê Văn Trung')
```
