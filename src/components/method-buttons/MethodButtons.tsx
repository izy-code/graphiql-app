'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import type { ReactNode } from 'react';
import type * as React from 'react';

import styles from './MethodButtons.module.scss';

interface MethodButtonsProps {
  method: string;
  onMethodChange: (newMethod: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function MethodButtons({ method, onMethodChange, onBlur }: MethodButtonsProps): ReactNode {
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
          onBlur={onBlur}
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
          <MenuItem className={styles.option} value="GET">
            GET
          </MenuItem>
          <MenuItem className={styles.option} value="POST">
            POST
          </MenuItem>
          <MenuItem className={styles.option} value="PUT">
            PUT
          </MenuItem>
          <MenuItem className={styles.option} value="PATCH">
            PATCH
          </MenuItem>
          <MenuItem className={styles.option} value="DELETE">
            DELETE
          </MenuItem>
          <MenuItem className={styles.option} value="HEAD">
            HEAD
          </MenuItem>
          <MenuItem className={styles.option} value="OPTIONS">
            OPTIONS
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
