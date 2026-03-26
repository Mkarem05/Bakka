import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { DuaBox } from '../../src/components/guide/DuaBox';
import { DUAS, DuaCategory } from '../../src/data/duas';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const CATEGORIES: { value: DuaCategory; label: string }[] = [
  { value: 'umrah', label: 'Умра' },
  { value: 'hajj', label: 'Хадж' },
  { value: 'medina', label: 'Медина' },
  { value: 'zamzam', label: 'Зам-зам' },
  { value: 'daily', label: 'Ежедневные' },
];

export default function DuaScreen() {
  const [activeCategory, setActiveCategory] = useState<DuaCategory>('umrah');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = DUAS.filter((d) => d.category === activeCategory);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Дуа</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.value}
              style={[styles.tabChip, activeCategory === cat.value && styles.tabChipActive]}
              onPress={() => {
                setActiveCategory(cat.value);
                setExpanded(null);
              }}
            >
              <Text
                style={[styles.tabText, activeCategory === cat.value && styles.tabTextActive]}
              >
                {cat.label}
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
          const isExpanded = expanded === item.id;
          return (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggle(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeaderLeft}>
                  <Ionicons name="location-outline" size={16} color={colors.accent} />
                  <View style={styles.cardTitles}>
                    <Text style={styles.duaName}>{item.name}</Text>
                    <Text style={styles.duaMoment}>{item.moment}</Text>
                  </View>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
              {isExpanded && <DuaBox dua={item} />}
            </View>
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
  },
  screenTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  tabs: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  tabChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: spacing.sm,
  },
  cardTitles: { flex: 1 },
  duaName: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  duaMoment: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
