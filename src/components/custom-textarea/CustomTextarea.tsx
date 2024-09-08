'use client';

import TextField from '@mui/material/TextField';
import type { ReactNode } from 'react';

import styles from './CustomTextarea.module.scss';

interface ICustomInput {
  label: string;
  value: string;
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function CustomTextarea({ label, value, width = '100%', onChange, onBlur }: ICustomInput): ReactNode {
  return (
    <TextField
      label={label}
      fullWidth
      multiline
      minRows={1}
      maxRows={Infinity}
      sx={{ mt: 2, width }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={styles.input}
    />
  );
}
