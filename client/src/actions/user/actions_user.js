import * as ActionTypes from '../';

export function createUser (data) {
    return {
        type: ActionTypes.CREATE_USER,
        payload: data
    }
}

export function login (data) {
    return {
        type: ActionTypes.LOGIN,
        payload: data
    }
}

