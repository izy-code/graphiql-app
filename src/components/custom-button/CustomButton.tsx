import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './CustomButton.module.scss';

type Props = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'cancel';
  className?: string;
} & JSX.IntrinsicElements['button'];

export function CustomButton({ children, type = 'button', variant = 'primary', className, ...rest }: Props): ReactNode {
  const optionClass = styles[`button--${variant}`];

  return (
    <button className={clsx(styles.button, optionClass, className)} type={type} {...rest}>
      {children}
    </button>
  );
}
