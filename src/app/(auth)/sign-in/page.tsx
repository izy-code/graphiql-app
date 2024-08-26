'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { RoutePath } from '@/common/enums';
import { loginSchema, type LoginSchemaType } from '@/common/validation-schema';
import { CustomButton } from '@/components/custom-button/CustomButton';
import { FormInputField } from '@/components/form-input-field/FormInputField';
import { signIn } from '@/firebase/firebase';

import styles from './page.module.scss';

export default function SignIn(): ReactNode {
  const router = useRouter();
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

    if (isSuccess) {
      toast.success(`Successfully signed in with ${data.email}!`);
      router.push(RoutePath.MAIN);
    } else {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h1>Signing in...</h1>;
  }

  return (
    <div className={styles.page}>
      <h1>Login page</h1>
      <form className={styles.form} name="react-hook-form" noValidate onSubmit={handleSubmit(onValid)}>
        <FormInputField
          label="E-mail"
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
