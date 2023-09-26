# Primitive types

- typeof
- Type Assignment
- Number Types
- String Types
- Boolean Types
- null
- undefined

# Structural types

- Object
- Array
- Function
- Tuple : Định nghĩa từng type cho element trong mảng, từng value trong object
- Enum : Định nghĩa 1 enum chứa các giá trị ko thay đổi: role(admin,user,mod), male(male,female)
- Union `|` : `type A | type B`
- Literal: Gán type là 1 hoặc nhiều giá trị `Admin`,`User | Manager |Ad`

# Other types

- Any
- Unknow
- Never
- Interface `interface B {}`
- Aliases : `type A = {..}`
- Function overloading x
- Intersection types `&`
- Type casting `as` `<>` x
- Type assertions `as`

# React

- Functional Component
- TodoApp: useState, useRef, useEffect, useReducer
- Event handler
- Custom hooks: useTodos
- Generic components: RenderList
- Advanced properties: HTMLDetailsProps
- ContextAPI
- Zustand
- Redux Toolkit

# Advanced types `*`

- TypeScript Generics x
- Generic Constraints
- Generic Interfaces
- Conditional types
- Indexes types : Truy cập type của value thông qua key `Aliases\Interface[key]`
- Mapped types x
- typeof : return type của data, sử dụng với `ReturnType: type P = ReturnType<typeof f>` để lấy ra type của 1 object `f`
- keyof : dùng cho Aliases(object), interface : Object type => 1 hoặc danh sách các union type là key của objec đó:

# Utility types

- Readonly
- Required
- Partial
- Record
- Omit
- Pick

# Resources

- Nguồn học và nghiên cứu
