# useContext
- `useContext` là 1 hook cho phép bạn đọc và áp dụng bối cảnh vào component của bạn
```js
const value = useContext(SomeContext)
```
## Các tham số
- `someContext` : Là bối cảnh mà bạn đã tạo trước đó với `createContext`. Bản thân bối cảnh chỉ đại diện cho data bạn có thể cung cấp hoặc đọc từ các component
## Return
- `useContext` trả về giá trị ngữ cảnh. Nó được hiểu là `value` được truyền đến `SomeContext.Provider` gần nhất.
## Cách sử dụng
### Truyền data vào bên trong cây
- `useContext` return giá trị của `context` gần nhất mà bạn đã truyền
```js
function MyPage() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}
function Button() {
  const theme = useContext(ThemeContext);
  //theme = value = 'dark'
}
```
- Bạn có thể lấy `context` ở component nằm dưới component mà bạn truyền `context Provider`, không quan trọng có bao nhiêu tầng
### Cập nhật dữ liệu qua context
- Để cập nhật `context` ta có thể dùng `useState`. Khai báo `useState` ở component cha (chưa Provider)
```js
function MyPage() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <Button onClick={() => {
        setTheme('light');
      }}>
        Switch to light theme
      </Button>
    </ThemeContext.Provider>
  );
}
```
### Chỉ định giá trị mặc đinh
- Trong trường hợp không tìm thấy `context` gần nhất thì giá trị `context` sẽ được gán với giá trị mặc định truyền vào.
### Ghi đè context của một component
- Bạn có thể ghi đè ngữ cảnh cho một phần của cây bằng cách bọc nó trong `Provider` và cung cấp giá trị khác
```js
<ThemeContext.Provider value="dark">
  ...
  <ThemeContext.Provider value="light">
    <Footer />
  </ThemeContext.Provider>
  ...
</ThemeContext.Provider>
```
### Tối ưu hóa quá trình re-render khi truyền objects,funtions 
- Khi bạn truyền context là object, funtion
- Quá trình re-render sẽ thừa thãi vì mỗi lần re-render thì object và funtion này sẽ tạo lại và có giá trị khác, vì thế nên dùng `useCallback`, `useMemo` để cải thiện vấn đề này
```js
function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback((response) => {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);

  const contextValue = useMemo(() => ({
    currentUser,
    login
  }), [currentUser, login]);

  return (
    <AuthContext.Provider value={contextValue}>
      <Page />
    </AuthContext.Provider>
  );
}
```

