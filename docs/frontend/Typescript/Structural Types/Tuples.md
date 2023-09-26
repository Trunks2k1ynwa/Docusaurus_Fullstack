# Khai bao types trong từng element trong array,Object

```ts
const array: [number, string] = [223, 'sdfa']

const object: { name: string; age: number } = { name: 'String', age: 221 }
```

## readonly

```ts
function doSomething(pair: readonly [string, number]) {
  pair[0] = 'hello!' //error
}
```
