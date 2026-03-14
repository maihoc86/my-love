import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bot, Send, Sparkles, CheckCircle } from 'lucide-react-native';
import ChatBubble from '../../src/components/ChatBubble';
import { ChatMessage, ParsedEntry } from '../../src/types';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Xin chào! Hôm nay bạn muốn kể gì về Thái Hoc? 💕\n\nHãy chia sẻ bất kì điều gì, mình sẽ giúp phân tích và lưu lại nhé!',
  timestamp: new Date().toISOString(),
};

const MOCK_PARSED_ENTRIES: ParsedEntry[] = [
  { category: 'food', title: 'Thích ăn phở bò', sentiment: 'love' },
  { category: 'allergy', title: 'Dị ứng tôm', sentiment: 'hate' },
  { category: 'hobby', title: 'Thích đọc sách', sentiment: 'like' },
];

const SUGGESTION_PROMPTS = [
  'Thái Hoc thích ăn phở bò, dị ứng tôm, và hay đọc sách trước khi ngủ',
  'Hôm nay đi ăn với Thái Hoc, bé thích món cá kho tộ lắm',
  'Thái Hoc ghét trời mưa nhưng rất thích uống trà sữa',
  'Sinh nhật Thái Hoc là ngày 15/8, bé thích hoa hồng',
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set());
  const flatListRef = useRef<FlatList>(null);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const handleSend = useCallback(
    (text?: string) => {
      const messageText = text || inputText.trim();
      if (!messageText || isTyping) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: messageText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText('');
      setIsTyping(true);
      setShowSuggestions(false);
      scrollToEnd();

      // Mock AI response after delay
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: `Mình đã phân tích và tìm thấy ${MOCK_PARSED_ENTRIES.length} thông tin:`,
          parsed_entries: MOCK_PARSED_ENTRIES,
          timestamp: new Date().toISOString(),
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, aiMessage]);
        scrollToEnd();
      }, 1500);
    },
    [inputText, isTyping, scrollToEnd],
  );

  const handleSave = useCallback(
    (messageId: string, count: number) => {
      setSavedMessageIds((prev) => new Set([...prev, messageId]));
    },
    [],
  );

  const handleSuggestionPress = useCallback(
    (suggestion: string) => {
      handleSend(suggestion);
    },
    [handleSend],
  );

  const renderMessage = useCallback(
    ({ item }: { item: ChatMessage }) => {
      const isSaved = savedMessageIds.has(item.id);
      return (
        <View>
          <ChatBubble message={item} />
          {item.parsed_entries &&
            item.parsed_entries.length > 0 &&
            !isSaved && (
              <View className="px-4 mb-4" style={{ marginLeft: 36 }}>
                <Pressable
                  onPress={() => handleSave(item.id, item.parsed_entries!.length)}
                  className="flex-row items-center justify-center py-2.5 px-5 rounded-full"
                  style={{
                    backgroundColor: '#10b981',
                    alignSelf: 'flex-start',
                    shadowColor: '#10b981',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 4,
                  }}
                >
                  <CheckCircle size={16} color="#ffffff" />
                  <Text
                    className="text-sm font-semibold ml-1.5"
                    style={{ color: '#ffffff' }}
                  >
                    Lưu tất cả ({item.parsed_entries.length} mục)
                  </Text>
                </Pressable>
              </View>
            )}
          {item.parsed_entries &&
            item.parsed_entries.length > 0 &&
            isSaved && (
              <View className="px-4 mb-4" style={{ marginLeft: 36 }}>
                <View
                  className="flex-row items-center py-2 px-4 rounded-full"
                  style={{ backgroundColor: '#ecfdf5', alignSelf: 'flex-start' }}
                >
                  <CheckCircle size={14} color="#10b981" />
                  <Text
                    className="text-xs font-medium ml-1"
                    style={{ color: '#10b981' }}
                  >
                    Đã lưu thành công!
                  </Text>
                </View>
              </View>
            )}
        </View>
      );
    },
    [savedMessageIds, handleSave],
  );

  const typingMessage: ChatMessage = {
    id: 'typing',
    role: 'assistant',
    content: '',
    timestamp: new Date().toISOString(),
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#fdf2f8' }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View
          className="flex-row items-center justify-between px-5 py-3"
          style={{
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: '#f3f4f6',
          }}
        >
          <View className="flex-row items-center">
            <View
              className="w-9 h-9 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: '#f3e8ff' }}
            >
              <Bot size={20} color="#8b5cf6" />
            </View>
            <View>
              <Text className="text-lg font-bold" style={{ color: '#1f2937' }}>
                AI Chat
              </Text>
              <Text className="text-xs" style={{ color: '#9ca3af' }}>
                Kể tự nhiên, AI sẽ phân tích
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => setShowSuggestions(!showSuggestions)}
            className="flex-row items-center px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#fff1f2' }}
          >
            <Sparkles size={14} color="#f43f5e" />
            <Text
              className="text-xs font-semibold ml-1"
              style={{ color: '#f43f5e' }}
            >
              Gợi ý
            </Text>
          </Pressable>
        </View>

        {/* Suggestions Panel */}
        {showSuggestions && (
          <View
            className="px-4 py-3"
            style={{
              backgroundColor: '#ffffff',
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6',
            }}
          >
            <Text
              className="text-xs font-semibold mb-2"
              style={{ color: '#9ca3af' }}
            >
              GỢI Ý MẪU CÂU
            </Text>
            {SUGGESTION_PROMPTS.map((suggestion, index) => (
              <Pressable
                key={index}
                onPress={() => handleSuggestionPress(suggestion)}
                className="py-2 px-3 mb-1.5 rounded-xl"
                style={{ backgroundColor: '#fdf2f8' }}
              >
                <Text className="text-sm" style={{ color: '#1f2937' }}>
                  {suggestion}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
          ListFooterComponent={
            isTyping ? <ChatBubble message={typingMessage} isTyping /> : null
          }
        />

        {/* Input Area */}
        <View
          className="flex-row items-center px-4 py-3"
          style={{
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#f3f4f6',
          }}
        >
          <View
            className="flex-1 flex-row items-center px-4 mr-2"
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: 24,
              minHeight: 44,
            }}
          >
            <TextInput
              className="flex-1 text-sm py-2.5"
              style={{ color: '#1f2937' }}
              placeholder="Nhắn tin cho AI..."
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />
          </View>
          <Pressable
            onPress={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
            className="w-11 h-11 rounded-full items-center justify-center"
            style={{
              backgroundColor:
                inputText.trim() && !isTyping ? '#f43f5e' : '#e5e7eb',
            }}
          >
            <Send
              size={18}
              color={inputText.trim() && !isTyping ? '#ffffff' : '#9ca3af'}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
