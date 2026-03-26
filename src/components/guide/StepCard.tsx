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
import { fonts, fontSize } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
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
  done: 'rgba(26,107,74,0.2)',
  active: 'rgba(26,107,74,0.3)',
  future: '#F5EFE8',
};

const SHADOW_COLOR: Record<StepState, string> = {
  done: 'rgba(26,107,74,0.15)',
  active: 'rgba(26,107,74,0.15)',
  future: 'transparent',
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
    <View style={[
      styles.card,
      { borderColor: BORDER_COLOR[state] },
      state === 'active' && styles.cardActive,
    ]}>
      {/* Step number dot */}
      <View style={[styles.numDot, isDone && styles.numDotDone, state === 'active' && styles.numDotActive]}>
        {isDone
          ? <Text style={styles.numDotText}>✓</Text>
          : <Text style={styles.numDotText}>{step.id}</Text>
        }
      </View>

      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggle} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <Text style={styles.stepName}>{step.name}</Text>
          <Text style={styles.stepArabic}>{step.nameArabic}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-down" size={18} color="#7D6B5A" />
        </Animated.View>
      </TouchableOpacity>

      {/* Body */}
      {expanded && (
        <View style={styles.body}>
          <Text style={styles.description}>{step.description}</Text>

          <View style={styles.tipsBlock}>
            {step.tips.map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <Text style={styles.tipArrow}>→</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          {step.duas.map((dua, i) => (
            <DuaBox key={i} dua={dua} />
          ))}

          <TouchableOpacity
            style={[styles.doneBtn, isDone && styles.doneBtnDone]}
            onPress={isDone ? onUnmark : onMarkDone}
            activeOpacity={0.8}
          >
            <Text style={[styles.doneBtnText, isDone && styles.doneBtnTextDone]}>
              {isDone ? '✓ Выполнено' : 'Отметить выполненным'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F5EFE8',
    borderRadius: 12,
    marginBottom: spacing.sm,
    paddingLeft: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  cardActive: {
    shadowColor: 'rgba(26,107,74,0.15)',
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 4,
  },
  numDot: {
    position: 'absolute',
    left: -14,
    top: 18,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEE8E0',
    borderWidth: 2,
    borderColor: 'rgba(44,24,16,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  numDotActive: {
    backgroundColor: '#C9A030',
    borderColor: '#C9A030',
  },
  numDotDone: {
    backgroundColor: '#C9A030',
    borderColor: '#C9A030',
  },
  numDotText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingLeft: spacing.md,
  },
  headerLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  stepName: {
    fontFamily: fonts.semiBold,
    fontSize: 19,
    color: '#2C1810',
    letterSpacing: -0.2,
  },
  stepArabic: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 15,
    color: '#C9A030',
    marginTop: 2,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.md,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: '#7D6B5A',
    lineHeight: 26,
    marginBottom: spacing.md,
  },
  tipsBlock: {
    marginBottom: spacing.md,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(44,24,16,0.09)',
    paddingVertical: 7,
  },
  tipArrow: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#C9A030',
    marginRight: spacing.sm,
    marginTop: 2,
    width: 12,
  },
  tipText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: '#2C1810',
    flex: 1,
    lineHeight: 20,
  },
  doneBtn: {
    marginTop: spacing.md,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#C9A030',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(26,107,74,0.18)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  doneBtnDone: {
    backgroundColor: '#8a7010',
    shadowOpacity: 0,
    elevation: 0,
  },
  doneBtnText: {
    fontFamily: fonts.bold,
    fontSize: fontSize.base,
    color: '#FDF8F3',
  },
  doneBtnTextDone: {
    color: '#FDF8F3',
  },
});
