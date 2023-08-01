---
title: Hooks overview
authors: Trunks
tags: [react hook, docusaurus]
---
## 1.useState
- Là hook dùng để khai báo `state` trong component
```js
const [state, setState] = useState(initialStateValue)
```
## 2.useEffect
- Là hook dùng để xử lý các side-effect bên trong component
```js
useEffect(setup,dependencies?)
```
- `setup` là 1 function chứa logic của side-effect
- `setup` có thể return `cleanup` function để tránh các trường hợp memory-leak
- `dependencies` là điều kiện để chạy `setup` function
- `dependencies` : nothing,[ ], [prop,state]
  + nothing, setup chạy mỗi khi component re-render
  + [], setup chạy lần duy nhất khi component re-render
  + [props,state], setup sẽ chạy khi có `props` hoặc `state` thay đổi
- Component render : `jsx` -> `setup`(current `state`)
- Component re-render : `jsx` -> `cleanup`(previous ``state``) -> side-effect(current `state`)
- Component removed : `jsx` -> `cleanup`
## 3.useCallback
## 4.useMemo
## 5.useRef
## 6.useTransition
## 7.useDefferedValue
## 8.useReducer
## 9.useId
## 10.useLayoutEffect
## 11.useContext
## 12.useDebugValue
## 13.useIntertionEffect
## 14.useImperativeHandle
## 15.useSyncExternalStore