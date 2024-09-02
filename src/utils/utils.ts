import {
  LOWERCASE_LETTER_REGEX,
  MIN_PASSWORD_LENGTH,
  NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_LETTER_REGEX,
} from '@/common/constants';

const regexArray = [NUMBER_REGEX, UPPERCASE_LETTER_REGEX, LOWERCASE_LETTER_REGEX, SPECIAL_CHARACTER_REGEX];
export const MAX_STRENGTH = regexArray.length + 1;
export const getPasswordStrength = (password: string): number => {
  let strength = regexArray.reduce((result, regex) => result + Number(regex.test(password)), 0);
  strength += password.length >= MIN_PASSWORD_LENGTH ? 1 : 0;

  return strength;
};

export const encodeBase64 = (str: string): string => Buffer.from(str, 'utf-8').toString('base64');
export const decodeBase64 = (str: string): string => Buffer.from(str, 'base64').toString('utf-8');
