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
import { MASJID_PLACES, MASJID_CATS, type MasjidPlace } from '../../src/data/masjidPlaces';

const CAT_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Все': 'apps-outline',
  'Главное': 'star-outline',
  'Вода': 'water-outline',
  "Са'й": 'swap-horizontal-outline',
  'Намаз': 'radio-button-on-outline',
  'Услуги': 'medkit-outline',
  'Этажи': 'layers-outline',
};

const FLOOR_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  '1': 'home-outline',
  '2': 'layers-outline',
  'Кровля': 'cloudy-outline',
  'Везде': 'grid-outline',
  'Все': 'grid-outline',
  '1, 2': 'layers-outline',
};

interface PlaceCardProps {
  place: MasjidPlace;
  expanded: boolean;
  onToggle: () => void;
}

function PlaceCard({ place, expanded, onToggle }: PlaceCardProps) {
  const handleCopyArabic = () => {
    Clipboard.setStringAsync(place.ar);
  };

  return (
    <TouchableOpacity
      style={[styles.card, expanded && styles.cardExpanded]}
      onPress={onToggle}
      activeOpacity={0.85}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardLeft}>
          <View style={styles.iconWrap}>
            <Ionicons
              name={CAT_ICONS[place.cat] ?? 'location-outline'}
              size={20}
              color={expanded ? colors.primary : colors.textSecondary}
            />
          </View>
          <View style={styles.cardTitleBlock}>
            <Text style={styles.cardName}>{place.name}</Text>
            <Text style={styles.cardArabic}>{place.ar}</Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={18}
          color={colors.textSecondary}
        />
      </View>

      {expanded && (
        <View style={styles.cardBody}>
          <Text style={styles.cardDesc}>{place.desc}</Text>

          {/* Location + Floor badges */}
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="location-outline" size={12} color={colors.primary} />
              <Text style={styles.badgeText}>{place.where}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons
                name={FLOOR_ICONS[place.floor] ?? 'layers-outline'}
                size={12}
                color={colors.accent}
              />
              <Text style={[styles.badgeText, { color: colors.accent }]}>Этаж: {place.floor}</Text>
            </View>
          </View>

          {/* Tips */}
          {place.tips.length > 0 && (
            <View style={styles.tipsBlock}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb-outline" size={14} color={colors.primary} />
                <Text style={styles.tipsTitle}>Советы</Text>
              </View>
              {place.tips.map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <View style={styles.tipDot} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Copy Arabic */}
          <TouchableOpacity style={styles.copyBtn} onPress={handleCopyArabic} activeOpacity={0.7}>
            <Ionicons name="copy-outline" size={14} color={colors.primary} />
            <Text style={styles.copyBtnText}>Скопировать название по-арабски</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function MasjidScreen() {
  const [selectedCat, setSelectedCat] = useState('Все');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    selectedCat === 'Все'
      ? MASJID_PLACES
      : MASJID_PLACES.filter((p) => p.cat === selectedCat);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['#0E3D28', '#1A6B4A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerIcon}>
          <Ionicons name="business-outline" size={22} color={colors.white} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Масджид аль-Харам</Text>
          <Text style={styles.headerSub}>Навигация по мечети</Text>
        </View>
      </LinearGradient>

      {/* Category filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
        style={styles.catScroll}
      >
        {MASJID_CATS.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, selectedCat === cat && styles.catChipActive]}
            onPress={() => {
              setSelectedCat(cat);
              setExpandedId(null);
            }}
            activeOpacity={0.75}
          >
            <Ionicons
              name={CAT_ICONS[cat] ?? 'apps-outline'}
              size={13}
              color={selectedCat === cat ? colors.white : colors.textSecondary}
            />
            <Text style={[styles.catChipText, selectedCat === cat && styles.catChipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Places list */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.countLabel}>
          {filtered.length} {filtered.length === 1 ? 'место' : filtered.length < 5 ? 'места' : 'мест'}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.lg,
    color: '#FFFFFF',
  },
  headerSub: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  catScroll: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  catRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 34,
  },
  catChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catChipText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  catChipTextActive: {
    color: colors.white,
  },
  list: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  countLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardExpanded: {
    borderColor: colors.primary,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleBlock: {
    flex: 1,
  },
  cardName: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  cardArabic: {
    fontFamily: fonts.arabic,
    fontSize: 18,
    color: colors.accent,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 2,
  },
  cardBody: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  cardDesc: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.primary,
  },
  tipsBlock: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  tipsTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.xs,
    color: colors.primary,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: 6,
  },
  tipDot: {
    width: 5,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    marginTop: 7,
    flexShrink: 0,
  },
  tipText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 20,
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
});
