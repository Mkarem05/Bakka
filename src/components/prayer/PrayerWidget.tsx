import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fonts, fontSize } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';
import { prayerService } from '../../services/prayerService';
import { usePrayerStore } from '../../store/prayerStore';

export function PrayerWidget() {
  const { data, loading, setData, setLoading, setError } = usePrayerStore();

  const skeletonAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(skeletonAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
          Animated.timing(skeletonAnim, { toValue: 0.4, duration: 700, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [loading, skeletonAnim]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const load = async () => {
      setLoading(true);
      try {
        const result = await prayerService.getTimes();
        setData(result);
      } catch {
        setError(true);
      }
    };

    load();
    interval = setInterval(load, 60 * 1000);
    return () => clearInterval(interval);
  }, [setData, setLoading, setError]);

  if (loading && !data) {
    return (
      <View style={styles.card}>
        <Animated.View style={[styles.skeletonLine, { opacity: skeletonAnim, width: 120 }]} />
        <Animated.View style={[styles.skeletonLine, { opacity: skeletonAnim, width: 80, marginTop: 8 }]} />
      </View>
    );
  }

  if (!data) return null;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="time-outline" size={20} color={colors.primary} style={styles.icon} />
        <View>
          <Text style={styles.label}>Следующий намаз</Text>
          <Text style={styles.prayerName}>{data.nextPrayer.nameRu}</Text>
        </View>
        <View style={styles.timeBlock}>
          <Text style={styles.time}>{data.nextPrayer.time}</Text>
          <Text style={styles.countdown}>через {data.countdown}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.md,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  prayerName: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  timeBlock: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  time: {
    fontFamily: fonts.bold,
    fontSize: fontSize.lg,
    color: colors.primary,
  },
  countdown: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: colors.border,
    borderRadius: radius.sm,
  },
});
