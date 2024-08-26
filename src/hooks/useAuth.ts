import { useContext } from 'react';

import type { AuthContextType } from '@/contexts/auth-context';
import { AuthContext } from '@/contexts/auth-context';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth can only be used inside AuthProvider');
  }

  return context;
};
