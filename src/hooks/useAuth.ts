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
  needsOnboarding: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  completeOnboarding: () => Promise<void>;
}

/**
 * Placeholder auth hook - skip auth in v1, default authenticated.
 * Replace with Supabase Auth in a future version.
 */
export function useAuth(): UseAuthReturn {
  const [isAuthenticated] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [user] = useState<User | null>(null);
  const [loading] = useState(false);

  const login = useCallback(
    async (_email: string, _password: string): Promise<boolean> => {
      // TODO: Tích hợp Supabase Auth
      // TODO: Check if user has completed onboarding (partner info exists)
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
      // After register, user needs onboarding
      setNeedsOnboarding(true);
      console.log('[Auth] register - placeholder, chưa triển khai');
      return true;
    },
    []
  );

  const completeOnboarding = useCallback(async (): Promise<void> => {
    // TODO: Save onboarding data to Supabase
    setNeedsOnboarding(false);
    console.log('[Auth] onboarding completed');
  }, []);

  return { isAuthenticated, needsOnboarding, user, loading, login, logout, register, completeOnboarding };
}
