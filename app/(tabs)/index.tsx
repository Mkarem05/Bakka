import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { PrayerWidget } from '../../src/components/prayer/PrayerWidget';
import { Badge } from '../../src/components/ui/Badge';
import { useProfileStore } from '../../src/store/profileStore';
import { useProgressStore } from '../../src/store/progressStore';
import { formatCountdown } from '../../src/utils/dateUtils';
import { UMRAH_STEPS } from '../../src/data/umrahSteps';
import { HAJJ_STEPS } from '../../src/data/hajjSteps';

interface QuickTile {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  href: string;
  accent?: boolean;
  wide?: boolean;
}

const QUICK_DUAS = [
  'При входе',
  'Вид Каабы',
  'Зам-зам',
  'Таваф',
  'На Сафа',
];

export default function HomeScreen() {
  const router = useRouter();
  const { tripType, tripDate } = useProfileStore();
  const { umrahCompleted, hajjCompleted } = useProgressStore();

  const countdown = formatCountdown(tripDate);
  const isHajj = tripType === 'hajj';

  const totalSteps = isHajj ? HAJJ_STEPS.length : UMRAH_STEPS.length;
  const completedCount = isHajj ? hajjCompleted.length : umrahCompleted.length;

  const progressLabel = isHajj ? 'Прогресс Хаджа' : 'Прогресс Умры';

  const tiles: QuickTile[] = [
    { icon: 'book-outline', label: 'Умра', href: '/(tabs)/guide' },
    { icon: 'moon-outline', label: 'Хадж', href: '/(tabs)/guide' },
    { icon: 'heart-outline', label: 'Дуа', href: '/(tabs)/dua' },
    { icon: 'warning-outline', label: 'SOS', href: '/sos', accent: true },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.salam}>السَّلَامُ عَلَيْكُمْ</Text>
          <View style={styles.greetingRow}>
            <Text style={styles.greetingTitle}>Добро пожаловать</Text>
            {countdown && (
              <Badge label={`До поездки: ${countdown}`} variant="primary" />
            )}
          </View>
        </View>

        {/* Prayer widget */}
        <PrayerWidget />

        {/* Progress card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>{progressLabel}</Text>
          <View style={styles.segments}>
            {Array.from({ length: totalSteps }).map((_, i) => {
              const stepId = i + 1;
              const done = isHajj
                ? hajjCompleted.includes(stepId)
                : umrahCompleted.includes(stepId);
              const isNext = !done && (
                isHajj
                  ? !hajjCompleted.includes(stepId - 1) || stepId === 1
                  : !umrahCompleted.includes(stepId - 1) || stepId === 1
              );
              return (
                <View
                  key={i}
                  style={[
                    styles.segment,
                    { flex: 1, marginHorizontal: 2 },
                    done && styles.segmentDone,
                    isNext && !done && styles.segmentActive,
                  ]}
                />
              );
            })}
          </View>
          <Text style={styles.progressCount}>
            Шагов выполнено: {completedCount} из {totalSteps}
          </Text>
        </View>

        {/* Quick access grid */}
        <View style={styles.grid}>
          {tiles.map((tile) => (
            <TouchableOpacity
              key={tile.label}
              style={[
                styles.tile,
                tile.accent && styles.tileAccent,
                tile.wide && styles.tileWide,
              ]}
              onPress={() => router.push(tile.href as Parameters<typeof router.push>[0])}
              activeOpacity={0.75}
            >
              <Ionicons
                name={tile.icon}
                size={26}
                color={tile.accent ? colors.white : colors.primary}
              />
              <Text style={[styles.tileLabel, tile.accent && styles.tileLabelAccent]}>
                {tile.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick duas */}
        <Text style={styles.sectionTitle}>Быстрые дуа</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.duaChips}
        >
          {QUICK_DUAS.map((label) => (
            <TouchableOpacity
              key={label}
              style={styles.chip}
              onPress={() => router.push('/(tabs)/dua')}
              activeOpacity={0.75}
            >
              <Text style={styles.chipText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  greeting: {
    marginBottom: spacing.lg,
  },
  salam: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 20,
    color: colors.accent,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  greetingTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  progressLabel: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  segments: {
    flexDirection: 'row',
    height: 8,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  segment: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  segmentDone: {
    backgroundColor: colors.accent,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  progressCount: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  tile: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tileAccent: {
    backgroundColor: colors.error,
  },
  tileWide: {
    minWidth: '100%',
  },
  tileLabel: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  tileLabelAccent: {
    color: colors.white,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  duaChips: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
