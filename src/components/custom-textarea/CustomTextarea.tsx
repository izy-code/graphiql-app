'use client';

import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import clsx from 'clsx';
import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';
import graphqlPlugin from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';
import { type FocusEvent, type ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Editor, type EditorMode } from '@/components/editor/Editor';
import { useScopedI18n } from '@/locales/client';

import { CustomButton } from '../custom-button/CustomButton';
import { Switcher } from '../switcher/Switcher';
import styles from './CustomTextarea.module.scss';

interface CustomTextareaProps {
  titleText: string;
  value: string;
  editorMode: EditorMode;
  onChange?: (newValue: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  hasPrettifyBtn?: boolean;
  hasHideBtn?: boolean;
  hasSwitcher?: boolean;
  onSwitchChange?: () => void;
  isPlainText?: boolean;
}

export function CustomTextarea({
  titleText,
  value,
  editorMode = 'json',
  onChange,
  hasPrettifyBtn = true,
  hasHideBtn = true,
  hasSwitcher = false,
  onSwitchChange,
  isPlainText = false,
  ...props
}: CustomTextareaProps & Omit<ReactCodeMirrorProps, 'onChange'>): ReactNode {
  const [isHidden, setIsHidden] = useState(true);
  const translate = useScopedI18n('customTextarea');

  const modeWithSwitcher = useMemo(() => {
    if (hasSwitcher) {
      return isPlainText ? 'plain-text' : 'json-with-linter';
    }
    return editorMode;
  }, [editorMode, hasSwitcher, isPlainText]);
  const isJson = useMemo(
    () => modeWithSwitcher === 'json' || modeWithSwitcher === 'json-with-linter',
    [modeWithSwitcher],
  );

  const handlePrettify = async (): Promise<void> => {
    try {
      const formattedCode = await prettier.format(value, {
        parser: isJson ? 'json' : 'graphql',
        plugins: isJson ? [babelPlugin, estreePlugin] : [graphqlPlugin],
      });

      onChange?.(formattedCode.replace(/[\r\n]+$/, ''));
    } catch {
      toast.info(translate('prettifyError', { language: isJson ? 'JSON' : 'GraphQL' }));
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{titleText}</h4>
        <div className={styles.controls}>
          {hasPrettifyBtn && modeWithSwitcher !== 'plain-text' && (
            <CustomButton
              variant="tertiary"
              className={styles.prettifyBtn}
              onClick={handlePrettify}
              title={translate('format')}
            >
              <span className="visually-hidden">Prettify</span>
            </CustomButton>
          )}
          {hasSwitcher && (
            <Switcher
              leftText="JSON"
              rightText={translate('plainText')}
              checked={isPlainText}
              onChange={() => onSwitchChange?.()}
            />
          )}
          {hasHideBtn && (
            <CustomButton
              className={clsx(styles.hideBtn, isHidden && styles.hidden)}
              onClick={() => setIsHidden(!isHidden)}
            >
              <span className="visually-hidden">{isHidden ? translate('show') : translate('hide')}</span>
            </CustomButton>
          )}
        </div>
      </div>

      {(!isHidden || !hasHideBtn) && (
        <Editor value={value} mode={modeWithSwitcher} onChange={(newValue) => onChange?.(newValue)} {...props} />
      )}
    </>
  );
}
