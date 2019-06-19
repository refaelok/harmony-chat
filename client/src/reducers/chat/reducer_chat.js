import * as ActionTypes from '../../actions';

const INITIAL_STATE = {
    messageList: []
};

export default function (state = INITIAL_STATE, action) {
    const newState = {...state};

    switch(action.type) {

        case ActionTypes.SEND_MESSAGE:
            console.log('SEND', action);

            newState.messageList = [...newState.messageList, action.payload];
            return newState;

        case ActionTypes.RECEIVE_MESSAGE:
            console.log('RECEIVE', action);

            action.payload.author = 'them';
            newState.messageList = [...newState.messageList, action.payload];
            return newState;

        default:
            return state;

    }
}
