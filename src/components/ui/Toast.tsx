import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fonts, fontSize } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastData {
  message: string;
  variant: ToastVariant;
  id: number;
}

type ShowToast = (message: string, variant?: ToastVariant) => void;

// Singleton ref — set by ToastContainer
let _showToast: ShowToast | null = null;

export function showToast(message: string, variant: ToastVariant = 'info') {
  _showToast?.(message, variant);
}

const VARIANT_CONFIG: Record<
  ToastVariant,
  { bg: string; text: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  success: { bg: colors.success, text: colors.white, icon: 'checkmark-circle-outline' },
  error: { bg: colors.error, text: colors.white, icon: 'alert-circle-outline' },
  info: { bg: colors.dark, text: colors.white, icon: 'information-circle-outline' },
};

export function useToast() {
  return {
    show: (message: string, variant?: ToastVariant) => showToast(message, variant),
  };
}

function ToastItem({ toast, onHide }: { toast: ToastData; onHide: () => void }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 20, duration: 200, useNativeDriver: true }),
      ]).start(onHide);
    }, 2500);

    return () => clearTimeout(timer);
  }, [opacity, translateY, onHide]);

  const config = VARIANT_CONFIG[toast.variant];

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: config.bg, opacity, transform: [{ translateY }] },
      ]}
    >
      <Ionicons name={config.icon} size={18} color={config.text} style={styles.icon} />
      <Text style={[styles.text, { color: config.text }]}>{toast.message}</Text>
    </Animated.View>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const counterRef = useRef(0);

  const show = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = ++counterRef.current;
    setToasts((prev) => [...prev.slice(-2), { message, variant, id }]);
  }, []);

  useEffect(() => {
    _showToast = show;
    return () => {
      _showToast = null;
    };
  }, [show]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onHide={() => remove(toast.id)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 9999,
    gap: spacing.sm,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    flex: 1,
  },
});
