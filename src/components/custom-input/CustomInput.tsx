'use client';

import Box from '@mui/material/Box';
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

export default function CustomInput({
  label,
  variant = 'standard',
  width = '420px',
  value = '',
  onChange,
  onBlur,
}: CustomInputProps): ReactNode {
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
