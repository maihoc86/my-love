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

interface StreamOptions {
  temperature?: number;
  maxTokens?: number;
}

// --- Non-streaming ---

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

// --- Streaming (SSE) ---

/**
 * Core streaming function using Server-Sent Events.
 * Yields text chunks as they arrive from OpenRouter.
 */
export async function* streamChatCompletion(
  messages: OpenRouterMessage[],
  options: StreamOptions = {}
): AsyncGenerator<string> {
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
      stream: true,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 512,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter streaming lỗi (${response.status}): ${errorText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Không thể đọc stream response');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6);
        if (data === '[DONE]') return;

        try {
          const parsed = JSON.parse(data);
          const chunk = parsed.choices?.[0]?.delta?.content;
          if (chunk) yield chunk;
        } catch {
          // ignore malformed SSE chunks
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Stream a friendly AI confirmation after parsing entries.
 */
export async function* streamAIConfirmation(
  userText: string,
  parsedCount: number
): AsyncGenerator<string> {
  const userPrompt =
    parsedCount > 0
      ? `Người dùng vừa kể: "${userText}"\nAI đã trích xuất được ${parsedCount} thông tin về người yêu.\nHãy xác nhận bằng 1-2 câu ngắn, thân thiện, có emoji. Khuyến khích họ kể thêm.`
      : `Người dùng vừa nói: "${userText}"\nAI không trích xuất được thông tin cụ thể nào.\nHãy hỏi lại một cách thân thiện để hiểu hơn, 1-2 câu, có emoji.`;

  yield* streamChatCompletion(
    [
      {
        role: 'system',
        content: `Bạn là trợ lý AI thân thiện giúp ghi nhận thông tin về ${LOVER_NAME}. Trả lời ngắn gọn, bằng tiếng Việt.`,
      },
      { role: 'user', content: userPrompt },
    ],
    { temperature: 0.8, maxTokens: 150 }
  );
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
 * Get daily suggestions based on existing entries. (non-streaming)
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

/**
 * Stream daily suggestions - yields text chunks progressively.
 */
export async function* streamDailySuggestions(entries: Entry[]): AsyncGenerator<string> {
  if (entries.length === 0) {
    yield `Chưa có dữ liệu nào về ${LOVER_NAME}. Hãy bắt đầu ghi nhận những điều bạn biết về người ấy nhé! 💕`;
    return;
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
3. Gợi ý phải DỰA TRÊN dữ liệu
4. Tránh những thứ ${LOVER_NAME} không thích hoặc dị ứng
5. Kết thúc bằng 1 câu động viên ngắn`;

  yield* streamChatCompletion(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Dữ liệu về ${LOVER_NAME}:\n${entrySummary}` },
    ],
    { temperature: 0.7, maxTokens: 600 }
  );
}
