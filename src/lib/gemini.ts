// ============================================================
// Gemini API — Speech-to-Text
// Dùng Gemini Flash cho STT vì hỗ trợ M4A/AAC natively,
// transcribe tiếng Việt tốt, không cần convert audio format.
// ============================================================

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

if (!GEMINI_API_KEY) {
  console.warn('[Gemini] Thiếu EXPO_PUBLIC_GEMINI_API_KEY trong env');
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

/**
 * Transcribe audio to Vietnamese text using Gemini.
 * Supports M4A, MP3, WAV, OGG, FLAC, AAC natively.
 *
 * @param audioBase64 - Base64-encoded audio data
 * @param mimeType - MIME type of the audio (default: audio/mp4 for M4A)
 * @returns Transcribed Vietnamese text
 */
export async function transcribeAudio(
  audioBase64: string,
  mimeType: string = 'audio/mp4'
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Thiếu GEMINI_API_KEY. Vui lòng thêm EXPO_PUBLIC_GEMINI_API_KEY vào file .env');
  }

  const response = await fetch(`${GEMINI_BASE_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: mimeType,
                data: audioBase64,
              },
            },
            {
              text: 'Hãy chuyển đoạn ghi âm này thành văn bản tiếng Việt chính xác. Chỉ trả về nội dung văn bản đã chuyển đổi, không thêm giải thích hay định dạng gì khác.',
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini STT lỗi (${response.status}): ${errorText}`);
  }

  const data: GeminiResponse = await response.json();

  if (data.error) {
    throw new Error(`Gemini lỗi: ${data.error.message}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Không nhận được kết quả chuyển giọng nói từ Gemini');
  }

  return text.trim();
}
