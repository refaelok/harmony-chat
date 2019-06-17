import { call, put } from 'redux-saga/effects';
import * as ActionTypes from '../../actions';
import { ROOT, PORTAL } from '../../routes';
import request from '../../base/api/requests';
import history from '../../base/features/harmony-history';



export function* login(api, action) {

    try {
        const response = yield call(api.login, action.payload);
        console.log(response);
        let AUTH_TOKEN = response.headers["x-auth"];

        if (AUTH_TOKEN) {
            response.data.Authorization = AUTH_TOKEN;
            request.setCommonHeader('Authorization', AUTH_TOKEN);

            sessionStorage.setItem('user', JSON.stringify(response.data));

            yield put({ type: ActionTypes.LOGIN_SUCCESS, details: response.data });
            history.push(PORTAL);
        }

        else {
            yield put({ type: ActionTypes.LOGIN_ERROR, loginError: response.data.message });
        }

    } catch (e) {
        console.log(e);
        yield put({ type: ActionTypes.LOGIN_ERROR, loginError: e.data && e.data.message ? e.data.message : '' });
    }

}

export function* createUser(api, action) {

    try {
        yield call(api.createUser, action.payload);

        history.push(ROOT);
    } catch (e) {
        yield put({ type: ActionTypes.CREATE_USER_ERROR, response: e.data && e.data.message ? e.data.message : '' });
    }

}
