// ============================================================
// AI Love - Supabase Client & Data Helpers
// ============================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import type { Entry, SpecialDate } from '@/types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Thiếu EXPO_PUBLIC_SUPABASE_URL hoặc EXPO_PUBLIC_SUPABASE_ANON_KEY trong env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// --- Entry CRUD ---

export async function fetchEntries(): Promise<Entry[]> {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Không thể tải dữ liệu entries: ${error.message}`);
  }

  return (data as Entry[]) ?? [];
}

export async function addEntry(
  entry: Omit<Entry, 'id' | 'created_at'>
): Promise<Entry> {
  const { data, error } = await supabase
    .from('entries')
    .insert(entry)
    .select()
    .single();

  if (error) {
    throw new Error(`Không thể thêm entry: ${error.message}`);
  }

  return data as Entry;
}

export async function deleteEntry(id: string): Promise<void> {
  const { error } = await supabase.from('entries').delete().eq('id', id);

  if (error) {
    throw new Error(`Không thể xoá entry: ${error.message}`);
  }
}

// --- Special Date CRUD ---

export async function fetchSpecialDates(): Promise<SpecialDate[]> {
  const { data, error } = await supabase
    .from('special_dates')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    throw new Error(`Không thể tải ngày đặc biệt: ${error.message}`);
  }

  return (data as SpecialDate[]) ?? [];
}

export async function addSpecialDate(
  date: Omit<SpecialDate, 'id' | 'created_at'>
): Promise<SpecialDate> {
  const { data, error } = await supabase
    .from('special_dates')
    .insert(date)
    .select()
    .single();

  if (error) {
    throw new Error(`Không thể thêm ngày đặc biệt: ${error.message}`);
  }

  return data as SpecialDate;
}

export async function deleteSpecialDate(id: string): Promise<void> {
  const { error } = await supabase.from('special_dates').delete().eq('id', id);

  if (error) {
    throw new Error(`Không thể xoá ngày đặc biệt: ${error.message}`);
  }
}
