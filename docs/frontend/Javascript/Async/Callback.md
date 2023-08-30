# Callback
- Là một hàm được truyền vào một hàm khác dưới dạng đối số
- Callback thường được sử dụng trong các tình huống thực hiện các hoạt động bất đồng bộ( như đọc tệp, thực hiện yêu cầu HTTP) hoặc khi bạn muốn thực hiện một hành động sau khi một hành động khác hoàn thành
```js
// Cần 1s để nấu cơm
function nau_com() {
    setTimeout(() => {
        console.log('Nấu com')
    },1000)
}

// con mèo ăn cơm
function an_com() {
    console.log('an com');
}
nau_com();
an_com();
// Ăn com -> Nấu cơm
// Dùng callback để chạy đúng
function nau_com(an_com) {
    setTimeout(() => {
        console.log('Nấu com')
        an_com()
    },1000)
}
nau_com(an_com);
```
## Callback hell
- Là tình huống xảy ra khi bạn có một số lượng lớn các hoạt động bất đồng bộ mà cần thực hiện tuần tự, hoạt động sau cần data từ hoạt động trước
- Vì thế ta phải lồng ghép các callback vào nhau tạo thành nhiều lớp dẫn đến callback hell
- Callback hell làm code khó đọc, khó bảo trì.
```js
asyncFunction1(function(response1) {
  asyncFunction2(response1, function(response2) {
    asyncFunction3(response2, function(response3) {
      // ...
    });
  });
});

```