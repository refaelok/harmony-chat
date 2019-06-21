import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	sendMessage: ['message'],
	receiveMessage: ['message']
});

export const ChatTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
	messageList: []
});

/* ------------- Selectors ------------- */

export const ChatSelector = {
	messageList: state => state.chat.messageList
};

/* ------------- Reducers ------------- */

const initialStateReducer = () => {
	return INITIAL_STATE;
};

const sendMessageReducer = (state, action) => {
	const { message } = action;
	return state.merge({messageList: state.messageList.concat([message])});
};

const receiveMessageReducer = (state, action) => {
	const { message } = action;
	message.author = 'them';
	return state.merge({messageList: state.messageList.concat([message])});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.SEND_MESSAGE]: sendMessageReducer,
	[Types.RECEIVE_MESSAGE]: receiveMessageReducer
});
