# useImperativeHandle
- `useImperativeHandle` là 1 hook dùng để tùy chính việc xử lý `ref` ở component con
- `useImperativeHandle` return underfined
```js
useImperativeHandle(ref, createHandle, dependencies?)
```
## Tham số
### ref
- `ref` là tham chiếu mà bạn nhận được làm đối số thứ hai từ hàm render `forwardRef`
### createHandle
- `createHandle` là 1 function không nhận đối số, function này sẽ tùy chỉnh `ref` sao cho component cha chỉ nhận được những method, thuộc tính cần thiết.
- Thông thường sẽ return object với các phương thức mà muốn thực thi
### dependencies
- `dependencies` 
- List value : state, props, value, function được khai báo trong component
```js
 [dep1,dep2,dep3]
```
- React sẽ so sánh từng dependency với giá trị trước đó bằng phép so sánh Object.is
## Cách sử dụng
### Tùy chỉnh những method cần thiết với ref để component cha sử dụng
- Mặc định thì các component sẽ không ném ra toàn bộ `Dom node` của nó cho component cha. Điều này sẽ làm component cha có toàn quyền sử lý component con, gây mất tính toàn vẹn dữ liệu
- VD: Nếu muốn component cha có toàn quyền truy cập vào cpn `MyInput`, bạn sẽ dùng `forwardRef` như sau :
```js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});

```
- 1 tham chiếu đến cpn `MyInput` sẽ nhận được toàn bộ `<input>Dom node`. Tuy nhiên bạn muốn tùy chỉnh nó, chỉ muốn ném ra những method cần thiết thì hãy sử dụng`useImperativeHandle`

```js
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```
- Lúc này component cha gửi `ref` đến `MyInput`. Nó chỉ có thể sử dụng được 2 phương thức là `focus` và `scrollIntoView`. Và nó sẽ không có quyền truy cập đầy đủ vào nút `DOM<input>` bên dưới.
```js
export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    // This won't work because the DOM node isn't exposed:
    // ref.current.style.opacity = 0.5;
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```
### Ném ra các methods riêng của bạn.
- Các method mà bạn muốn ném ra không nhất thiết phải là các method của Dom đó
- Bạn có thể tùy chỉnh tạo ra các method với những chức năng tùy biến hơn để ném ra cpn Cha sử dụng.
### Chú ý
- Không nên làm dụng `ref`. Chỉ nên dùng với cách hành vi thao tác với DOM : scroll, focues, trigger animation, chọn văn bản.
## Ví dụ tổng quát
![Alt text](image-1.png)
```js title="UseImperativeHandle.jsx"
export default function UseImperativeHandle() {
  const videoRef = useRef();
  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          height: "50vh",
          fontSize: "20px",
          margin: "auto",
        }}
      >
        <MyVideo ref={videoRef} />
        <div
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button onClick={() => videoRef.current.play()}>Play</button>
          <button onClick={() => videoRef.current.pause()}>Pause</button>
        </div>
      </div>
    </Layout>
  );
}
```
```js title="MyVideo.jsx"
const MyVideo = (props, ref) => {
  const videoRef = useRef(null)
  useImperativeHandle(
    ref,
    () => {

      return {
        play() {
          videoRef.current.play()
        },
        pause() {
          videoRef.current.pause()
        }
      }
    },
    [],
  )
  return (
    <video autoPlay={true} {...props} ref={videoRef} src={video} width="520" controls>Video test
   </video>
  )
}
```

## Tổng quát
- `useImperativeHandle` dùng để custom các phương thức,thuộc tính từ `ref` của component con và return các thứ đó ra bên ngoài cho component cha dùng.
- Giúp đảm bảo tính toàn vẹn, riêng tư dữ liệu ở component con.
- [Test useImperativeHandle](http://localhost:3000/hooks/useImperativeHandle)

