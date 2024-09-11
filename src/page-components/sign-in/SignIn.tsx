'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { type ReactNode, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginSchemaType } from '@/common/validation-schema';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { CustomButton } from '@/components/custom-button/CustomButton';
import { FormInputField } from '@/components/form-input-field/FormInputField';
import { Loader } from '@/components/loader/Loader';
import { type ErrorsFirebase } from '@/contexts/auth-context';
import { signIn } from '@/firebase/firebase';
import { useScopedI18n } from '@/locales/client';

import styles from './SignIn.module.scss';

function SignIn(): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const translate = useScopedI18n('sign-in');
  const translateFirebase = useScopedI18n('firebase');
  const translateValidation = useScopedI18n('validation');

  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<LoginSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const errorsFirebase: ErrorsFirebase = useMemo(
    () => ({
      USER_DISABLED: translateFirebase('errors.USER_DISABLED'),
      INVALID_LOGIN_CREDENTIALS: translateFirebase('errors.INVALID_LOGIN_CREDENTIALS'),
      EMAIL_EXISTS: translateFirebase('errors.EMAIL_EXISTS'),
      TOO_MANY_ATTEMPTS_TRY_LATER: translateFirebase('errors.TOO_MANY_ATTEMPTS_TRY_LATER'),
    }),
    [translateFirebase],
  );

  const onValid: SubmitHandler<LoginSchemaType> = async ({ email, password }) => {
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const isSuccess = await signIn(email, password, translateFirebase('sign-in.success', { email }), errorsFirebase);

    if (!isSuccess) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader loaderText={translate('loader')} />;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{translate('title')}</h1>
      <form className={styles.form} name="react-hook-form" noValidate onSubmit={handleSubmit(onValid)}>
        <FormInputField
          label={translate('email')}
          inputProps={{ ...register('email'), type: 'email', autoComplete: 'email' }}
          error={errors.email?.message && translateValidation(errors.email?.message as never)}
        />
        <FormInputField
          label={translate('password')}
          inputProps={{ ...register('password'), type: 'password', autoComplete: 'current-password' }}
          error={errors.password?.message && translateValidation(errors.password?.message as never)}
        />

        <CustomButton className={styles.submitButton} type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          {translate('submit')}
        </CustomButton>
      </form>
    </div>
  );
}

export default AuthRoute(SignIn, true);
