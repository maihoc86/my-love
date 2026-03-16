// ============================================================
// AI Love - Dev Logger
// In-memory audit log for debugging in development.
// Usage: import { logger } from '@/lib/logger';
//        logger.info('STT', 'Sending audio', { length: 1234 });
// ============================================================

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: unknown;
}

type LogListener = (entry: LogEntry) => void;

const MAX_ENTRIES = 200;

let _entries: LogEntry[] = [];
let _idCounter = 0;
const _listeners = new Set<LogListener>();

function createEntry(
  level: LogLevel,
  category: string,
  message: string,
  data?: unknown
): LogEntry {
  _idCounter += 1;
  const entry: LogEntry = {
    id: String(_idCounter),
    timestamp: new Date().toISOString(),
    level,
    category,
    message,
    data,
  };

  _entries.push(entry);
  if (_entries.length > MAX_ENTRIES) {
    _entries = _entries.slice(-MAX_ENTRIES);
  }

  // Also log to console in dev
  if (__DEV__) {
    const prefix = `[${category}]`;
    const consoleFn =
      level === 'error'
        ? console.error
        : level === 'warn'
          ? console.warn
          : console.log;
    consoleFn(prefix, message, data !== undefined ? data : '');
  }

  // Notify listeners
  _listeners.forEach((fn) => fn(entry));

  return entry;
}

export const logger = {
  debug: (category: string, message: string, data?: unknown) =>
    createEntry('debug', category, message, data),

  info: (category: string, message: string, data?: unknown) =>
    createEntry('info', category, message, data),

  warn: (category: string, message: string, data?: unknown) =>
    createEntry('warn', category, message, data),

  error: (category: string, message: string, data?: unknown) =>
    createEntry('error', category, message, data),

  /** Get all log entries (newest last) */
  getEntries: (): readonly LogEntry[] => _entries,

  /** Get entries filtered by category */
  getByCategory: (category: string): LogEntry[] =>
    _entries.filter((e) => e.category === category),

  /** Clear all entries */
  clear: () => {
    _entries = [];
  },

  /** Subscribe to new log entries */
  subscribe: (fn: LogListener): (() => void) => {
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  },
};
