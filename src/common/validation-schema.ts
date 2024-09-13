import type { InferType } from 'yup';
import { object, ref, string } from 'yup';

import {
  EMAIL_REGEX,
  LOWERCASE_LETTER_REGEX,
  MIN_PASSWORD_LENGTH,
  NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_LETTER_REGEX,
} from './constants';

const emailStringSchema = string().required('email.required').matches(EMAIL_REGEX, 'email.format');
const passwordStringSchema = string()
  .required('password.required')
  .matches(NUMBER_REGEX, 'password.number')
  .matches(UPPERCASE_LETTER_REGEX, 'password.uppercase')
  .matches(LOWERCASE_LETTER_REGEX, 'password.lowercase')
  .matches(SPECIAL_CHARACTER_REGEX, 'password.special')
  .min(MIN_PASSWORD_LENGTH, 'password.min');

export const registrationSchema = object().shape({
  name: string()
    .required('name.required')
    .matches(/^\p{Lu}/u, 'name.capital'),
  email: emailStringSchema,
  password: passwordStringSchema,
  passwordConfirm: string()
    .required('confirm.required')
    .oneOf([ref('password')], 'confirm.match'),
});

export const loginSchema = object().shape({
  email: emailStringSchema,
  password: passwordStringSchema,
});

export type RegistrationSchemaType = InferType<typeof registrationSchema>;
export type LoginSchemaType = InferType<typeof loginSchema>;
