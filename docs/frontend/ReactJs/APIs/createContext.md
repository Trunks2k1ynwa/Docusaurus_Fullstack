---
title: "CreateContext"
---

# createContext

- `createContext` cho phép bạn tạo 1 `context` mà các component có thể cung cấp và đọc

```js
const SomeContext = createContext(defaultValue);
```

- Gọi `createContext` bên ngoài component để tạo 1 context

```js
import { createContext } from "react";

const ThemeContext = createContext("light");
```

## Tham số

- `defaultValue` là giá trị bạn muốn `context` nhận được khi không tìm thấy `context provider` nào trùng khớp, nếu không truyền giá trị vào thì sẽ là null
- `createContext` return đối tượng `context`
- Đối tượng `context` chỉ đại diện cho ngữ cảnh chứ không chứa bất kì thông tin nào
- Nó đại diện cho ngữ cảnh mà thành phần khác đọc hoặc cung cấp
- Thông thường, ta sẽ dùng `SomeContext.Provider` trong các component cha để chỉ định giá trị ngữ cảnh cho các component con
- Sử dụng `useContext(SomeContext)` ở các thành phần bên dưới để đọc nó

## SomeContext.Provider

- Bọc component vào trong `context provider` và chỉ định giá trị của `context` này cho các thành phần bên trong

```js
function App() {
  const [theme, setTheme] = useState("light");
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

- `value` là giá trị truyền vào để các component con ở trong `context` có thể truy cập được qua `useContext(ThemContext)`

## SomeContext.Consumer

- Trước khi `useContext` tồn tại, có 1 cách cũ hơn để đọc `context` là :
- Cách này hiện tại không được khuyến khích

```js
<ThemeContext.Consumer>
  {(theme) => <button className={theme} />}
</ThemeContext.Consumer>
```

## Cách sử dụng

### Tạo context

```js
// Contexts.js
import { createContext } from "react";
export const ThemeContext = createContext("light");
export const AuthContext = createContext(null);
```

```js
// App.js
import { ThemeContext, AuthContext } from "./Contexts.js";

function App() {
  const [theme, setTheme] = useState("dark");
  const [currentUser, setCurrentUser] = useState({ name: "Taylor" });

  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider value={currentUser}>
        <Page />
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
```
```js
//Page.js
import React, { useContext } from "react";
import { ThemeContext } from "../../utils/context.js";
const Context = () => {
  const theme = useContext(ThemeContext);//'dark'
  return <div>Giao diện: {theme}</div>;
};

export default Context;
```
