'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { type ReactNode, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginSchemaType } from '@/common/validation-schema';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { CustomButton } from '@/components/custom-button/CustomButton';
import { FormInputField } from '@/components/form-input-field/FormInputField';
import { signIn } from '@/firebase/firebase';

import styles from './SignIn.module.scss';

function SignIn(): ReactNode {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<LoginSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const onValid: SubmitHandler<LoginSchemaType> = async (data) => {
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const isSuccess = await signIn(data.email, data.password);

    if (!isSuccess) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={clsx(styles.page, styles.loader)}>
        <h1>Signing in...</h1>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} name="react-hook-form" noValidate onSubmit={handleSubmit(onValid)}>
        <FormInputField
          label="Email"
          inputProps={{ ...register('email'), type: 'email', autoComplete: 'email' }}
          error={errors.email?.message}
        />
        <FormInputField
          label="Password"
          inputProps={{ ...register('password'), type: 'password', autoComplete: 'current-password' }}
          error={errors.password?.message}
        />

        <CustomButton className={styles.submitButton} type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          Sign in
        </CustomButton>
      </form>
    </div>
  );
}

export default AuthRoute(SignIn, true);
