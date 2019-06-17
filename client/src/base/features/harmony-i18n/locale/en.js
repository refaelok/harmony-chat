import PostsLocale from '../../../../containers/posts/i18n/Posts.i18n.en';
import UserLocale from '../../../../containers/user/i18n/User.i18n.en';

const enLocale = {
    // Gulp Inject Locales Here
	...PostsLocale,
    ...UserLocale
};

export default enLocale;