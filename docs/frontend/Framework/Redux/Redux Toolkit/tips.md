---
title : Tips Toolkit
---
# Các tips khi sử dụng Redux toolkit
## Store
## Slice
- {`reducer`,`prepare`} trong reducer
```js
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
}
```
- `Selector function`
```js title=postSlice.js
export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)
```
## Selector
```js
export const PostsList = () => {
  const posts = useSelector(selectAllPosts)
   const post = useSelector(state => selectPostById(state, postId))
}
```
## Dispatcher