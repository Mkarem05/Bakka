import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts, fontSize } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

type BadgeVariant = 'primary' | 'accent' | 'success' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'primary', style }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  primary: { backgroundColor: colors.primaryLight },
  accent: { backgroundColor: colors.accentLight },
  success: { backgroundColor: '#D4EDDA' },
  error: { backgroundColor: '#FDECEA' },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.xs,
  },
  primaryText: { color: colors.primary },
  accentText: { color: colors.accent },
  successText: { color: colors.success },
  errorText: { color: colors.error },
});
