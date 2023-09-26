## Condition type !

- Xác định type thông qua điều kiện ở toán tử 3 ngôi, sử dụng `extends`

```ts
SomeType extends OtherType ? TrueType : FalseType;
```

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;

type Example1 = number;

type Example2 = RegExp extends Animal ? number : string;
```
