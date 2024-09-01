'use client';

import Box from '@mui/material/Box';
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

export default function CustomTextarea({ label, value, width = '420px', onChange, onBlur }: ICustomInput): ReactNode {
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
      <TextField
        label={label}
        fullWidth
        multiline
        rows={4}
        sx={{ mt: 2 }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.input}
      />
    </Box>
  );
}
