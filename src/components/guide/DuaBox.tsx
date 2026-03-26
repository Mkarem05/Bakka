import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fonts, fontSize } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';
import { showToast } from '../ui/Toast';
import type { DuaItem } from '../../data/umrahSteps';

interface DuaBoxProps {
  dua: DuaItem;
}

export function DuaBox({ dua }: DuaBoxProps) {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(dua.arabic);
    showToast('Скопировано', 'success');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{dua.name}</Text>
        <TouchableOpacity
          onPress={handleCopy}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.copyBtn}
        >
          <Ionicons name="copy-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.arabic}>{dua.arabic}</Text>
      <Text style={styles.transliteration}>{dua.transliteration}</Text>
      <Text style={styles.translation}>{dua.translation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.primary,
    flex: 1,
  },
  copyBtn: {
    padding: spacing.xs,
  },
  arabic: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 26,
    color: colors.accent,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 44,
    marginBottom: spacing.sm,
  },
  transliteration: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  translation: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.dark,
    lineHeight: 20,
  },
});
