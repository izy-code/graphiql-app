'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { type ReactNode, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginSchemaType } from '@/common/validation-schema';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { CustomButton } from '@/components/custom-button/CustomButton';
import { FormInputField } from '@/components/form-input-field/FormInputField';
import { Loader } from '@/components/loader/Loader';
import { signIn } from '@/firebase/firebase';
import { useScopedI18n } from '@/locales/client';

import styles from './SignIn.module.scss';

function SignIn(): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const translate = useScopedI18n('sign-in');

  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<LoginSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const onValid: SubmitHandler<LoginSchemaType> = async ({ email, password }) => {
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const isSuccess = await signIn(email, password);

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
          error={errors.email?.message}
        />
        <FormInputField
          label={translate('password')}
          inputProps={{ ...register('password'), type: 'password', autoComplete: 'current-password' }}
          error={errors.password?.message}
        />

        <CustomButton className={styles.submitButton} type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          {translate('submit')}
        </CustomButton>
      </form>
    </div>
  );
}

export default AuthRoute(SignIn, true);
