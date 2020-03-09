import { createStore, applyMiddleware } from 'redux';
import modules, { rootSaga } from './modules';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

/* 로그 미들웨어를 만들 때 설정을 커스터마이징할 수 있습니다.
    https://github.com/evgenyrodionov/redux-logger#options
 */

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(modules, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
