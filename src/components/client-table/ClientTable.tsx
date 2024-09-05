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

import { generateUniqueId } from '@/utils/utils.ts';

import CustomInput from '../custom-input/CustomInput.tsx';
import styles from './ClientTable.module.scss';
import type { ITableProps } from './types.ts';

export default function ClientTable({ title, tableInfo, onChange }: ITableProps): ReactNode {
  const [newKey, setNewKey] = React.useState<string>('');
  const [newValue, setNewValue] = React.useState<string>('');

  const handleAddMode = (): void => {
    if (newKey.trim() && newValue.trim()) {
      if (tableInfo.length === 1 && !tableInfo[0]?.key && !tableInfo[0]?.value) {
        onChange([{ id: generateUniqueId(), key: newKey, value: newValue }]);
      } else {
        const newEntry = { id: generateUniqueId(), key: newKey, value: newValue };
        onChange([...tableInfo, newEntry]);
      }
      setNewKey('');
      setNewValue('');
    }
  };

  const handleChangeMode = (index: number, field: 'key' | 'value', value: string): void => {
    const newData = [...tableInfo];
    if (newData[index]) {
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      onChange(newData);
    }
  };

  const handleDeleteMode = (index: number): void => {
    const newData = tableInfo.filter((_, i) => i !== index);
    onChange(newData);
  };

  return (
    <div className={styles.container}>
      <div>
        <h4 className={styles.subtitle}>{title}:</h4>
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
          <Button className={styles.button} variant="contained" color="primary" onClick={handleAddMode}>
            + row
          </Button>
        </div>
      </div>
      {tableInfo.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2 }} className={styles.table}>
          <Table sx={{ minWidth: 550 }} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell align="center">Value</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableInfo.map((rowData, index) => (
                <TableRow key={rowData.id}>
                  <TableCell component="th" scope="row">
                    <TextField
                      className={styles.input}
                      placeholder={`${title} Key`}
                      value={rowData.key}
                      onChange={(e) => handleChangeMode(index, 'key', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      className={styles.input}
                      placeholder={`${title} Value`}
                      value={rowData.value}
                      onChange={(e) => handleChangeMode(index, 'value', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete" onClick={() => handleDeleteMode(index)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
