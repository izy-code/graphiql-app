'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { registrationSchema, type RegistrationSchemaType } from '@/common/validation-schema';
import { CustomButton } from '@/components/custom-button/CustomButton';
import { FormInputField } from '@/components/form-input-field/FormInputField';
import { FormPasswordField } from '@/components/form-password-field/FormPasswordField';
import { signUp } from '@/firebase/firebase';

import styles from './SignUp.module.scss';

export default function SignUp(): ReactNode {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<RegistrationSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
  });

  const onValid: SubmitHandler<RegistrationSchemaType> = async (data) => {
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const isSuccess = await signUp(data.name, data.email, data.password);

    if (isSuccess) {
      toast.success(`Successfully signed up ${data.name}!`);
      router.push('/');
    } else {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h1>Signing up...</h1>;
  }

  return (
    <div className={styles.page}>
      <h1>Registration page</h1>
      <form className={styles.form} name="react-hook-form" noValidate onSubmit={handleSubmit(onValid)}>
        <FormInputField label="Name" inputProps={{ ...register('name') }} error={errors.name?.message} />
        <FormInputField
          label="E-mail"
          inputProps={{ ...register('email'), type: 'email', autoComplete: 'e-mail' }}
          error={errors.email?.message}
        />

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Password</legend>
          <FormPasswordField
            label="Enter password"
            inputProps={{ ...register('password') }}
            error={errors.password?.message}
          />
          <FormInputField
            label="Confirm password"
            inputProps={{ ...register('passwordConfirm'), type: 'password', autoComplete: 'new-password' }}
            error={errors.passwordConfirm?.message}
          />
        </fieldset>

        <CustomButton className={styles.submitButton} type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          Sign up
        </CustomButton>
      </form>
    </div>
  );
}
