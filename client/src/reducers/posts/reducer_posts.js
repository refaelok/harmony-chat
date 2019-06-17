import { fromJS } from 'immutable';
import * as ActionTypes from '../../actions';

const INITIAL_STATE = fromJS({
    all: [],
    post: null,
    message: null,
    navigateTo: null
});

export default function (state = INITIAL_STATE, action) {

    switch(action.type) {

        case ActionTypes.INITIAL_POSTS:
            return INITIAL_STATE;

        case ActionTypes.FETCH_POSTS_SUCCESS:
            return state.set('all', action.posts)
                .set('message', action.message);

        case ActionTypes.FETCH_POSTS_ERROR:
            return state.set('message', 'some server error occurred');

        case ActionTypes.FETCH_POST_SUCCESS:
            return state.set('post', action.post);

        case ActionTypes.FETCH_POST_ERROR:
            return state.set('post', null);

        case ActionTypes.CREATE_POST_ERROR:
            return state.set('message', action.message);

        case ActionTypes.DELETE_POST_ERROR:
            return state;


        default:
            return state;

    }
}
