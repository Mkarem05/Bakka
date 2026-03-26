import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
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
          <Ionicons name="copy-outline" size={18} color="#1A6B4A" />
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(30,122,82,0.2)',
    borderRadius: 14,
    padding: spacing.lg,
    marginTop: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: '#1A6B4A',
    letterSpacing: 1,
    textTransform: 'uppercase',
    flex: 1,
  },
  copyBtn: {
    padding: spacing.xs,
  },
  arabic: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 22,
    color: '#1A6B4A',
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 40,
    marginBottom: spacing.sm,
  },
  transliteration: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: '#7D6B5A',
    marginBottom: 6,
  },
  translation: {
    fontFamily: fonts.bold,
    fontSize: fontSize.base,
    color: '#2C1810',
    lineHeight: 22,
  },
});
