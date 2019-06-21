import {call, put} from 'redux-saga/effects';
import requests from '../../base/api/requests';
import {PORTAL} from '../../routes';
import history from '../../base/features/base-history';
import ChatActions, {ChatTypes} from '../../redux/chat';
import PostsActions from "../../redux/posts";

export function* sendMessage(api, action) {

	try {
		const {message} = action;

		requests.broadcastAction(ChatActions.receiveMessage(message));
	} catch (e) {
		console.log(e);
	}

}
