'use client';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Image from 'next/image';
import { type ReactNode } from 'react';

import { useChangeLocale, useCurrentLocale } from '@/locales/client';

import styles from './FlagButtons.module.scss';

export default function FlagButtons(): ReactNode {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale({ preserveSearchParams: true });

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 0 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={locale}
          label="Lang"
          onChange={() => changeLocale(locale === 'en' ? 'ru' : 'en')}
          MenuProps={{
            disableScrollLock: true,
            sx: {
              '&& .MuiPaper-root': {
                backgroundColor: 'inherit',
              },
            },
          }}
          variant="standard"
          sx={{
            '.MuiSelect-icon': {
              color: 'white',
            },
            '&:before': {
              borderBottomColor: 'white',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottomColor: 'white',
            },
            '&:after': {
              borderBottomColor: '#6554c2',
            },
          }}
        >
          <MenuItem className={styles.select} value="en">
            <Image className={styles.header_image} src="/usa.svg" alt="English flag" width={40} height={25} />
          </MenuItem>
          <MenuItem className={styles.select} value="ru">
            <Image className={styles.header_image} src="/russia.svg" alt="Russian flag" width={40} height={25} />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
