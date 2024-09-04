'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { ReactNode } from 'react';

import styles from './CustomInput.module.scss';

interface ICustomInput {
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
}: ICustomInput): ReactNode {
  return (
    <Box
      component="form"
      sx={{
        m: 1,
        width,
      }}
      noValidate
      autoComplete="off"
      className={styles.inputContainer}
    >
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
    </Box>
  );
}
