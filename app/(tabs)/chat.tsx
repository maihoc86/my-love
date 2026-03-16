import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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
import { Colors } from '@/theme';
import { QUICK_PROMPTS } from '@/lib/constants';

// ─── Constants ─────────────────────────────────────────────────────────────────

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Xin chào! 💕 Hôm nay bạn muốn kể gì về Thái Hoc? Hãy chia sẻ bất kì điều gì, mình sẽ phân tích và ghi nhận nhé!',
  timestamp: new Date().toISOString(),
};

// ─── Chat Screen ────────────────────────────────────────────────────────────────

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(
    new Set()
  );
  const [savingMessageIds, setSavingMessageIds] = useState<Set<string>>(new Set());
  const flatListRef = useRef<FlatList>(null);
  const abortRef = useRef(false);

  const showQuickPrompts = messages.length <= 1;

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
                  accessibilityLabel={
                    isSaving
                      ? 'Đang lưu ghi chú'
                      : `Lưu tất cả vào nhật ký, ${item.parsed_entries!.length} mục`
                  }
                  accessibilityRole="button"
                >
                  {({ pressed }) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 14,
                        paddingHorizontal: 20,
                        borderRadius: 16,
                        backgroundColor: isSaving ? Colors.border : Colors.success,
                        opacity: isSaving ? 0.8 : pressed ? 0.85 : 1,
                        shadowColor: Colors.success,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: isSaving ? 0 : 0.3,
                        shadowRadius: 10,
                        elevation: isSaving ? 0 : 4,
                      }}
                    >
                      <Save size={16} color={Colors.textOnPrimary} />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: Colors.textOnPrimary,
                          marginLeft: 8,
                        }}
                      >
                        {isSaving
                          ? 'Đang lưu...'
                          : `Lưu tất cả vào nhật ký (${item.parsed_entries!.length} mục)`}
                      </Text>
                    </View>
                  )}
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
                    backgroundColor: Colors.successLight,
                    alignSelf: 'flex-start',
                  }}
                >
                  <CheckCircle size={15} color={Colors.success} />
                  <Text
                    style={{ fontSize: 13, fontWeight: '600', color: Colors.success, marginLeft: 6 }}
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

  const hasInput = inputText.trim().length > 0;

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* ── Header — soft shadow, no hard border ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: Colors.whiteAlpha80,
            shadowColor: Colors.textPrimary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          {/* Left: gradient AI avatar + title */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LinearGradient
              colors={[Colors.aiPurple, Colors.aiPurpleDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 22 }}>🤖</Text>
            </LinearGradient>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.textPrimary }}>
                AI Trợ lý tình yêu
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <View
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    backgroundColor: isTyping ? Colors.warning : Colors.success,
                  }}
                />
                <Text style={{ fontSize: 11, color: Colors.textTertiary, fontWeight: '500' }}>
                  {isTyping ? 'Đang suy nghĩ...' : 'Sẵn sàng giúp bạn'}
                </Text>
              </View>
            </View>
          </View>

          {/* Right: history button */}
          <Pressable
            onPress={() => router.push('/chat-history')}
            hitSlop={12}
            style={({ pressed }) => ({
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: Colors.surfaceSecondary,
              borderWidth: 1,
              borderColor: Colors.borderLight,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
            accessibilityLabel="Lịch sử chat"
            accessibilityRole="button"
          >
            <Clock size={18} color={Colors.textTertiary} />
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
          ListHeaderComponent={
            showQuickPrompts ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 8 }}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
              >
                {QUICK_PROMPTS.map((prompt) => (
                  <Pressable
                    key={prompt.label}
                    onPress={() => handleSend(prompt.text)}
                    accessibilityLabel={prompt.label}
                    accessibilityRole="button"
                    style={({ pressed }) => ({
                      backgroundColor: Colors.surface,
                      paddingHorizontal: 16,
                      minHeight: 48,
                      justifyContent: 'center',
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: Colors.borderLight,
                      shadowColor: Colors.textPrimary,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 1,
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textSecondary }}>
                      {prompt.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            ) : null
          }
          ListFooterComponent={isTyping ? <ChatBubble message={typingMsg} isTyping /> : null}
        />

        {/* ── Input bar — soft shadow top, no hard border ── */}
        <View
          style={{
            backgroundColor: Colors.surface,
            paddingHorizontal: 16,
            paddingTop: 10,
            paddingBottom: 8,
            shadowColor: Colors.textPrimary,
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.04,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {/* Mic button */}
            <Pressable
              onPress={() => router.push('/recording')}
              hitSlop={12}
              style={({ pressed }) => ({
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: Colors.aiPurpleAlpha10,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.75 : 1,
                flexShrink: 0,
              })}
              accessibilityLabel="Ghi âm giọng nói"
              accessibilityRole="button"
            >
              <Mic size={22} color={Colors.aiPurpleDark} />
            </Pressable>

            {/* Input wrapper — rounded-full with send button inside */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.surfaceSecondary,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: Colors.borderLight,
                paddingLeft: 16,
                paddingRight: 6,
                paddingVertical: 4,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: Colors.textPrimary,
                  maxHeight: 100,
                  lineHeight: 20,
                  paddingVertical: 10,
                }}
                placeholder="Ghi nhận sở thích của Thái Hoc..."
                placeholderTextColor={Colors.textMuted}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={1000}
                returnKeyType="send"
                onSubmitEditing={() => handleSend()}
                accessibilityLabel="Nhập tin nhắn"
              />
              {/* Send button — gradient circle when active */}
              <Pressable
                onPress={() => handleSend()}
                disabled={!hasInput || isTyping}
                hitSlop={12}
                accessibilityLabel="Gửi tin nhắn"
                accessibilityRole="button"
              >
                {hasInput && !isTyping ? (
                  <LinearGradient
                    colors={[Colors.primary, Colors.primaryGradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: Colors.primary,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 6,
                      elevation: 3,
                    }}
                  >
                    <Send size={16} color={Colors.textOnPrimary} />
                  </LinearGradient>
                ) : (
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Send size={16} color={Colors.textTertiary} />
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          {/* Hint text */}
          <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              color: Colors.textTertiary,
              marginTop: 8,
            }}
          >
            Nhấn giữ <Text style={{ color: Colors.aiPurple, fontWeight: '500' }}>🎙</Text> để nói tiếng Việt — AI sẽ tự chuyển thành văn bản
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
