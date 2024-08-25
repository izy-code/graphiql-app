'use client';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { ReactNode } from 'react';
import * as React from 'react';

import CustomInput from '../custom-input/CustomInput';
import styles from './TableHeaders.module.scss';

interface Data {
  key: string;
  value: string;
}

function createData(key: string, value: string): Data {
  return { key, value };
}

const initialRows = [
  createData('Cache-control', 'no-cache'),
  createData('Host', 'calculated when request is sent'),
  createData('User-Agent', 'PostmanRuntime/7.41.1'),
  createData('Accept', '*/*'),
  createData('Accept-Encoding', 'gzip, deflate, br'),
];

export default function TableHeaders(): ReactNode {
  const [rows, setRows] = React.useState<Data[]>(initialRows);
  const [newKey, setNewKey] = React.useState<string>('');
  const [newValue, setNewValue] = React.useState<string>('');

  const handleAddRow = (): void => {
    if (newKey.trim() && newValue.trim()) {
      const newRow = createData(newKey, newValue);
      setRows([...rows, newRow]);
      setNewKey('');
      setNewValue('');
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h4 className={styles.subtitle}>Headers:</h4>
        <div className={styles.inputContainer}>
          <CustomInput label="Key" variant="outlined" width="200px" onChange={(e) => setNewKey(e.target.value)} />
          <CustomInput label="Value" variant="outlined" width="200px" onChange={(e) => setNewValue(e.target.value)} />
          <Button className={styles.inputContainer} variant="contained" color="primary" onClick={handleAddRow}>
            + row
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table" className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.key}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
