import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter, lintGutter } from '@codemirror/lint';
import { materialInit } from '@uiw/codemirror-theme-material';
import CodeMirror, { EditorView, type Extension, type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { buildClientSchema, type GraphQLSchema } from 'graphql';
import { type ReactNode, useMemo } from 'react';

import { useAppSelector } from '@/hooks/store-hooks';
import type { RootState } from '@/store/store';

export type EditorMode = 'json' | 'json-with-linter' | 'graphql' | '';

const getCodeMirrorExtension = (mode: EditorMode, schema?: GraphQLSchema): Extension[] => {
  switch (mode) {
    case 'json':
      return [json()];
    case 'json-with-linter':
      return [json(), linter(jsonParseLinter()), lintGutter()];
    case 'graphql':
      return schema ? [graphql(schema)] : [graphql()];
    default:
      return [];
  }
};

export const themeSettings = EditorView.theme({
  '&': {
    borderRadius: '10px',
    fontFamily: `"Inter", system-ui, "Avenir", "Helvetica", "Arial", sans-serif`,
    fontSize: '18px',
  },
  '&.cm-editor': {
    border: '1px solid #454849',
    padding: ' 0 5px',
  },
  '&.cm-editor .cm-gutters, &.cm-editor .cm-content': {
    marginBlock: '5px',
    borderRadius: '5px',
  },
  '&.cm-editor .cm-line': {
    borderRadius: '5px',
  },
  '&.cm-editor .cm-activeLineGutter': {
    color: '#facf4e',
  },
});

export const theme = materialInit({
  settings: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    background: '#1d2225',
    foreground: '#e0e0e0',
    lineHighlight: '#e1d4c91a',
  },
});

export function Editor({
  mode = '',
  schema,
  extensions = [],
  style,
  ...props
}: { mode: EditorMode; schema?: GraphQLSchema } & ReactCodeMirrorProps): ReactNode {
  const { currentSchema } = useAppSelector((state: RootState) => state.graphql);

  const graphQlDocsSchema = useMemo(
    () => (currentSchema ? buildClientSchema(currentSchema) : undefined),
    [currentSchema],
  );

  const editorKey = useMemo(
    () => (mode === 'graphql' ? JSON.stringify(currentSchema) : undefined),
    [currentSchema, mode],
  );

  return (
    <CodeMirror
      key={editorKey}
      extensions={[themeSettings, getCodeMirrorExtension(mode, graphQlDocsSchema), ...extensions]}
      theme={theme}
      {...props}
    />
  );
}
