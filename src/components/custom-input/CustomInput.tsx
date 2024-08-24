'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { ReactNode } from 'react';

import styles from './CustomInput.module.scss';

interface ICustomInput {
  label: string;
}

export default function CustomInput({ label }: ICustomInput): ReactNode {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '420px' },
      }}
      noValidate
      autoComplete="off"
      className={styles.inputContainer}
    >
      <TextField id="standard-basic" label={label} variant="standard" className={styles.input} />
    </Box>
  );
}
