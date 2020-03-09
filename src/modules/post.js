import { handleActions, createAction } from 'redux-actions';
/* call: 첫번째 파라미터로 전달한 함수에 그 뒤에 있는 파라미터들은 
전달하여 호출해줍니다. 이를 사용하면 나중에 테스트를 작성하게 될 때 용이합니다.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

// 요청 시작, 성공, 실패 액션 타입, 액션 생성 함수 정의.
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const getPost = createAction(GET_POST, postId => postId);

const something = () => ({
  data: { title: 'hello', body: 'world' },
});

function* getPostSaga(action) {
  console.log(call(something, ''));
  try {
    const response = yield call(getPostAPI, action.payload);
    yield put({ type: GET_POST_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: GET_POST_FAILURE, payload: e });
  }
}

const initialState = {
  data: {
    title: '',
    body: '',
  },
};

export function* postSaga() {
  yield takeEvery('GET_POST', getPostSaga);
}

export default handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => {
      const { title, body } = action.payload.data;
      return {
        data: { title, body },
      };
    },
  },
  initialState
);
