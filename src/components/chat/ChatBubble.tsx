import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts, fontSize } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';
import type { ChatMessage } from '../../store/chatStore';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAI]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textAI]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

export function TypingIndicator() {
  return (
    <View style={[styles.row, styles.rowAI]}>
      <View style={[styles.bubble, styles.bubbleAI, styles.typingBubble]}>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: spacing.xs,
    marginHorizontal: spacing.lg,
  },
  rowUser: {
    alignItems: 'flex-end',
  },
  rowAI: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  bubbleAI: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    lineHeight: 22,
  },
  textUser: {
    color: colors.white,
  },
  textAI: {
    color: colors.textPrimary,
  },
  typingBubble: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.textMuted,
  },
  dot1: {},
  dot2: { opacity: 0.7 },
  dot3: { opacity: 0.4 },
});
