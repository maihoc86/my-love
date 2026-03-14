// ============================================================
// MyLoveThaiHoc - useAuth Hook (Placeholder for v1)
// ============================================================

import { useCallback, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

/**
 * Placeholder auth hook - skip auth in v1, default authenticated.
 * Replace with Supabase Auth in a future version.
 */
export function useAuth(): UseAuthReturn {
  const [isAuthenticated] = useState(true);
  const [user] = useState<User | null>(null);
  const [loading] = useState(false);

  const login = useCallback(
    async (_email: string, _password: string): Promise<boolean> => {
      // TODO: Tích hợp Supabase Auth
      console.log('[Auth] login - placeholder, chưa triển khai');
      return true;
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    // TODO: Tích hợp Supabase Auth
    console.log('[Auth] logout - placeholder, chưa triển khai');
  }, []);

  const register = useCallback(
    async (
      _email: string,
      _password: string,
      _name: string
    ): Promise<boolean> => {
      // TODO: Tích hợp Supabase Auth
      console.log('[Auth] register - placeholder, chưa triển khai');
      return true;
    },
    []
  );

  return { isAuthenticated, user, loading, login, logout, register };
}
