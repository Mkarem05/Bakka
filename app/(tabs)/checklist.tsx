import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { ProgressBar } from '../../src/components/guide/ProgressBar';
import {
  CHECKLIST_ITEMS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  ChecklistCategory,
} from '../../src/data/checklist';
import { useChecklistStore } from '../../src/store/checklistStore';

const CATEGORIES: ChecklistCategory[] = ['documents', 'clothes', 'spiritual', 'health', 'travel'];

export default function ChecklistScreen() {
  const [activeCategory, setActiveCategory] = useState<ChecklistCategory>('documents');
  const { completed, toggle } = useChecklistStore();

  const filtered = CHECKLIST_ITEMS.filter((i) => i.category === activeCategory);
  const total = CHECKLIST_ITEMS.length;
  const progress = completed.length / total;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Подготовка к поездке</Text>
        <View style={styles.progressRow}>
          <ProgressBar progress={progress} />
          <Text style={styles.progressText}>
            Готово: {completed.length} из {total}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.tabChip, activeCategory === cat && styles.tabChipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Ionicons
                name={CATEGORY_ICONS[cat] as any}
                size={16}
                color={activeCategory === cat ? colors.white : colors.textSecondary}
              />
              <Text style={[styles.tabText, activeCategory === cat && styles.tabTextActive]}>
                {CATEGORY_LABELS[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const checked = completed.includes(item.id);
          return (
            <TouchableOpacity
              style={[styles.item, checked && styles.itemChecked]}
              onPress={() => toggle(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                {checked && <Ionicons name="checkmark" size={14} color={colors.white} />}
              </View>
              <Text style={[styles.itemText, checked && styles.itemTextChecked]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ivory },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.ivory,
  },
  screenTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  progressText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    minWidth: 90,
  },
  tabs: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 36,
  },
  tabChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  tabTextActive: { color: colors.white },
  list: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  itemChecked: {
    backgroundColor: colors.primaryLight,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  itemText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  itemTextChecked: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
