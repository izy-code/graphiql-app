'use client';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Image from 'next/image';
import type { ReactNode } from 'react';
import * as React from 'react';

import en_flag from '../../assets/images/en_flag.jpg';
import ru_flag from '../../assets/images/ru_flag.jpg';
import styles from './FlagButtons.module.scss';

export default function FlagButtons(): ReactNode {
  const [lang, setLang] = React.useState('en');

  const handleChange = (event: SelectChangeEvent): void => {
    setLang(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 0 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          onChange={handleChange}
          label="Lang"
          MenuProps={{
            sx: {
              '&& .MuiPaper-root': {
                backgroundColor: 'inherit',
              },
            },
          }}
        >
          <MenuItem className={styles.select} value="en">
            <Image className={styles.header_image} src={en_flag} alt="English flag" />
          </MenuItem>
          <MenuItem className={styles.select} value="ru">
            <Image className={styles.header_image} src={ru_flag} alt="Russian flag" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
