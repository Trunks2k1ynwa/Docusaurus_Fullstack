---
title: RTK Query Basics
---

## Tổng quan về RTK Query

- Công cụ fetching và caching data
- RTK chủ yếu bao gồm 2 APIs chính :
  - `createApi()` : Xác định 1 tập hợp các `endpoint` môt tả truy xuất data từ `endpoint` đó, gồm cấu hình để tìm nạp và chuyển đổi dữ liệu
  - `fetchBaseQuery()` : Trình bao bọc nhằm mục đích đơn giản hóa các request. `baseQuery` được dùng trong `createAPI` cho phần lớn người dùng

## RTK Query Caching

- Data được lưu trong bộ nhớ cache
- Khi đó chúng ta cần phải : Tìm nạp, lưu trữ, và truy xuất data trong cache

## Cài đặt RTK Query

- Với RTK query, Logic về việc quản lý dữ liệu lưu trong cache được tập trung vào `API slice` trên mỗi app.
- Giống như mỗi App chỉ có 1 Redux store

### Định nghĩa API Slice

```js title=features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = apiSlice;
```

- Khi gọi `createApi` có 2 trường bắt buộc :
  - `baseQuery` : Là function để biết cách fetch data từ Server.Nó dự trên `fetch()` tiêu chuẩn để xử lý các yêu cầu và phản hồi
  - `fetchBaseQuery` sẽ chuyền `Base URL` cho các request
  - `endpoints`: Là 1 tập hợp các yêu cầu để tương tác với máy chủ
  - `endpoints` có thể trở thành truy vấn để trả về dữ liệu và `caching` hoặc thay đổi dữ liệu trên `server`.Nó có 1 tham số là `builder` chứa 2 method là `builder.query` và `buider.mutation` để lấy và cập nhật dữ liệu

## Cấu hình Store

- API Slice tự động tùy chỉnh `middleware` cái mà cần thiết và thêm vào store, nó quản lý thời gian tồn tại và hết hạn của bộ nhớ cache

```js
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import { apiSlice } from "../features/api/apiSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
```

## Cách sử dụng

### Sử dụng hooks query trong component

```js
const {data: posts,isLoading,isSuccess,isError,error}useGetPostsQuery()
let content
if (isLoading) {
  content = <Spinner text="Loading..." />
} else if (isSuccess) {
  content = posts.map(post => <PostExcerpt key={post.id} post={post} />)
} else if (isError) {
  content = <div>{error.toString()}</div>
}
```

### Sort Data

- Bạn không nên sử dụng Array.sort() nó sẽ làm mất tính toàn vẹn của dữ liệu `mutate`

```js
const sortedPosts = posts.slice();
// Sort posts in descending chronological order
sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
```

### Hiển thi dữ liệu theo ID

- Thêm endpoid cho truy vân đó

```js
endpoints: (builder) => ({
  getPosts: builder.query({
    query: () => "/posts",
  }),
  getPost: builder.query({
    query: (postId) => `/posts/${postId}`,
  }),
});
export const { useGetPostsQuery, useGetPostQuery } = apiSlice;
// Sử dụng
const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);
```

### Tạo 1 cập nhật request

```js
addNewPost: builder.mutation({
  query: (initialPost) => ({
    url: "/posts",
    method: "POST",
    body: initialPost,
  }),
});
export const { useAddNewPostMutation } = apiSlice;
```

- Sử dụng trong component

```js
const [addNewPost, { isLoading }] = useAddNewPostMutation();
const handleUpdate = async () => {
  await addNewPost({ title, content, user: userId }).unwrap();
};
```

### Làm mới data trong cache

```js
const {
    data: posts = [],
    isSuccess,
    refetch
  } = useGetPostsQuery()
// Sử dụng trong component
<button onClick={refetch}>Refetch Posts</button>
```

#### Tự động làm mới

- Tự động tải lại khi có yêu cầu cập nhật, thêm sửa, xóa được gửi đi và hoàn thành
- Bằng cách đó biết được data trong cache phải chỉnh sửa để đồng bộ với máy chủ
- RTK cho phép tạo quan hệ giữa các truy vấn và các truy vấn đột biến để cho phép tìm nạp dữ liệu tự động
- Sử dụng `tag` là 1 chuỗi hoặc 1 object cho phép đặt tên cho loại dữ liệu và làm mất hiệu lực trong cache và RTK sẽ tự động tìm nạp lại các endpoint đã được đánh dấu bằng thẻ đó.

```js
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
```

- `tagTypes` : Trường cho API slice, khai báo 1 mảng tên `tag` cho loại dữ liệu đó
- `providesTags` : Mảng các `endpoint`, liệt kê tập hợp các thẻ mô tả truy vấn đó
- `invalidatesTags` : Mảng các `endpoint` `mutation`, liệt kê tập hợp các tag bị vô hiệu hóa mỗi khi `mutation` đó chạy
