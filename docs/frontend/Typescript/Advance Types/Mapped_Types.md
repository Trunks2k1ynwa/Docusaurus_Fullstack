# Mapped Types

- Tạo ra 1 Type từ type có sẵn bằng cách map của từng key của type đó để thay đổi sao cho phù hợp với type cần tạo ra
- Sử dụng `in` trong `indexes access type` và `keyof`

```ts
type OptionFags<Type> = {
  [Property in keyof Type]: boolean
}
type FeatureFlags = {
  darkMode: () => void
  newUserProfile: () => void
}
type FeatureOptions = OptionFags<FeatureFlags>
```

## Remove or Add

- Ta có thẻ xóa hoặc thêm những yếu tố khác cho type như `readonly`, `optional ?`

```ts
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}

type LockedAccount = {
  readonly id: string
  readonly name: string
}

type UnlockedAccount = CreateMutable<LockedAccount>
```

```ts
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

type MaybeUser = {
  id: string
  name?: string
  age?: number
}

type User = Concrete<MaybeUser>
```

- Thay đổi type của từng key qua `as`

```ts
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
}

interface Person {
  name: string
  age: number
  location: string
}

type LazyPerson = Getters<Person>
```
