'use client';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { ReactNode } from 'react';
import * as React from 'react';

import styles from './TableHeaders.module.scss';

interface Data {
  key: string;
  value: string;
}

function createData(key: string, value: string): Data {
  return { key, value };
}

const rows = [
  createData('Cache-control', 'no-cache'),
  createData('Host', 'calculated when request is sent'),
  createData('User-Agent', 'PostmanRuntime/7.41.1'),
  createData('Accept', '*/*'),
  createData('Accept-Enconing', 'keep-alive'),
  createData('Connectuin', 'keep-alive'),
];

export default function TableHeaders(): ReactNode {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>key</TableCell>
            <TableCell align="right">value</TableCell>
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
  );
}
