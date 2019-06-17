import { fromJS } from 'immutable';
import * as ActionTypes from '../../actions';

const INITIAL_STATE = fromJS({
    details: null,
    loginError: null,
    registerError: ''
});

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {

        case ActionTypes.LOGIN_SUCCESS:
            return state.set('details', action.details);

        case ActionTypes.LOGIN_ERROR:
            return state.set('loginError', action.loginError);

        case ActionTypes.CREATE_USER_ERROR:
            return state.set('registerError', action.response);

        default:
            return state;

    }
}
