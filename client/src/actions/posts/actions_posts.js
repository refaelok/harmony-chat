import * as ActionTypes from '../';

export function initializePosts() {
    return {
        type: ActionTypes.INITIAL_POSTS,
        payload: null
    }
}

export function fetchPosts () {
    return {
        type: ActionTypes.FETCH_POSTS,
        payload: null
    };
}

export function createPost(props) {
    return {
        type: ActionTypes.CREATE_POST,
        payload: props
    }
}

export function fetchPost (id) {
    return {
        type: ActionTypes.FETCH_POST,
        payload: id
    };
}

export function deletePost (id) {
    return {
        type: ActionTypes.DELETE_POST,
        payload: id
    };
}

