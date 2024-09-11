'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import React, { type ReactNode } from 'react';

import { VALID_METHODS } from '@/common/constants';

import styles from './MethodButtons.module.scss';

interface MethodButtonsProps {
  method: string;
  onMethodChange: (newMethod: string) => void;
}

export default function MethodButtons({ method, onMethodChange }: MethodButtonsProps): ReactNode {
  const handleChange = (event: SelectChangeEvent): void => {
    onMethodChange(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 0 }} className={styles.selectContainer}>
        <InputLabel id="demo-simple-select-label" className={styles.selectLabel}>
          Method
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={method}
          onChange={handleChange}
          label="Method"
          className={styles.select}
          MenuProps={{
            sx: {
              '&& .MuiPaper-root': {
                backgroundColor: '#1d2225',
              },
            },
          }}
        >
          {VALID_METHODS.map((methodName) => (
            <MenuItem key={methodName} className={styles.option} value={methodName}>
              {methodName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
