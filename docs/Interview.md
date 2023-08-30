# Interview
## DB : 70%
- Đếm số bản ghi trong bảng bất kì
- Tính tổng các bản ghi của 1 trường trong bảng bất kì
- Lấy ra số hóa đơn của 1 khách hàng thông qua bảng hóa đơn này
## CTDL_GT
- Stack, Queue
- Array khác gì với Linked_list
- Tìm số nguyên tố
- Binary Tree
- Chặt cây, thăm gốc
- Duyệt
- Tìm Node
## OOP
- Các tính chất và đặc điểm của tính chất đó (Tính đa hình)
- Interface dùng để làm gì
- Duplicate bản ghi nào
## Reactjs
- Callback, Memo
- Cách dùng của effect
- Redux
- HTML CSS
## C#
- Enum, Entity, Frame
- Public, Private
- Scope
## GET,POST,DELETE,PATH
### GET
- Sử dụng để yêu cầu dữ liệu từ một nguồn tài nguyên. Thường được sử dụng để lấy thông tin.
```js
fetch('https://api.example.com/posts/1', { method: 'GET' })
  .then(response => response.json())
  .then(data => console.log(data));

```
### POST
- Sử dụng để gửi dữ liệu mới lên server để tạo nguồn tài nguyên mới.
```js
fetch('https://api.example.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Post', content: 'This is a new post.' })
});

```
### PUT
-  Sử dụng để cập nhật dữ liệu của một nguồn tài nguyên đã tồn tại.
```js
fetch('https://api.example.com/posts/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated Post', content: 'This post has been updated.' })
});

```
#### PATCH
- Tương tự như PUT, nhưng chỉ cập nhật một phần của nguồn tài nguyên.

```js
fetch('https://api.example.com/posts/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ content: 'Updated content.' })
});

```
### DELETE
- Là method dùng để xóa tài nguyên được chỉ định
```js
fetch('https://api.example.com/posts/1', { method: 'DELETE' });
```
### PATCH
- Là method dùng để sửa đổi một phần cho tài nguyên
## Session, Cookie, Local
## Giới thiệu bản thân
Good morning, my name is Le Van Trung, I'm 22 years old. Currently, I have just graduated with a major in software engineering from Hanoi Industrial University.
My hometown is Thanh Hoa but now I am living and studying in Hanoi. Regarding the working process, I used to work in two companies with the position of Reactjs dev, that is an intern at NTQ solution, and a fresher at GMO system. I hope today's interview will help me accumulate new knowledge as well as add missing skills. Yes, that's all the main information about me.
## Sở thích
In my free time, I often learn more specialized knowledge such as new frameworks or libraries, in addition, improve my English skills. Sometimes, I will go out to exercise, chat with friends or go for a walk to help my mind relax after stressful school and work hours.

## JS
- push, concat
- es6
- var let const
- Null underfined
- Promise callback hell
# Css
- Selector, độ ưu tiên
# HTML
- Doctype
# React
- Virtual dom
- state
