import { handleActions, createAction } from 'redux-actions';
/* delay: 작업을 지연시킵니다.
   put: 새 액션을 dispatch 합니다
   takeEvery: 특정 액션을 모니터링 하고, 발생하면 특정 함수를 발생시킵니다.
*/
import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'DECREMENT_ASYNC';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const incrementAsync = createAction(INCREMENT_ASYNC);
export const decrementAsync = createAction(DECREMENT_ASYNC);

function* incrementAsyncSaga() {
  yield delay(1000);
  yield put(increment());
}

function* decrementAsyncSaga() {
  yield delay(1000);
  yield put(decrement());
}

export function* counterSaga() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
  yield takeEvery(DECREMENT_ASYNC, decrementAsyncSaga);
}

export default handleActions(
  {
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1,
  },
  1
);
