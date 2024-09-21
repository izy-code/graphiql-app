'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      textTransform: 'none',
      fontSize: 18,
    },
  },
});

export function MuiProvider({ children }: { children: ReactNode }): ReactNode {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
