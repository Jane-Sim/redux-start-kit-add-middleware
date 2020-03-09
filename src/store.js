import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
import { createLogger } from 'redux-logger';
import { createPromise } from 'redux-promise-middleware';

/* 로그 미들웨어를 만들 때 설정을 커스터마이징할 수 있습니다.
    https://github.com/evgenyrodionov/redux-logger#options
 */

const logger = createLogger();
// promiseMiddleware는 Promise 객체를 payload로 전달하면 요청을 시작, 성공, 실패할 때
// 원래의 _PENDING, _FULFILLED, _REJECTED로 액션의 뒷부분에 요청상태를 붙여서
// 반환하는데, 지금은 예시에 맞게 뒷부분에 붙는 접미사를 커스텀한다.
const pm = createPromise({
  promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE'],
});

// 미들웨어가 여러 개일 때는 파라미터로 전달하면 됩니다. 예: applyMiddleware(a,b,c)
// 미들웨어 순서는 여기에서 전달한 파라미터 순서대로 지정합니다.
const store = createStore(modules, applyMiddleware(logger, pm));

export default store;
