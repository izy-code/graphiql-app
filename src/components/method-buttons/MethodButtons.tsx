'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import type { ReactNode } from 'react';
import * as React from 'react';

import styles from './MethodButtons.module.scss';

export default function MethodButtons(): ReactNode {
  const [method, setMethod] = React.useState('get');

  const handleChange = (event: SelectChangeEvent): void => {
    setMethod(event.target.value);
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
          <MenuItem className={styles.option} value="get">
            GET
          </MenuItem>
          <MenuItem className={styles.option} value="post">
            POST
          </MenuItem>
          <MenuItem className={styles.option} value="put">
            PUT
          </MenuItem>
          <MenuItem className={styles.option} value="patch">
            PATCH
          </MenuItem>
          <MenuItem className={styles.option} value="delete">
            DELETE
          </MenuItem>
          <MenuItem className={styles.option} value="head">
            HEAD
          </MenuItem>
          <MenuItem className={styles.option} value="option">
            OPTION
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
