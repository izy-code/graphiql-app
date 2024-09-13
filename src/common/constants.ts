export const MIN_PASSWORD_LENGTH = 8;
export const EMAIL_REGEX = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
export const LOWERCASE_LETTER_REGEX = /\p{Ll}/u;
export const UPPERCASE_LETTER_REGEX = /\p{Lu}/u;
export const SPECIAL_CHARACTER_REGEX = /[-+:|/\\%*#@$!?^&]/;
export const NUMBER_REGEX = /\d/;

export const NO_ENDPOINT = 'no-endpoint-provided';
export const USER_LOGOUT = 'user-logout-action';
export const VALID_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
