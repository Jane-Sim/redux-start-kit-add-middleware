import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import axios from 'axios';

function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

// 요청 시작, 성공, 실패 액션 타입, 액션 생성 함수 정의.
const GET_POST = 'GET_POST';
/* redux-pender의 액션 구조는 Flux standard action(https://github.com/acdlite/flux-standard-action)
   을 따르기 때문에, createAction으로 액션을 만들 수 있습니다. 두 번째로 들어가는 파라미터는
   Promise를 반환하는 함수여야 합니다.
 */

// 액션 생성 함수들은 모듈 내부에서 사용하니 export로 내보낼 필요X.
export const getPost = createAction(GET_POST, getPostAPI);

const initialState = {
  pending: false,
  error: false,
  data: {
    title: '',
    body: '',
  },
};
const reducer = handleActions(
  {
    // 다른 일반 액션 관리
  },
  initialState
);

export default applyPenders(reducer, [
  // 첫 번째 파라미터는 일반 리듀서, 두 번째 파라미터는 pender 관련 객체를 배열로 넣는다.
  {
    type: GET_POST, // type이 주어지면 이 type에 접미사를 붙인
    // 액션 핸들러들이 담긴 객체를 만듭니다.
    /* 요청 중일 때와 실패했을 때 추가로 해야 할 작업이 있다면
         이렇게 onPending과 onFailure를 추가하면 됩니다.
         onPending: (state, action) => state,
         onFailure: (state, action) => state
      */
    onSuccess: (state, action) => {
      // 성공했을 때 해야 할 작업이 따로 없으면 이 함수 또한 생략해도 됩니다.

      const { title, body } = action.payload.data;
      return {
        data: {
          title,
          body,
        },
      };
    },
  },
  /*  다른 pender 액션들을 위와 같은 객체 형태로 쓴다.
    { type: GET_SOMETHING, onSuccess: (state, action) => ...},
    { type: GET_SOMETHING, onSuccess: (state, action) => ...}
  */
]);
