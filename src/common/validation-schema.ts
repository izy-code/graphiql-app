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

const emailStringSchema = string().required('E-mail is required').matches(EMAIL_REGEX, 'E-mail must have valid format');
const passwordStringSchema = string()
  .required('Password is required')
  .matches(NUMBER_REGEX, 'Password must contain a number')
  .matches(UPPERCASE_LETTER_REGEX, 'Password must contain an uppercase letter')
  .matches(LOWERCASE_LETTER_REGEX, 'Password must contain a lowercase letter')
  .matches(SPECIAL_CHARACTER_REGEX, 'Password must contain one of: -+/%*:#@\\$!?|^&')
  .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);

export const registrationSchema = object().shape({
  name: string()
    .required('Name is required')
    .matches(/^\p{Lu}/u, 'Name must start with a capital letter'),
  email: emailStringSchema,
  password: passwordStringSchema,
  passwordConfirm: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords do not match'),
});

export const loginSchema = object().shape({
  email: emailStringSchema,
  password: passwordStringSchema,
});

export type RegistrationSchemaType = InferType<typeof registrationSchema>;
export type LoginSchemaType = InferType<typeof loginSchema>;