'use client';

import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import clsx from 'clsx';
import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';
import graphqlPlugin from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';
import { type FocusEvent, type ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

import { Editor, type EditorMode } from '@/components/editor/Editor';

import { CustomButton } from '../custom-button/CustomButton';
import styles from './CustomTextarea.module.scss';

interface CustomTextareaProps {
  titleText: string;
  value: string;
  editorMode: EditorMode;
  onChange?: (newValue: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  hasPrettifyBtn?: boolean;
  hasHideBtn?: boolean;
}

export default function CustomTextarea({
  titleText,
  value,
  editorMode = '',
  onChange,
  hasPrettifyBtn = true,
  hasHideBtn = true,
  ...props
}: CustomTextareaProps & Omit<ReactCodeMirrorProps, 'onChange'>): ReactNode {
  const [isHidden, setIsHidden] = useState(true);

  const handlePrettify = async (): Promise<void> => {
    const isJson = editorMode === 'json' || editorMode === 'json-with-linter';

    try {
      const formattedCode = await prettier.format(value, {
        parser: isJson ? 'json' : 'graphql',
        plugins: isJson ? [babelPlugin, estreePlugin] : [graphqlPlugin],
      });

      onChange?.(formattedCode.replace(/[\r\n]+$/, ''));
    } catch {
      toast.info(`Failed to prettify code. Check ${isJson ? 'JSON' : 'GraphQL'} syntax`);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{titleText}</h4>
        <div className={styles.buttons}>
          {hasPrettifyBtn && editorMode && (
            <CustomButton variant="tertiary" className={styles.prettifyBtn} onClick={handlePrettify}>
              <span className="visually-hidden">Prettify</span>
            </CustomButton>
          )}
          {hasHideBtn && (
            <CustomButton
              className={clsx(styles.hideBtn, isHidden && styles.hidden)}
              onClick={() => setIsHidden(!isHidden)}
            >
              <span className="visually-hidden">{isHidden ? 'Show' : 'Hide'}</span>
            </CustomButton>
          )}
        </div>
      </div>

      {(!isHidden || !hasHideBtn) && (
        <Editor value={value} mode={editorMode} onChange={(newValue) => onChange?.(newValue)} {...props} />
      )}
    </>
  );
}
