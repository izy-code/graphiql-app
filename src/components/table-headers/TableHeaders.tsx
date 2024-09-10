'use client';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { type ReactNode, useState } from 'react';

import { useScopedI18n } from '@/locales/client';

import CustomInput from '../custom-input/CustomInput';
import styles from './TableHeaders.module.scss';

export default function TableHeaders(): ReactNode {
  const [headers, setHeaders] = useState([
    { key: 'Cache-control', value: 'no-cache' },
    { key: 'Host', value: 'calculated when request is sent' },
    { key: 'User-Agent', value: 'PostmanRuntime/7.41.1' },
    { key: 'Accept', value: '*/*' },
    { key: 'Accept-Encoding', value: 'gzip, deflate, br' },
  ]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const translate = useScopedI18n('headers');

  const handleAddHeader = (): void => {
    setHeaders([...headers, { key: newKey, value: newValue }]);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string): void => {
    const newHeaders = [...headers];
    if (newHeaders[index]) {
      newHeaders[index] = {
        ...newHeaders[index],
        [field]: value,
      };
      setHeaders(newHeaders);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h4 className={styles.subtitle}>{translate('subtitle')}</h4>
        <div className={styles.inputContainer}>
          <CustomInput
            label={translate('key')}
            variant="outlined"
            width="200px"
            onChange={(e) => setNewKey(e.target.value)}
          />
          <CustomInput
            label={translate('value')}
            variant="outlined"
            width="200px"
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button className={styles.button} variant="contained" color="primary" onClick={handleAddHeader}>
            {translate('row')}
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ mt: 2 }} className={styles.table}>
        <Table sx={{ minWidth: 550 }} aria-label="headers table">
          <TableHead>
            <TableRow>
              <TableCell>{translate('key')}</TableCell>
              <TableCell align="right">{translate('value')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {headers.map((header, index) => (
              <TableRow key={header.key}>
                <TableCell component="th" scope="row">
                  <TextField
                    className={styles.input}
                    placeholder={translate('key')}
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    className={styles.input}
                    placeholder={translate('value')}
                    value={header.value}
                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
