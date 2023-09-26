# Record

- Cấu trúc : `Record<Keys, Type`
- Xây dựng type cho Object có các key nằm trong `Keys`, và value có type là `Type`
- Dùng để ánh xạ thuộc tính loại này xang loại khác

```ts
interface CatInfo {
  age: number
  breed: string
}

type CatName = 'miffy' | 'boris' | 'mordred'

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' }
}
```
