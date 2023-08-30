# Fibonacci
- Là dãy các số mà số hiện tại bằng tổng 2 số trước đó
- Dãy Fibonacci bắt đầu từ F0 và F1

```js title=vongfor
const find = n => {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  }
  let fibNMinus1 = 0;
  let fibNMinus2 = 1;
  let FibN = 0;
  for (let i = 2; i <= n; i++) {
    FibN = fibNMinus1 + fibNMinus2;
    fibNMinus1 = fibNMinus2;
    fibNMinus2 = FibN;
  }
  return FibN;
};
```
- Theo đệ quy
```js
const find = n => {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return find(n - 1) + find(n - 2);
  }
};
```