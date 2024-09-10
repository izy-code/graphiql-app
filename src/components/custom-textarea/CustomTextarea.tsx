'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FocusEvent, ReactNode } from 'react';

import styles from './CustomTextarea.module.scss';

interface CustomTextareaProps {
  label: string;
  value: string;
  width?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export default function CustomTextarea({
  label,
  value,
  width = '100%',
  onChange,
  onBlur,
}: CustomTextareaProps): ReactNode {
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
        minRows={1}
        maxRows={Infinity}
        sx={{ mt: 2 }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.input}
      />
    </Box>
  );
}
