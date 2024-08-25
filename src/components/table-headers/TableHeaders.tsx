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
import type { ReactNode } from 'react';
import * as React from 'react';

import CustomInput from '../custom-input/CustomInput';
import styles from './TableHeaders.module.scss';

interface Data {
  key: string;
  value: string;
}

export default function TableHeaders(): ReactNode {
  const [headers, setHeaders] = React.useState<Data[]>([
    { key: 'Cache-control', value: 'no-cache' },
    { key: 'Host', value: 'calculated when request is sent' },
    { key: 'User-Agent', value: 'PostmanRuntime/7.41.1' },
    { key: 'Accept', value: '*/*' },
    { key: 'Accept-Encoding', value: 'gzip, deflate, br' },
  ]);
  const [newKey, setNewKey] = React.useState<string>('');
  const [newValue, setNewValue] = React.useState<string>('');

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
        <h4 className={styles.subtitle}>Headers:</h4>
        <div className={styles.inputContainer}>
          <CustomInput label="Key" variant="outlined" width="200px" onChange={(e) => setNewKey(e.target.value)} />
          <CustomInput label="Value" variant="outlined" width="200px" onChange={(e) => setNewValue(e.target.value)} />
          <Button className={styles.button} variant="contained" color="primary" onClick={handleAddHeader}>
            + row
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ mt: 2 }} className={styles.table}>
        <Table sx={{ minWidth: 550 }} aria-label="headers table">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {headers.map((header, index) => (
              <TableRow key={header.key}>
                <TableCell component="th" scope="row">
                  <TextField
                    className={styles.input}
                    placeholder="Header Key"
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    className={styles.input}
                    placeholder="Header Value"
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
