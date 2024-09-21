'use client';

import TextField from '@mui/material/TextField';
import type { ChangeEvent, FocusEvent, ReactNode } from 'react';

import styles from './CustomInput.module.scss';

interface CustomInputProps {
  label: string;
  variant: 'standard' | 'filled' | 'outlined';
  width?: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export function CustomInput({
  label,
  variant = 'standard',
  width = '420px',
  value = '',
  onChange,
  onBlur,
}: CustomInputProps): ReactNode {
  return (
    <TextField
      label={label}
      variant={variant}
      className={styles.input}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      sx={{
        width,
      }}
    />
  );
}
