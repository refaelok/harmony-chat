import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../../../reducers';
import rootSaga from '../../../sagas';
import { globalStoreListener, STORE_ACTION_LISTENERS } from '../harmony-services';



/* --------- define middlewares ---------- */

export const globalActionListener = store => next => action => {
    let result = next(action);
    globalStoreListener.publish(STORE_ACTION_LISTENERS, action);
    return result
};

const sagaMiddleware = createSagaMiddleware();
/* -------- create the store with middleware ---------- */
const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    globalActionListener
)(createStore);

const store = createStoreWithMiddleware(reducers);


/* -------- run root saga ---------- */
sagaMiddleware.run(rootSaga);


/* -------- expose store functionality to page level ------------- */
export default store;