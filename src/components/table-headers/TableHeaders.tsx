'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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

interface TableHeadersProps {
  headers: Data[];
  onHeadersChange: (newHeaders: Data[]) => void;
}

export default function TableHeaders({ headers, onHeadersChange }: TableHeadersProps): ReactNode {
  const [newKey, setNewKey] = React.useState<string>('');
  const [newValue, setNewValue] = React.useState<string>('');

  const handleAddHeader = (): void => {
    if (newKey.trim() && newValue.trim()) {
      onHeadersChange([...headers, { key: newKey, value: newValue }]);
      setNewKey('');
      setNewValue('');
    }
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string): void => {
    const newHeaders = [...headers];
    if (newHeaders[index]) {
      newHeaders[index] = {
        ...newHeaders[index],
        [field]: value,
      };
      onHeadersChange(newHeaders);
    }
  };

  const handleDeleteHeader = (index: number): void => {
    const newHeaders = headers.filter((_, i) => i !== index);
    onHeadersChange(newHeaders);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h4 className={styles.subtitle}>Headers:</h4>
        <div className={styles.inputContainer}>
          <CustomInput
            label="Key"
            variant="outlined"
            width="200px"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <CustomInput
            label="Value"
            variant="outlined"
            width="200px"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
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
              <TableCell align="center">Value</TableCell>
              <TableCell align="right">Delete</TableCell>
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
                <TableCell align="right">
                  <IconButton aria-label="delete" onClick={() => handleDeleteHeader(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
