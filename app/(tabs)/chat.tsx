import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Send,
  Mic,
  Clock,
  CheckCircle,
  Save,
} from 'lucide-react-native';
import ChatBubble from '../../src/components/ChatBubble';
import { ChatMessage, ParsedEntry } from '../../src/types';
import {
  parseUserInput,
  streamAIConfirmation,
} from '../../src/lib/openrouter';
import { addEntry } from '../../src/lib/supabase';

// ─── Constants ─────────────────────────────────────────────────────────────────

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Xin chào! Hôm nay bạn muốn kể gì về Thái Hoc? 💕\n\nHãy chia sẻ bất kì điều gì bằng tiếng Việt tự nhiên, mình sẽ phân tích và ghi nhận nhé!',
  timestamp: new Date().toISOString(),
};

const QUICK_PROMPTS = [
  { label: '🍜 Đồ ăn', text: 'Thái Hoc thích ăn phở bò, dị ứng tôm' },
  { label: '🎁 Quà tặng', text: 'Thái Hoc thích hoa hồng và nước hoa ngọt' },
  { label: '🎯 Sở thích', text: 'Thái Hoc hay đọc sách trước khi ngủ' },
  { label: '📅 Ngày đặc biệt', text: 'Sinh nhật Thái Hoc là ngày 15/8' },
];

// ─── Color tokens ──────────────────────────────────────────────────────────────

const C = {
  primary: '#f43f5e',
  primaryLight: '#fce7f3',
  aiPurple: '#8b5cf6',
  aiPurpleLight: '#f3e8ff',
  bg: '#fdf2f8',
  surface: '#ffffff',
  border: '#f3f4f6',
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textTertiary: '#9ca3af',
  success: '#10b981',
  successLight: '#ecfdf5',
} as const;

