// next는 store.dispatch와 비슷한 역할을 한다.
// 차이점은 next(action)을 했을 때는 그다음 처리해야 할 미들웨어로 액션을 넘겨주고
// 추가로 처리할 미들웨어가 없다면 바로 리듀서에 넘겨준다는 것이다.
//하지만 store.dispatch는 다음 미들웨어로 넘기는 것이 아니라 액션을 처음부터 디스패치한다.
const loggerMiddleware = store => next => action => {
    /* 미들웨어 내용 */

    //현재 스토어 상태 값 기록
    console.log('현재 상태', store.getState());
    // 액션 기록
    console.log('액션', action);

    // 액션을 다음 미들웨어 또는 리듀서로 넘깁니다.
    const result = next(action);

    // 액션 처리 후의 스토어 상태를 기록합니다
    console.log('다음 상태', store.getState());
    console.log('\n'); // 기록을 구분하려고 비어 있는 줄 프린트

    return result; // 여기에서 반환하는 값은 store.dispatch(ACTION_TYPE)했을 때 결과로 설정합니다.
}

export default loggerMiddleware; // 불러와 사용할 수 있도록 내보냅니다.