import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';

import styles from './FormInputField.module.scss';

type Props = {
  label: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  error?: string | undefined;
  hasFieldWrapper?: boolean;
  isErrorShown?: boolean;
  isRowLayout?: boolean;
};

export function FormInputField({
  label,
  inputProps,
  error,
  hasFieldWrapper = true,
  isErrorShown = true,
  isRowLayout = false,
}: Props): ReactNode {
  const generatedId = useId();
  const inputId = inputProps.id ?? generatedId;

  const wrappedContent = (
    <>
      {isRowLayout ? (
        <div className={styles.row}>
          <input
            id={inputId}
            className={clsx(styles.input, error && styles.invalid)}
            autoComplete="off"
            aria-invalid={error ? 'true' : 'false'}
            {...inputProps}
          />
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        </div>
      ) : (
        <>
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
        </>
      )}
      {isErrorShown && <p className={styles.errorMessage}>{error}</p>}
    </>
  );

  return hasFieldWrapper ? <div className={styles.field}>{wrappedContent}</div> : wrappedContent;
}
