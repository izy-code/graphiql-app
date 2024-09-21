import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';

import styles from './FormInputField.module.scss';

type Props = {
  label: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  error?: string | undefined;
};

export function FormInputField({ label, inputProps, error }: Props): ReactNode {
  const generatedId = useId();
  const inputId = inputProps.id ?? generatedId;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={clsx(styles.input, error && styles.invalid)}
        autoComplete="off"
        aria-invalid={error ? 'true' : 'false'}
        {...inputProps}
      />
      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
}
