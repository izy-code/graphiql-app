import Button from '@mui/material/Button';
import type { ReactNode } from 'react';

import styles from './CustomMuiButton.module.scss';

type Props = {
  children: string;
  // variant?: 'text' | 'contained' | 'cancel';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & JSX.IntrinsicElements['button'];

export function CustomMuiButton({ children, onChange }: Props): ReactNode {
  return (
    <Button className={styles.button} onClick={onChange}>
      {children}
    </Button>
  );
}
