---
title: Redux Saga
---
## Logic với createListenerMiddleware
- Nhiều ứng dụng Redux có logic `phản ứng` trước việc lắng nghe các `action` hoặc thay đổi `state`, và chạy các logic bổ sung để phản hồi. Những hành vi này thường được triển khai bằng `redux-saga` hoặc `redux-observable`
- VD: Một saga lắng nghe 1 action, chờ 1s rồi dispatch một action bổ sung
```js title=src/sagas/ping.js
import { delay, put, takeEvery } from 'redux-saga/effects'

export function* ping() {
  yield delay(1000)
  yield put({ type: 'PONG' })
}

// "Watcher" saga that waits for a "signal" action, which is
// dispatched only to kick off logic, not to update state
export function* pingSaga() {
  yield takeEvery('PING', ping)
}
```
```js title=store.js
function* rootSaga() {
  yield pingSaga()
}
const sagaMiddleware = createSagaMiddleware()
const middlewareEnhancer = applyMiddleware(sagaMiddleware)
const store = createStore(rootReducer, middlewareEnhancer)
sagaMiddleware.run(rootSaga)
```
- RTK lắng nghe `middleware` đã được thiết kế để thay thế `sagas` và `obervables`, với API đơn giản, nhỏ gọn. Cấu hình có thể thay thế như sau
```js title= listenerMiddleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit'

// Best to define this in a separate file, to avoid importing
// from the store file into the rest of the codebase
export const listenerMiddleware = createListenerMiddleware()

export const { startListening, stopListening } = listenerMiddleware
```
```js title: store.js
import { configureStore } from '@reduxjs/toolkit'
import { listenerMiddleware } from './listenerMiddleware'

export const store = configureStore({
  reducer: rootReducer,
  // Add the listener middleware _before_ the thunk or dev checks
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})
```
