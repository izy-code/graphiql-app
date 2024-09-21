import clsx from 'clsx';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { useId, useState } from 'react';

import { getPasswordStrength, MAX_STRENGTH } from '@/utils/utils';

import styles from './FormPasswordField.module.scss';

type Props = {
  label: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  error?: string | undefined;
};

export function FormPasswordField({ label, inputProps, error }: Props): ReactNode {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { onChange, id, ...props } = inputProps;
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const calculatedStrength = getPasswordStrength(event.target.value);

    setPasswordStrength(calculatedStrength);

    onChange?.(event);
  };

  const getPasswordStrengthClassName = (strength: number): string => {
    const key = `passwordStrength${strength}` as keyof typeof styles;

    return key in styles ? styles[key]! : '';
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        className={clsx(styles.input, error && styles.invalid)}
        type="password"
        autoComplete="new-password"
        onChange={handleChange}
        aria-invalid={error ? 'true' : 'false'}
      />
      <div className={clsx(styles.progressBar, passwordStrength > 0 && getPasswordStrengthClassName(passwordStrength))}>
        {Array.from(Array(MAX_STRENGTH).keys()).map((key) => (
          <div key={key} className={clsx(styles.progressSegment, key < passwordStrength && styles.progressActive)} />
        ))}
      </div>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
}
