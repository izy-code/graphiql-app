'use client';

import './mui-table.scss';

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
import clsx from 'clsx';
import { type ReactNode, useState } from 'react';

import { CustomInput } from '@/components/custom-input/CustomInput';
import { useScopedI18n } from '@/locales/client';
import { generateUniqueId } from '@/utils/utils';

import { CustomButton } from '../custom-button/CustomButton.tsx';
import styles from './ClientTable.module.scss';
import type { TableProps } from './types';

export function ClientTable({ title, tableInfo, onChange }: TableProps): ReactNode {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isTableVisible, setIsTableVisible] = useState(false);
  const translate = useScopedI18n('clientTable');

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

  const toggleTableVisibility = (): void => {
    setIsTableVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h4 className={styles.subtitle}>{title}:</h4>
        <CustomButton
          className={clsx(styles.hideBtn, !isTableVisible && styles.hidden)}
          onClick={toggleTableVisibility}
        >
          <span className="visually-hidden">{isTableVisible ? translate('hide') : translate('show')}</span>
        </CustomButton>
      </div>
      {isTableVisible && (
        <>
          <div className={styles.inputContainer}>
            <CustomInput
              label={translate('key')}
              variant="outlined"
              width="200px"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <CustomInput
              label={translate('value')}
              variant="outlined"
              width="200px"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button className={styles.button} variant="contained" color="primary" onClick={handleAddMode}>
              {translate('row')}
            </Button>
          </div>

          {tableInfo.length > 0 && (
            <TableContainer
              component={Paper}
              sx={{ mt: 2, borderColor: 'var(--color-text-dark)' }}
              className={styles.table}
            >
              <Table sx={{ minWidth: 550 }} aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{translate('key')}</TableCell>
                    <TableCell align="center">{translate('value')}</TableCell>
                    <TableCell align="center">{translate('delete')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableInfo.map((rowData, index) => (
                    <TableRow key={rowData.id}>
                      <TableCell component="th" scope="row">
                        <TextField
                          className={styles.input}
                          placeholder={`${title} ${translate('key')}`}
                          value={rowData.key}
                          onChange={(e) => handleChangeMode(index, 'key', e.target.value)}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          className={styles.input}
                          placeholder={`${title} ${translate('value')}`}
                          value={rowData.value}
                          onChange={(e) => handleChangeMode(index, 'value', e.target.value)}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell align="center">
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
        </>
      )}
    </div>
  );
}
