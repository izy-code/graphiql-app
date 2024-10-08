'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { type ReactNode, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { registrationSchema, type RegistrationSchemaType } from '@/common/validation-schema';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { CustomButton } from '@/components/custom-button/CustomButton';
import { FormInputField } from '@/components/form-input-field/FormInputField';
import { FormPasswordField } from '@/components/form-password-field/FormPasswordField';
import { Loader } from '@/components/loader/Loader';
import { signUp } from '@/firebase/firebase';
import { useScopedI18n } from '@/locales/client';

import styles from './SignUp.module.scss';

function SignUp(): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const translate = useScopedI18n('sign-up');
  const translateValidation = useScopedI18n('validation');

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
          label={translate('name')}
          inputProps={{ ...register('name') }}
          error={errors.name?.message && translateValidation(errors.name?.message as never)}
        />
        <FormInputField
          label={translate('email')}
          inputProps={{ ...register('email'), type: 'text', autoComplete: 'email' }}
          error={errors.email?.message && translateValidation(errors.email?.message as never)}
        />

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{translate('password.title')}</legend>
          <FormPasswordField
            label={translate('password')}
            inputProps={{ ...register('password') }}
            error={errors.password?.message && translateValidation(errors.password?.message as never)}
          />
          <FormInputField
            label={translate('password.confirm')}
            inputProps={{ ...register('passwordConfirm'), type: 'password', autoComplete: 'new-password' }}
            error={errors.passwordConfirm?.message && translateValidation(errors.passwordConfirm?.message as never)}
          />
        </fieldset>

        <CustomButton className={styles.submitButton} type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          {translate('submit')}
        </CustomButton>
      </form>
    </div>
  );
}

export default AuthRoute(SignUp, true);
