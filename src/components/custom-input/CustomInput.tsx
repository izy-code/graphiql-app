'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { ReactNode } from 'react';

import styles from './CustomInput.module.scss';

interface ICustomInput {
  label: string;
  variant: 'standard' | 'filled' | 'outlined';
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({
  label,
  variant = 'standard',
  width = '420px',
  onChange,
}: ICustomInput): ReactNode {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width },
      }}
      noValidate
      autoComplete="off"
      className={styles.inputContainer}
    >
      <TextField label={label} variant={variant} className={styles.input} onChange={onChange} />
    </Box>
  );
}
