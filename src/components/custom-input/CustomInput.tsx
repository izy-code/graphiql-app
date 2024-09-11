'use client';

import TextField from '@mui/material/TextField';
import type { ReactNode } from 'react';

import styles from './CustomInput.module.scss';

interface CustomInputProps {
  label: string;
  variant: 'standard' | 'filled' | 'outlined';
  width?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function CustomInput({
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
