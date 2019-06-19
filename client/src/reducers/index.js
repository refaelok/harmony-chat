import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './user/reducer_user';
import posts from './posts/reducer_posts';
import chat from './chat/reducer_chat';
import i18n from '../base/features/harmony-i18n/reducers/reducer_i18n';

const rootReducer = combineReducers({
    posts		: posts,
    chat		: chat,

    i18n		: i18n,
    user		: user,
    form		: form,
});

export default rootReducer;
