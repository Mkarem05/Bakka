import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fonts, fontSize } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';
import { DuaBox } from './DuaBox';
import type { UmrahStep } from '../../data/umrahSteps';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type StepState = 'done' | 'active' | 'future';

interface StepCardProps {
  step: UmrahStep;
  state: StepState;
  onMarkDone: () => void;
  onUnmark: () => void;
}

const BORDER_COLOR: Record<StepState, string> = {
  done: colors.accent,
  active: colors.primary,
  future: colors.border,
};

export function StepCard({ step, state, onMarkDone, onUnmark }: StepCardProps) {
  const [expanded, setExpanded] = useState(state === 'active');
  const rotateAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const next = !expanded;
    setExpanded(next);
    Animated.timing(rotateAnim, {
      toValue: next ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const isDone = state === 'done';

  return (
    <View style={[styles.card, { borderLeftColor: BORDER_COLOR[state] }]}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggle} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <View style={[styles.numBadge, isDone && styles.numBadgeDone]}>
            {isDone ? (
              <Ionicons name="checkmark" size={14} color={colors.white} />
            ) : (
              <Text style={styles.numText}>{step.id}</Text>
            )}
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.stepName}>{step.name}</Text>
            <Text style={styles.stepArabic}>{step.nameArabic}</Text>
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
        </Animated.View>
      </TouchableOpacity>

      {/* Body */}
      {expanded && (
        <View style={styles.body}>
          <Text style={styles.description}>{step.description}</Text>

          <Text style={styles.sectionTitle}>Советы</Text>
          {step.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons
                name="ellipse"
                size={6}
                color={colors.primary}
                style={styles.tipDot}
              />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Дуа</Text>
          {step.duas.map((dua, i) => (
            <DuaBox key={i} dua={dua} />
          ))}

          <TouchableOpacity
            style={[styles.doneBtn, isDone && styles.doneBtnActive]}
            onPress={isDone ? onUnmark : onMarkDone}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isDone ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={20}
              color={isDone ? colors.accent : colors.white}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.doneBtnText, isDone && styles.doneBtnTextActive]}>
              {isDone ? 'Выполнено' : 'Отметить выполненным'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderLeftWidth: 4,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  numBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  numBadgeDone: {
    backgroundColor: colors.accent,
  },
  numText: {
    fontFamily: fonts.bold,
    fontSize: fontSize.sm,
    color: colors.white,
  },
  titleBlock: {
    flex: 1,
  },
  stepName: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  stepArabic: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 16,
    color: colors.accent,
    marginTop: 2,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  tipDot: {
    marginTop: 7,
    marginRight: spacing.sm,
  },
  tipText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  doneBtn: {
    marginTop: spacing.lg,
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtnActive: {
    backgroundColor: colors.accentLight,
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  doneBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.white,
  },
  doneBtnTextActive: {
    color: colors.accent,
  },
});
