import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import {
  ZIYARAT,
  ZIY_CITY_FILTERS,
  ZIY_CITY_INTROS,
  type ZiyaratCity,
  type ZiyaratPlace,
} from '../../src/data/ziyarat';

const CITIES: { key: ZiyaratCity; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'mecca', label: 'Мекка', icon: 'home-outline' },
  { key: 'medina', label: 'Медина', icon: 'business-outline' },
  { key: 'jeddah', label: 'Джидда', icon: 'boat-outline' },
];

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  must: { bg: colors.primaryLight, text: colors.primary, border: colors.primary },
  rec: { bg: colors.accentLight, text: colors.accent, border: colors.accent },
  opt: { bg: colors.surfaceSecondary, text: colors.textSecondary, border: colors.border },
};

interface PlaceCardProps {
  place: ZiyaratPlace;
  expanded: boolean;
  onToggle: () => void;
}

function PlaceCard({ place, expanded, onToggle }: PlaceCardProps) {
  const tagStyle = TAG_COLORS[place.tag] ?? TAG_COLORS.opt;

  const handleCopyArabic = () => {
    Clipboard.setStringAsync(place.dua.ar);
  };

  return (
    <TouchableOpacity
      style={[styles.card, expanded && styles.cardExpanded]}
      onPress={onToggle}
      activeOpacity={0.85}
    >
      {/* Left accent bar */}
      <View style={[styles.cardAccentBar, { backgroundColor: tagStyle.border }]} />

      <View style={styles.cardInner}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardLeft}>
            <View style={styles.cardTitleBlock}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardName}>{place.name}</Text>
                <View style={[styles.catBadge, { backgroundColor: tagStyle.bg, borderColor: tagStyle.border }]}>
                  <Text style={[styles.catBadgeText, { color: tagStyle.text }]}>{place.cat}</Text>
                </View>
              </View>
              <Text style={styles.cardArabic}>{place.ar}</Text>
              <Text style={styles.cardShort}>{place.short}</Text>
            </View>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={18}
            color={colors.textSecondary}
            style={{ marginLeft: spacing.sm }}
          />
        </View>

        {/* Expanded body */}
        {expanded && (
          <View style={styles.cardBody}>
            {/* History */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="book-outline" size={14} color={colors.primary} />
                <Text style={styles.sectionTitle}>История</Text>
              </View>
              <Text style={styles.bodyText}>{place.history}</Text>
            </View>

            {/* Significance */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star-outline" size={14} color={colors.accent} />
                <Text style={[styles.sectionTitle, { color: colors.accent }]}>Значение</Text>
              </View>
              <Text style={styles.bodyText}>{place.sig}</Text>
            </View>

            {/* Dua */}
            <View style={styles.duaBox}>
              <View style={styles.sectionHeader}>
                <Ionicons name="heart-outline" size={14} color={colors.primary} />
                <Text style={styles.sectionTitle}>Дуа</Text>
              </View>
              <Text style={styles.duaArabic}>{place.dua.ar}</Text>
              <Text style={styles.duaTr}>{place.dua.tr}</Text>
              <Text style={styles.duaRu}>{place.dua.ru}</Text>
              <TouchableOpacity style={styles.copyBtn} onPress={handleCopyArabic} activeOpacity={0.7}>
                <Ionicons name="copy-outline" size={14} color={colors.primary} />
                <Text style={styles.copyBtnText}>Скопировать дуа</Text>
              </TouchableOpacity>
            </View>

            {/* How to get there */}
            <View style={styles.infoRow}>
              <Ionicons name="navigate-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.infoText}>{place.how}</Text>
            </View>

            {/* Best time */}
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.infoText}>{place.time}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function ZiyaratScreen() {
  const [city, setCity] = useState<ZiyaratCity>('mecca');
  const [filter, setFilter] = useState('Все');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const intro = ZIY_CITY_INTROS[city];
  const filters = ZIY_CITY_FILTERS[city];
  const allPlaces = ZIYARAT[city];

  const filtered =
    filter === 'Все' ? allPlaces : allPlaces.filter((p) => p.cat === filter);

  const handleCityChange = (c: ZiyaratCity) => {
    setCity(c);
    setFilter('Все');
    setExpandedId(null);
  };

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* City tabs */}
      <LinearGradient
        colors={['#5A3A7A', '#7A4A9A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cityTabBar}
      >
        {CITIES.map((c) => (
          <TouchableOpacity
            key={c.key}
            style={[styles.cityTab, city === c.key && styles.cityTabActive]}
            onPress={() => handleCityChange(c.key)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={c.icon}
              size={16}
              color={city === c.key ? '#FFFFFF' : 'rgba(255,255,255,0.55)'}
            />
            <Text style={[styles.cityTabText, city === c.key && styles.cityTabTextActive]}>
              {c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* City intro card */}
        <View style={styles.introCard}>
          <Text style={styles.introIcon}>{intro.icon}</Text>
          <View style={styles.introRight}>
            <Text style={styles.introTitle}>{intro.title}</Text>
            <Text style={styles.introSub}>{intro.sub}</Text>
            <Text style={styles.introText}>{intro.text}</Text>
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => {
                setFilter(f);
                setExpandedId(null);
              }}
              activeOpacity={0.75}
            >
              <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Places */}
        <Text style={styles.countLabel}>
          {filtered.length}{' '}
          {filtered.length === 1 ? 'место' : filtered.length < 5 ? 'места' : 'мест'}
        </Text>

        {filtered.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            expanded={expandedId === place.id}
            onToggle={() => handleToggle(place.id)}
          />
        ))}

        <View style={{ height: spacing['4xl'] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  cityTabBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  cityTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  cityTabActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cityTabText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.65)',
  },
  cityTabTextActive: {
    color: colors.white,
  },
  scroll: {
    padding: spacing.lg,
  },
  introCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  introIcon: {
    fontSize: 36,
    lineHeight: 44,
  },
  introRight: {
    flex: 1,
  },
  introTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  introSub: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  introText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
    paddingBottom: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  countLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardExpanded: {
    borderColor: colors.primary,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  cardAccentBar: {
    width: 4,
    backgroundColor: colors.border,
  },
  cardInner: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.lg,
  },
  cardLeft: {
    flex: 1,
  },
  cardTitleBlock: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  cardName: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  catBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexShrink: 0,
  },
  catBadgeText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
  },
  cardArabic: {
    fontFamily: fonts.arabic,
    fontSize: 20,
    color: colors.accent,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 4,
  },
  cardShort: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  cardBody: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.xs,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bodyText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  duaBox: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  duaArabic: {
    fontFamily: fonts.arabic,
    fontSize: 24,
    color: colors.accent,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 38,
    marginBottom: spacing.xs,
  },
  duaTr: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  duaRu: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
  },
  copyBtnText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
});
