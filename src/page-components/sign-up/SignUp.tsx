'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { registrationSchema, type RegistrationSchemaType } from '@/common/validation-schema';
import { CustomButton } from '@/components/custom-button/CustomButton';
import { FormInputField } from '@/components/form-input-field/FormInputField';
import { FormPasswordField } from '@/components/form-password-field/FormPasswordField';
import { Loader } from '@/components/loader/Loader';
import { signUp } from '@/firebase/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useScopedI18n } from '@/locales/client';

import styles from './SignUp.module.scss';

export default function SignUp(): ReactNode {
  const user = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const translate = useScopedI18n('sign-up');

  const {
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
    handleSubmit,
    register,
    trigger,
    watch,
  } = useForm<RegistrationSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
  });

  const passwordWatch = watch('password');

  useEffect(() => {
    const asyncTrigger = async (): Promise<void> => {
      if (touchedFields.passwordConfirm) {
        await trigger('passwordConfirm');
      }
    };

    void asyncTrigger();
  }, [passwordWatch, trigger, touchedFields]);

  const onValid: SubmitHandler<RegistrationSchemaType> = async ({ name, email, password }) => {
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const isSuccess = await signUp(name, email, password);

    if (isSuccess) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader loaderText={translate('loader')} />;
  }

  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{translate('title')}</h1>
      <form className={styles.form} name="react-hook-form" noValidate onSubmit={handleSubmit(onValid)}>
        <FormInputField label={translate('name')} inputProps={{ ...register('name') }} error={errors.name?.message} />
        <FormInputField
          label={translate('email')}
          inputProps={{ ...register('email'), type: 'email', autoComplete: 'email' }}
          error={errors.email?.message}
        />

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{translate('password.title')}</legend>
          <FormPasswordField
            label={translate('password')}
            inputProps={{ ...register('password') }}
            error={errors.password?.message}
          />
          <FormInputField
            label={translate('password.confirm')}
            inputProps={{ ...register('passwordConfirm'), type: 'password', autoComplete: 'new-password' }}
            error={errors.passwordConfirm?.message}
          />
        </fieldset>

        <CustomButton className={styles.submitButton} type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          {translate('submit')}
        </CustomButton>
      </form>
    </div>
  );
}
