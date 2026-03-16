// ============================================================
// Lib barrel export
// Usage: import { Colors, supabase, parseUserInput } from '@/lib';
// ============================================================

export { APP_NAME, APP_VERSION, LOVER_NAME, Colors, CategoryIcons, SentimentEmojis } from './constants';
export { supabase, fetchEntries, addEntry, deleteEntry, fetchSpecialDates, addSpecialDate, deleteSpecialDate } from './supabase';
export { parseUserInput, streamAIConfirmation, streamChatCompletion, getDailySuggestions, streamDailySuggestions } from './openrouter';
export { sendMessage as sendTelegramMessage, sendReminder as sendTelegramReminder } from './telegram';
