import { call, put } from 'redux-saga/effects';
import * as ActionTypes from '../../actions';
import requests from '../../base/api/requests';

export function* sendMessage(api, action) {

    try {
        requests.broadcastAction({type: ActionTypes.RECEIVE_MESSAGE, payload: action.payload});
    } catch (e) {
        console.log(e);
    }

}
