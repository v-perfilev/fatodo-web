export const BASE_URL = process.env.BASE_URL;
export const API_URL = process.env.API_URL;
export const IMAGE_API_URL = API_URL + '/api/image/store/';
export const MESSAGE_WS_URL = API_URL + '/ws/message/';

export const FALLBACK_AVATAR = '/images/fallback.jpg';

export const API_TIMEOUT = 60 * 1000;
export const LOADER_TIMEOUT = 500;

export const AUTHORIZATION_HEADER = 'authorization';
export const AUTHORIZATION_PREFIX = 'Bearer ';

export const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;

export const SOCIAL_LOGIN = process.env.SOCIAL_LOGIN;
export const DEVELOPMENT_MODE = process.env.DEVELOPMENT_MODE;