// ─── Chat Screen ────────────────────────────────────────────────────────────────

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(
    new Set()
  );
  const [savingMessageIds, setSavingMessageIds] = useState<Set<string>>(new Set());
  const flatListRef = useRef<FlatList>(null);
  const abortRef = useRef(false);

  // ── Scroll ──────────────────────────────────────────────────────────────────

  const scrollToEnd = useCallback(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 80);
  }, []);

  // ── Message helpers ──────────────────────────────────────────────────────────

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const updateContent = useCallback((id: string, content: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content } : m))
    );
  }, []);

  // ── Send ─────────────────────────────────────────────────────────────────────

  const handleSend = useCallback(
    async (text?: string) => {
      const msg = (text ?? inputText).trim();
      if (!msg || isTyping) return;

      addMessage({
        id: `user-${Date.now()}`,
        role: 'user',
        content: msg,
        timestamp: new Date().toISOString(),
      });
      setInputText('');
      setIsTyping(true);
      scrollToEnd();

      try {
        abortRef.current = false;
        const entries = await parseUserInput(msg);
        if (abortRef.current) return;

        const aiId = `ai-${Date.now()}`;
        addMessage({
          id: aiId,
          role: 'assistant',
          content: '',
          parsed_entries: entries,
          timestamp: new Date().toISOString(),
        });
        setIsTyping(false);
        scrollToEnd();

        let streamed = '';
        for await (const chunk of streamAIConfirmation(msg, entries.length)) {
          if (abortRef.current) break;
          streamed += chunk;
          updateContent(aiId, streamed);
          scrollToEnd();
        }
      } catch (err) {
        setIsTyping(false);
        addMessage({
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `❌ Có lỗi xảy ra: ${err instanceof Error ? err.message : 'Lỗi không xác định'}\n\nKiểm tra kết nối mạng và API key rồi thử lại nhé.`,
          timestamp: new Date().toISOString(),
        });
        scrollToEnd();
      }
    },
    [inputText, isTyping, addMessage, updateContent, scrollToEnd]
  );

  // ── Save entries ─────────────────────────────────────────────────────────────

  const handleSave = useCallback(
    async (messageId: string, entries: ParsedEntry[]) => {
      if (savingMessageIds.has(messageId) || savedMessageIds.has(messageId)) return;
      setSavingMessageIds((prev) => new Set([...prev, messageId]));

      try {
        await Promise.all(
          entries.map((e) =>
            addEntry({
              category: e.category,
              title: e.title,
              detail: e.detail,
              sentiment: e.sentiment,
              is_recurring: false,
            })
          )
        );
        setSavedMessageIds((prev) => new Set([...prev, messageId]));
      } catch (err) {
        Alert.alert('Lỗi lưu dữ liệu', err instanceof Error ? err.message : 'Lỗi không xác định');
      } finally {
        setSavingMessageIds((prev) => {
          const next = new Set(prev);
          next.delete(messageId);
          return next;
        });
      }
    },
    [savingMessageIds, savedMessageIds]
  );

  // ── Render message item ──────────────────────────────────────────────────────

  const renderMessage = useCallback(
    ({ item }: { item: ChatMessage }) => {
      const isSaved = savedMessageIds.has(item.id);
      const isSaving = savingMessageIds.has(item.id);
      const hasEntries = item.parsed_entries && item.parsed_entries.length > 0;

      return (
        <View>
          <ChatBubble message={item} />

          {/* Save button block */}
          {hasEntries && (
            <View style={{ marginLeft: 58, marginRight: 16, marginTop: -4, marginBottom: 16 }}>
              {!isSaved ? (
                <Pressable
                  onPress={() => handleSave(item.id, item.parsed_entries!)}
                  disabled={isSaving}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 13,
                    paddingHorizontal: 20,
                    borderRadius: 14,
                    backgroundColor: isSaving ? '#d1d5db' : '#10b981',
                    opacity: isSaving ? 0.8 : pressed ? 0.85 : 1,
                    shadowColor: '#10b981',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: isSaving ? 0 : 0.3,
                    shadowRadius: 8,
                    elevation: isSaving ? 0 : 4,
                  })}
                >
                  <Save size={16} color="#ffffff" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#ffffff',
                      marginLeft: 8,
                    }}
                  >
                    {isSaving
                      ? 'Đang lưu...'
                      : `Lưu tất cả vào nhật ký (${item.parsed_entries!.length} mục)`}
                  </Text>
                </Pressable>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    backgroundColor: C.successLight,
                    alignSelf: 'flex-start',
                  }}
                >
                  <CheckCircle size={15} color={C.success} />
                  <Text
                    style={{ fontSize: 13, fontWeight: '600', color: C.success, marginLeft: 6 }}
                  >
                    Đã lưu thành công!
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      );
    },
    [savedMessageIds, savingMessageIds, handleSave]
  );

  const typingMsg: ChatMessage = {
    id: 'typing',
    role: 'assistant',
    content: '',
    timestamp: new Date().toISOString(),
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* ── Header ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: C.surface,
            borderBottomWidth: 1,
            borderBottomColor: C.border,
          }}
        >
          {/* Left: bot icon + title */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: C.aiPurpleLight,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 20 }}>🤖</Text>
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '700', color: C.textPrimary }}>
                AI Chat
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isTyping ? '#f59e0b' : '#22c55e',
                  }}
                />
                <Text style={{ fontSize: 11, color: C.textTertiary }}>
                  {isTyping ? 'Đang phân tích...' : 'Sẵn sàng'}
                </Text>
              </View>
            </View>
          </View>

          {/* Right: history */}
          <Pressable
            onPress={() => router.push('/chat-history')}
            style={({ pressed }) => ({
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: '#f3f4f6',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
            accessibilityLabel="Lịch sử chat"
          >
            <Clock size={18} color="#6b7280" />
          </Pressable>
        </View>

        {/* ── Messages ── */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
          ListFooterComponent={isTyping ? <ChatBubble message={typingMsg} isTyping /> : null}
        />

        {/* ── Input bar ── */}
        <View
          style={{
            backgroundColor: C.surface,
            borderTopWidth: 1,
            borderTopColor: '#f1f5f9',
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {/* Mic button — navigates to recording screen */}
            <Pressable
              onPress={() => router.push('/recording')}
              style={({ pressed }) => ({
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#ede9fe', // purple-100
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.75 : 1,
                flexShrink: 0,
              })}
              accessibilityLabel="Gợi ý câu mẫu"
            >
              <Mic size={22} color="#7c3aed" />
            </Pressable>

            {/* Input wrapper — send button absolute inside */}
            <View style={{ flex: 1, position: 'relative' }}>
              <TextInput
                style={{
                  backgroundColor: '#f1f5f9', // slate-100
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingRight: 48, // room for send button
                  paddingVertical: 12,
                  fontSize: 14,
                  color: C.textPrimary,
                  maxHeight: 100,
                  lineHeight: 20,
                }}
                placeholder="Nhắn tin hoặc nói cho AI..."
                placeholderTextColor="#94a3b8"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={1000}
                returnKeyType="send"
                onSubmitEditing={() => handleSend()}
              />
              {/* Send icon — absolute inside input, right side */}
              <Pressable
                onPress={() => handleSend()}
                disabled={!inputText.trim() || isTyping}
                hitSlop={8}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                }}
                accessibilityLabel="Gửi tin nhắn"
              >
                <Send
                  size={20}
                  color={inputText.trim() && !isTyping ? C.primary : '#cbd5e1'}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
