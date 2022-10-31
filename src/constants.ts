export const IS_DEVELOPMENT = Boolean(process.env.DEVELOPMENT_MODE);

// API
export const BASE_URL = process.env.BASE_URL;
export const API_URL = process.env.API_URL;
export const LANDING_URL = process.env.LANDING_URL;
export const IMAGE_URL = API_URL + '/api/image/store/';
export const WS_URL = API_URL + '/ws/';
export const WS_ROOT_TOPIC = '/user/topic/root';

// TIMEOUTS
export const API_TIMEOUT = 60 * 1000;
export const LOADER_TIMEOUT = 500;

// AUTHORIZATION
export const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;
export const SOCIAL_LOGIN = process.env.SOCIAL_LOGIN;

export const AUTHORIZATION_HEADER = 'authorization';
export const AUTHORIZATION_PREFIX = 'Bearer ';

// IMAGES
export const FALLBACK_AVATAR = '/images/fallback.jpg';

// CALENDAR
export const CALENDAR_LOAD_INDENT = 5;

// BUILDERS
export const ID_STUB = 'ID_STUB';

// AVATARS
export const AVATARS_IN_CARD = 3;

// SIZES
export const DEFAULT_MARGIN = 8;

// HEADER
export const HEADER_HEIGHT = 60;
export const PAGE_HEADER_HEIGHT = 60;
export const PAGE_FOOTER_HEIGHT = 60;

// COMMENTS
export const ITEM_SKELETON_HEIGHT = 139;
export const GROUP_INFO_SKELETON_HEIGHT = 45;

// CHATS
export const TIMEOUT_BEFORE_MARK_AS_READ = 1000;
export const CHAT_SKELETON_HEIGHT = 67;
export const MESSAGE_SKELETON_HEIGHT = 109;

// COMMENTS
export const COMMENT_SKELETON_HEIGHT = 109;

// EVENTS
export const EVENT_SKELETON_HEIGHT = 124;

// CONTACTS
export const CONTACT_SKELETON_HEIGHT = 56;
