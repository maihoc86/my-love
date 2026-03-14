// ============================================================
// MyLoveThaiHoc - OpenRouter AI Client
// ============================================================

import type { Entry, ParsedEntry } from '@/types';
import { LOVER_NAME } from '@/lib/constants';

const OPENROUTER_API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY ?? '';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'anthropic/claude-sonnet-4';

if (!OPENROUTER_API_KEY) {
  console.warn('[OpenRouter] Thiếu EXPO_PUBLIC_OPENROUTER_API_KEY trong env');
}

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

async function callOpenRouter(messages: OpenRouterMessage[]): Promise<string> {
  const response = await fetch(OPENROUTER_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://mylovethaihoc.app',
      'X-Title': 'MyLoveThaiHoc',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.3,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API lỗi (${response.status}): ${errorText}`);
  }

  const data: OpenRouterResponse = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('OpenRouter không trả về nội dung');
  }

  return content;
}

/**
 * Parse user input text (Vietnamese) into structured entries using AI.
 */
export async function parseUserInput(
  text: string,
  existingEntries?: Entry[]
): Promise<ParsedEntry[]> {
  const existingContext = existingEntries?.length
    ? `\n\nDữ liệu đã có:\n${existingEntries
        .slice(0, 20)
        .map((e) => `- [${e.category}] ${e.title} (${e.sentiment})`)
        .join('\n')}`
    : '';

  const systemPrompt = `Bạn là trợ lý AI giúp ghi nhận thông tin về ${LOVER_NAME}.
Nhiệm vụ: Phân tích câu nói của người dùng và trích xuất thông tin thành các entry có cấu trúc.

Mỗi entry gồm:
- category: food | place | hobby | date | gift | trait | allergy | style | music | movie | other
- title: tên ngắn gọn (VD: "Phở bò", "Đà Lạt", "Dị ứng tôm")
- detail: chi tiết bổ sung (optional)
- sentiment: love | like | neutral | dislike | hate

Quy tắc:
1. Trích xuất TẤT CẢ thông tin có thể từ câu nói
2. Nếu không rõ sentiment, mặc định là "like"
3. Nếu đề cập dị ứng, category = "allergy" và sentiment = "hate"
4. Trả về JSON array, KHÔNG có text thêm
5. Nếu không trích xuất được gì, trả về []
${existingContext}`;

  const content = await callOpenRouter([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: text },
  ]);

  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }
    const parsed: ParsedEntry[] = JSON.parse(jsonMatch[0]);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.warn('[OpenRouter] Không parse được response:', content);
    return [];
  }
}

/**
 * Get daily suggestions based on existing entries.
 */
export async function getDailySuggestions(entries: Entry[]): Promise<string> {
  if (entries.length === 0) {
    return `Chưa có dữ liệu nào về ${LOVER_NAME}. Hãy bắt đầu ghi nhận những điều bạn biết về người ấy nhé! 💕`;
  }

  const entrySummary = entries
    .slice(0, 30)
    .map((e) => `- [${e.category}] ${e.title}: ${e.sentiment}${e.detail ? ` (${e.detail})` : ''}`)
    .join('\n');

  const systemPrompt = `Bạn là trợ lý tình yêu, giúp người dùng chăm sóc ${LOVER_NAME} tốt hơn.
Dựa trên dữ liệu đã ghi nhận, hãy đưa ra 3-5 gợi ý cụ thể, thực tế cho hôm nay.

Quy tắc:
1. Viết bằng tiếng Việt, thân thiện, có emoji
2. Mỗi gợi ý trên 1 dòng, bắt đầu bằng emoji
3. Gợi ý phải DỰA TRÊN dữ liệu (VD: nếu thích phở -> gợi ý đi ăn phở)
4. Tránh những thứ ${LOVER_NAME} không thích hoặc dị ứng
5. Kết thúc bằng 1 câu động viên ngắn`;

  return callOpenRouter([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Dữ liệu về ${LOVER_NAME}:\n${entrySummary}` },
  ]);
}
