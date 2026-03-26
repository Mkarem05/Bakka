import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { StepCard } from '../../src/components/guide/StepCard';
import { ProgressBar } from '../../src/components/guide/ProgressBar';
import { UMRAH_STEPS, UmrahStep } from '../../src/data/umrahSteps';
import { HAJJ_STEPS, HajjStep } from '../../src/data/hajjSteps';
import { useProgressStore } from '../../src/store/progressStore';

type Tab = 'umrah' | 'hajj';
type DayFilter = 'all' | '8' | '9' | '10' | '11-13';

const DAY_FILTERS: { value: DayFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: '8', label: 'День 8' },
  { value: '9', label: 'День 9' },
  { value: '10', label: 'День 10' },
  { value: '11-13', label: '11–13' },
];

export default function GuideScreen() {
  const [tab, setTab] = useState<Tab>('umrah');
  const [dayFilter, setDayFilter] = useState<DayFilter>('all');
  const { umrahCompleted, hajjCompleted, markUmrahDone, unmarkUmrah, markHajjDone, unmarkHajj } =
    useProgressStore();

  const umrahProgress = umrahCompleted.length / UMRAH_STEPS.length;
  const hajjProgress = hajjCompleted.length / HAJJ_STEPS.length;

  const filteredHajj: HajjStep[] = HAJJ_STEPS.filter((s) => {
    if (dayFilter === 'all') return true;
    if (dayFilter === '11-13') return s.day >= 11;
    return s.day === parseInt(dayFilter);
  });

  const getUmrahState = (step: UmrahStep) => {
    if (umrahCompleted.includes(step.id)) return 'done' as const;
    const prevDone = step.id === 1 || umrahCompleted.includes(step.id - 1);
    return prevDone ? 'active' as const : 'future' as const;
  };

  const getHajjState = (step: HajjStep) => {
    if (hajjCompleted.includes(step.id)) return 'done' as const;
    const prevDone = step.id === 1 || hajjCompleted.includes(step.id - 1);
    return prevDone ? 'active' as const : 'future' as const;
  };

  const heroGrad = tab === 'umrah'
    ? (['#0E3D28', '#1A6B4A'] as [string, string])
    : (['#C9922A', '#E8B84A'] as [string, string]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Gradient header */}
      <LinearGradient colors={heroGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <Text style={styles.screenTitle}>Гид паломника</Text>
        <View style={styles.segmentRow}>
          {(['umrah', 'hajj'] as Tab[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.segBtn, tab === t && styles.segBtnActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.segText, tab === t && styles.segTextActive]}>
                {t === 'umrah' ? 'Умра' : 'Хадж'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Progress bar */}
        <View style={styles.progressRow}>
          <ProgressBar progress={tab === 'umrah' ? umrahProgress : hajjProgress} />
          <Text style={styles.progressText}>
            {tab === 'umrah'
              ? `${umrahCompleted.length} / ${UMRAH_STEPS.length}`
              : `${hajjCompleted.length} / ${HAJJ_STEPS.length}`}
          </Text>
        </View>

        {/* Day filter for Hajj */}
        {tab === 'hajj' && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            <View style={styles.filterRow}>
              {DAY_FILTERS.map((f) => (
                <TouchableOpacity
                  key={f.value}
                  style={[styles.filterChip, dayFilter === f.value && styles.filterChipActive]}
                  onPress={() => setDayFilter(f.value)}
                >
                  <Text
                    style={[styles.filterText, dayFilter === f.value && styles.filterTextActive]}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </LinearGradient>

      {/* Steps */}
      {tab === 'umrah' ? (
        <FlatList
          data={UMRAH_STEPS}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <StepCard
              step={item}
              state={getUmrahState(item)}
              onMarkDone={() => markUmrahDone(item.id)}
              onUnmark={() => unmarkUmrah(item.id)}
            />
          )}
        />
      ) : (
        <FlatList
          data={filteredHajj}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <StepCard
              step={item}
              state={getHajjState(item)}
              onMarkDone={() => markHajjDone(item.id)}
              onUnmark={() => unmarkHajj(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ivory },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  screenTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: '#FFFFFF',
    marginBottom: spacing.lg,
  },
  segmentRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: radius.md,
    padding: 3,
    marginBottom: spacing.md,
  },
  segBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  segBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  segText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
  },
  segTextActive: {
    color: '#FFFFFF',
    fontFamily: fonts.semiBold,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  progressText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.6)',
    minWidth: 36,
  },
  filterScroll: { marginBottom: spacing.sm },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingBottom: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.5)',
  },
  filterText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  filterTextActive: { color: '#FFFFFF' },
  list: { padding: spacing.lg, paddingBottom: spacing['4xl'] },
});
