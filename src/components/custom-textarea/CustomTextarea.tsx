'use client';

import TextField from '@mui/material/TextField';
import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';
import graphqlPlugin from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';
import { type ChangeEvent, type FocusEvent, type ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

import { CustomButton } from '../custom-button/CustomButton';
import styles from './CustomTextarea.module.scss';

interface CustomTextareaProps {
  label: string;
  value: string;
  width?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  isJson?: boolean;
}

export default function CustomTextarea({
  label,
  value,
  width = '100%',
  onChange,
  onBlur,
  isJson = true,
}: CustomTextareaProps): ReactNode {
  const [text, setText] = useState(value);

  const handlePrettify = async (): Promise<void> => {
    try {
      const formattedCode = await prettier.format(text, {
        parser: isJson ? 'json' : 'graphql',
        plugins: isJson ? [babelPlugin, estreePlugin] : [graphqlPlugin],
      });

      setText(formattedCode.replace(/[\r\n]+$/, ''));
    } catch {
      toast.info(`Failed to prettify code. Check ${isJson ? 'JSON' : 'GraphQL'} syntax`);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
    onChange?.(event);
  };

  return (
    <>
      <CustomButton onClick={handlePrettify}>Prettify</CustomButton>

      <TextField
        label={label}
        fullWidth
        multiline
        minRows={1}
        maxRows={Infinity}
        sx={{ mt: 2, width }}
        value={text}
        onChange={handleChange}
        onBlur={onBlur}
        className={styles.input}
      />
    </>
  );
}
