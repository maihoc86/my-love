// ============================================================
// MyLoveThaiHoc - useEntries Hook
// ============================================================

import { useCallback, useEffect, useState } from 'react';

import type { Entry } from '@/types';
import {
  fetchEntries as fetchEntriesFromDB,
  addEntry as addEntryToDB,
  deleteEntry as deleteEntryFromDB,
} from '@/lib/supabase';

interface UseEntriesReturn {
  entries: Entry[];
  loading: boolean;
  error: string | null;
  addEntry: (entry: Omit<Entry, 'id' | 'created_at'>) => Promise<Entry | null>;
  deleteEntry: (id: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useEntries(): UseEntriesReturn {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEntriesFromDB();
      setEntries(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Lỗi không xác định khi tải entries';
      setError(message);
      console.error('[useEntries] refetch error:', message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addEntry = useCallback(
    async (entry: Omit<Entry, 'id' | 'created_at'>): Promise<Entry | null> => {
      // Optimistic: create a temporary entry
      const tempId = `temp-${Date.now()}`;
      const optimisticEntry: Entry = {
        ...entry,
        id: tempId,
        created_at: new Date().toISOString(),
      };

      setEntries((prev) => [optimisticEntry, ...prev]);

      try {
        const newEntry = await addEntryToDB(entry);
        // Replace temp entry with real one
        setEntries((prev) =>
          prev.map((e) => (e.id === tempId ? newEntry : e))
        );
        return newEntry;
      } catch (err) {
        // Rollback optimistic update
        setEntries((prev) => prev.filter((e) => e.id !== tempId));
        const message =
          err instanceof Error ? err.message : 'Lỗi không xác định khi thêm entry';
        setError(message);
        console.error('[useEntries] addEntry error:', message);
        return null;
      }
    },
    []
  );

  const deleteEntry = useCallback(
    async (id: string): Promise<boolean> => {
      // Optimistic: remove immediately
      const previousEntries = entries;
      setEntries((prev) => prev.filter((e) => e.id !== id));

      try {
        await deleteEntryFromDB(id);
        return true;
      } catch (err) {
        // Rollback
        setEntries(previousEntries);
        const message =
          err instanceof Error ? err.message : 'Lỗi không xác định khi xoá entry';
        setError(message);
        console.error('[useEntries] deleteEntry error:', message);
        return false;
      }
    },
    [entries]
  );

  return { entries, loading, error, addEntry, deleteEntry, refetch };
}
