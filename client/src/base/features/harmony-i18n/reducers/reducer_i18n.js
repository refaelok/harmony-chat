import { fromJS } from 'immutable';
import * as ActionTypes from '../../../../actions';
import appMessages from '../../harmony-i18n';

const defaultLocale = 'en';

const INITIAL_STATE = fromJS({
    locale: defaultLocale,
    messages: appMessages[defaultLocale],
	appMessages: appMessages
});

export default function (state = INITIAL_STATE, action) {
	
    switch(action.type) {

        case ActionTypes.INITIAL_TRANSLATION:
            return INITIAL_STATE;

        case ActionTypes.CHANGE_LOCALE:
            return state.set('locale', action.payload).set("messages", appMessages[action.payload]);
        
        default:
            return state;

    }
}
