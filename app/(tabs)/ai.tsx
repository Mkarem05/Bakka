import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { ChatBubble, TypingIndicator } from '../../src/components/chat/ChatBubble';
import { ChatInput } from '../../src/components/chat/ChatInput';
import { useChatStore } from '../../src/store/chatStore';
import { chatService } from '../../src/services/chatService';
import { showToast } from '../../src/components/ui/Toast';

const SUGGESTIONS = [
  'Что нельзя делать в ихраме?',
  'Как правильно делать таваф?',
  'Что взять в Умру?',
  'Что делать если я потерялся?',
];

export default function AIScreen() {
  const { messages, addMessage } = useChatStore();
  const [typing, setTyping] = useState(false);
  const listRef = useRef<FlatList>(null);

  const handleSend = async (text: string) => {
    const userMsg = { role: 'user' as const, content: text };
    addMessage(userMsg);
    setTyping(true);

    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const reply = await chatService.sendMessage([...messages, userMsg]);
      addMessage({ role: 'assistant', content: reply });
    } catch {
      showToast('Нет соединения. Проверьте интернет.', 'error');
    } finally {
      setTyping(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#5A3A7A', '#7A4A9A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerBar}
      >
        <Text style={styles.screenTitle}>Bakka AI</Text>
        <Text style={styles.screenSubtitle}>Помощник паломника</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        {isEmpty ? (
          <View style={styles.emptyState}>
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeIcon}>🕌</Text>
              <Text style={styles.emptyTitle}>Bakka AI — Помощник паломника</Text>
              <Text style={styles.emptySubtitle}>
                Задайте любой вопрос об Умре, Хадже или обрядах
              </Text>
            </View>
            <View style={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={styles.suggestionBtn}
                  onPress={() => handleSend(s)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestionText}>{s}</Text>
                  <Ionicons name="arrow-forward-outline" size={16} color="#5A3A7A" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(_, i) => String(i)}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
            ListFooterComponent={typing ? <TypingIndicator /> : null}
            renderItem={({ item }) => <ChatBubble message={item} />}
          />
        )}

        <ChatInput onSend={handleSend} disabled={typing} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF8F3' },
  flex: { flex: 1 },
  headerBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  screenTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: '#FFFFFF',
  },
  screenSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
    gap: spacing.md,
  },
  welcomeCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(90,58,122,0.15)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  welcomeIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.lg,
    color: '#2C1810',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: '#7D6B5A',
    textAlign: 'center',
    lineHeight: 22,
  },
  suggestions: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  suggestionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: spacing.lg,
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#F5EFE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  suggestionText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: '#2C1810',
    flex: 1,
    marginRight: spacing.sm,
  },
  messageList: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
