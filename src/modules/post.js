import { handleActions, createAction } from 'redux-actions';

import axios from 'axios';

function getPostAPI(postId) {
  console.log(postId);
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

// 요청 시작, 성공, 실패 액션 타입, 액션 생성 함수 정의.
const GET_POST = 'GET_POST';
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

// 액션 생성 함수들은 모듈 내부에서 사용하니 export로 내보낼 필요X.
const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE);

export const getPost = postId => {
  //먼저 요청이 시작했다는 것을 알립니다.
  dispatch(getPostPending());

  // 요청을 시작합니다. 여기에서 만든 promise를 return해야 나중에 컴포넌트에서
  // 호출할 떄 getPost().then(...)을 할 수 있습니다.
  return getPostAPI(postId)
    .then(response => {
      // 요청이 성공했다면 서버 응답 내용을 payload로 설정하여
      // GET_POST_SECCESS 액션을 디스패치합니다.
      dispatch(getPostSuccess(response));
      // 나중에 getPostAPI.then을 했을 떄 then에 전달하는
      // 함수에서 response에 접근할 수 있게 합니다.
      return response;
    })
    .catch(error => {
      dispatch(getPostFailure(error));
      // error를 throw하여 이 함수를 실행한 후
      // 다시 한 번 catch를 할 수 있게 합니다.
      throw error;
    });
};

const initialState = {
  pending: false,
  error: false,
  data: {
    title: '',
    body: '',
  },
};

export default handleActions(
  {
    [GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_POST_SUCCESS]: (state, action) => {
      const { title, body } = action.payload.data;

      return {
        ...state,
        pending: false,
        data: {
          title,
          body,
        },
      };
    },
    [GET_POST_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
