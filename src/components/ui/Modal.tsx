import React, { useEffect, useRef } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../theme/colors';
import { fonts, fontSize } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

type ActionVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export interface ModalAction {
  label: string;
  onPress: () => void;
  variant?: ActionVariant;
}

interface ModalProps {
  visible: boolean;
  title: string;
  message?: string;
  actions: ModalAction[];
  onClose?: () => void;
}

export function Modal({ visible, title, message, actions, onClose }: ModalProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 60,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }).start();
      slideAnim.setValue(60);
    }
  }, [visible, fadeAnim, slideAnim]);

  const hasCancelAction = actions.some(
    (a) => a.variant === 'secondary' || a.variant === 'ghost'
  );

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={hasCancelAction ? onClose : undefined}
      >
        <Animated.View style={[styles.backdropOverlay, { opacity: fadeAnim }]} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
        pointerEvents="box-none"
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.actions}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles[`action_${action.variant ?? 'primary'}`] as any]}
                onPress={action.onPress}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.actionText,
                    styles[`actionText_${action.variant ?? 'primary'}`] as any,
                  ]}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    </RNModal>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: height * 0.85,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing['2xl'],
    paddingBottom: spacing['4xl'],
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  message: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  actions: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  action_primary: {
    backgroundColor: colors.primary,
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action_secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action_danger: {
    backgroundColor: colors.error,
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action_ghost: {
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
  },
  actionText_primary: { color: colors.white },
  actionText_secondary: { color: colors.primary },
  actionText_danger: { color: colors.white },
  actionText_ghost: { color: colors.textSecondary },
});
