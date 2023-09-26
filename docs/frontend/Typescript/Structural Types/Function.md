## Function

- Ts cho phép chuyền types vào các tham số mà Function nhận

```js
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

- Xác định types của function: number,string, boolean, promise, void

```js
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```
