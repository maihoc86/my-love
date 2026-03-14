// ============================================================
// MyLoveThaiHoc - Telegram Bot API Client
// ============================================================

const TELEGRAM_BOT_TOKEN = process.env.EXPO_PUBLIC_TELEGRAM_BOT_TOKEN ?? '';
const TELEGRAM_CHAT_ID = process.env.EXPO_PUBLIC_TELEGRAM_CHAT_ID ?? '';
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn(
    '[Telegram] Thiếu EXPO_PUBLIC_TELEGRAM_BOT_TOKEN hoặc EXPO_PUBLIC_TELEGRAM_CHAT_ID trong env'
  );
}

/**
 * Send a plain text message to the configured Telegram chat.
 */
export async function sendMessage(text: string): Promise<boolean> {
  try {
    const response = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[Telegram] Gửi tin nhắn thất bại:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Telegram] Lỗi kết nối:', error);
    return false;
  }
}

/**
 * Send a formatted reminder message for a special date.
 */
export async function sendReminder(
  title: string,
  date: string
): Promise<boolean> {
  const message = [
    '💝 <b>Nhắc nhở ngày đặc biệt</b>',
    '',
    `📅 <b>${title}</b>`,
    `🗓 Ngày: ${date}`,
    '',
    'Đừng quên nhé! 🥰',
  ].join('\n');

  return sendMessage(message);
}

/**
 * Test the Telegram bot connection.
 */
export async function testConnection(): Promise<boolean> {
  try {
    if (!TELEGRAM_BOT_TOKEN) {
      return false;
    }

    const response = await fetch(`${TELEGRAM_API_BASE}/getMe`, {
      method: 'GET',
    });

    return response.ok;
  } catch {
    return false;
  }
}
