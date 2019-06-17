import { takeLatest, takeEvery } from 'redux-saga/effects';
import createApi from '../requests';
import * as ActionTypes from '../actions';
import * as sagasUser from './user/saga_user';
import * as sagasPosts from './posts/saga_posts';


const innorlate = createApi();

export default function* () {
    yield [
        takeLatest(ActionTypes.LOGIN, sagasUser.login, innorlate),
        takeLatest(ActionTypes.CREATE_USER, sagasUser.createUser, innorlate),
        takeLatest(ActionTypes.FETCH_POSTS, sagasPosts.fetchPosts, innorlate),
        takeLatest(ActionTypes.FETCH_POST, sagasPosts.fetchPost, innorlate),
        takeLatest(ActionTypes.CREATE_POST, sagasPosts.createPost, innorlate),
        takeLatest(ActionTypes.DELETE_POST, sagasPosts.deletePost, innorlate),
    ]
}