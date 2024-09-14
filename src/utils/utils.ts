import {
  LOWERCASE_LETTER_REGEX,
  MIN_PASSWORD_LENGTH,
  NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_LETTER_REGEX,
} from '@/common/constants';
import type { TableRow } from '@/components/client-table/types.ts';
import en from '@/locales/en';
import ru from '@/locales/ru';

const regexArray = [NUMBER_REGEX, UPPERCASE_LETTER_REGEX, LOWERCASE_LETTER_REGEX, SPECIAL_CHARACTER_REGEX];
export const MAX_STRENGTH = regexArray.length + 1;
export const getPasswordStrength = (password: string): number => {
  let strength = regexArray.reduce((result, regex) => result + Number(regex.test(password)), 0);
  strength += password.length >= MIN_PASSWORD_LENGTH ? 1 : 0;

  return strength;
};

export const translateText = (key: string): string =>
  window.location.pathname.split('/').includes('en') ? en[key as never] : ru[key as never];

export const encodeBase64 = (str: string): string => Buffer.from(str, 'utf-8').toString('base64').replace(/=+$/, '');

export const decodeBase64 = (str: string): string => {
  const pad = str.length % 4 === 0 ? '' : '===='.slice(str.length % 4);
  return Buffer.from(str + pad, 'base64').toString('utf-8');
};

export const generateUniqueId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const replaceVariables = (text: string | undefined, variables: TableRow[]): string => {
  const variableMap = Object.fromEntries(
    variables.filter(({ key, value }) => key.trim() && value.trim()).map(({ key, value }) => [key, value]),
  );

  let result = text || '';
  Object.entries(variableMap).forEach(([variableKey, variableValue]) => {
    const variablePlaceholder = `{{${variableKey}}}`;
    result = result.replace(new RegExp(variablePlaceholder, 'g'), variableValue);
  });

  return result.trim();
};

export const getEncodedHeaders = (headersParameter: TableRow[]): string => {
  if (!headersParameter || headersParameter.length === 0) {
    return '';
  }

  const encodedHeaders = headersParameter
    .filter(({ key, value }) => key.trim() && value.trim())
    .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

  return `?${encodedHeaders.join('&')}`;
};

export const updateHistory = (
  locale: string,
  method: string,
  endpoint: string,
  body: string,
  headers: TableRow[],
  variables: TableRow[],
): void => {
  const encodedEndpoint = endpoint ? encodeBase64(endpoint) : encodeBase64(' ');
  const encodedBody = encodeBase64(replaceVariables(body, variables) || ' ');
  const encodedHeaders = getEncodedHeaders(headers);

  window.history.replaceState(null, '', `/${locale}/${method}/${encodedEndpoint}/${encodedBody}${encodedHeaders}`);
};
