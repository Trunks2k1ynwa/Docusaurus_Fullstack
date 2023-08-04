---
title: Redux
---
## Tips
### Actions trong slice
- `createSlice` cho phép chúng ta viết `prepare callback` function
- `prepare` return `aciton.payload`
- Hàm này nhận vào nhiều đối số, tạo ra các giá trị ngẫu nhiên như ID duy nhất,sau khi trả về giá trị (object, array, value)
- Sau khi `prepare` handle xong sẽ chạy vào action object với `action.payload` = gọi hàm `callback prepare`, giá trị trả về trong hàm
```js
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
    // other reducers here
  }
})
```
- Khi user dispatch `postAdded(title,content)`
- `store` sẽ chạy `reducer`, `prepare` được chạy trước với hai đối số này từ dispatch
- `prepare` trả về giá trị, `reducer` sẽ chạy với `state`,`action`
- Cập nhật `state` với `action`.`payload` bằng giá trị trả về trong `prepare`