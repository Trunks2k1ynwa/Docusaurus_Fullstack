# ForwardRef

- `forwardRef` cho phép component của bạn ném 1 `DOM node` đến component cha với `ref`

```js
const SomeComponent = forwardRef(render);
```

- Gọi `forwardRef` để component của bạn có thể nhận được 1 `ref` and chuyển tiếp cái `ref` đó đến component con.

```js
import { forwardRef } from "react";

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

- Tại đây, component cha có thể lấy được `DOM node` thông qua cái `ref` như sau :

```js
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
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
