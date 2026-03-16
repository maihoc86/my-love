// ============================================================
// AI Love - useSpecialDates Hook
// ============================================================

import { useCallback, useEffect, useMemo, useState } from 'react';
import { differenceInCalendarDays, parseISO, setYear } from 'date-fns';

import type { SpecialDate } from '@/types';
import {
  fetchSpecialDates as fetchDatesFromDB,
  addSpecialDate as addDateToDB,
  deleteSpecialDate as deleteDateFromDB,
} from '@/lib/supabase';

interface UpcomingDate extends SpecialDate {
  daysLeft: number;
}

interface UseSpecialDatesReturn {
  dates: SpecialDate[];
  loading: boolean;
  error: string | null;
  addSpecialDate: (
    date: Omit<SpecialDate, 'id' | 'created_at'>
  ) => Promise<SpecialDate | null>;
  deleteSpecialDate: (id: string) => Promise<boolean>;
  getUpcomingDates: (days: number) => UpcomingDate[];
  refetch: () => Promise<void>;
}

export function useSpecialDates(): UseSpecialDatesReturn {
  const [dates, setDates] = useState<SpecialDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDatesFromDB();
      setDates(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Lỗi không xác định khi tải ngày đặc biệt';
      setError(message);
      console.error('[useSpecialDates] refetch error:', message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addSpecialDate = useCallback(
    async (
      date: Omit<SpecialDate, 'id' | 'created_at'>
    ): Promise<SpecialDate | null> => {
      const tempId = `temp-${Date.now()}`;
      const optimisticDate: SpecialDate = {
        ...date,
        id: tempId,
        created_at: new Date().toISOString(),
      };

      setDates((prev) => [...prev, optimisticDate]);

      try {
        const newDate = await addDateToDB(date);
        setDates((prev) =>
          prev.map((d) => (d.id === tempId ? newDate : d))
        );
        return newDate;
      } catch (err) {
        setDates((prev) => prev.filter((d) => d.id !== tempId));
        const message =
          err instanceof Error
            ? err.message
            : 'Lỗi không xác định khi thêm ngày đặc biệt';
        setError(message);
        console.error('[useSpecialDates] addSpecialDate error:', message);
        return null;
      }
    },
    []
  );

  const deleteSpecialDate = useCallback(
    async (id: string): Promise<boolean> => {
      const previousDates = dates;
      setDates((prev) => prev.filter((d) => d.id !== id));

      try {
        await deleteDateFromDB(id);
        return true;
      } catch (err) {
        setDates(previousDates);
        const message =
          err instanceof Error
            ? err.message
            : 'Lỗi không xác định khi xoá ngày đặc biệt';
        setError(message);
        console.error('[useSpecialDates] deleteSpecialDate error:', message);
        return false;
      }
    },
    [dates]
  );

  const getUpcomingDates = useCallback(
    (withinDays: number): UpcomingDate[] => {
      const today = new Date();
      const currentYear = today.getFullYear();

      return dates
        .map((d) => {
          const eventDate = parseISO(d.event_date);

          // For recurring dates, check this year and next year
          if (d.is_recurring) {
            let nextOccurrence = setYear(eventDate, currentYear);
            let daysLeft = differenceInCalendarDays(nextOccurrence, today);

            // If already passed this year, check next year
            if (daysLeft < 0) {
              nextOccurrence = setYear(eventDate, currentYear + 1);
              daysLeft = differenceInCalendarDays(nextOccurrence, today);
            }

            return { ...d, daysLeft };
          }

          // Non-recurring: simple diff
          const daysLeft = differenceInCalendarDays(eventDate, today);
          return { ...d, daysLeft };
        })
        .filter((d) => d.daysLeft >= 0 && d.daysLeft <= withinDays)
        .sort((a, b) => a.daysLeft - b.daysLeft);
    },
    [dates]
  );

  return {
    dates,
    loading,
    error,
    addSpecialDate,
    deleteSpecialDate,
    getUpcomingDates,
    refetch,
  };
}
