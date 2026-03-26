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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { PrayerWidget } from '../../src/components/prayer/PrayerWidget';
import { useProfileStore } from '../../src/store/profileStore';
import { useProgressStore } from '../../src/store/progressStore';
import { formatCountdown } from '../../src/utils/dateUtils';
import { UMRAH_STEPS } from '../../src/data/umrahSteps';
import { HAJJ_STEPS } from '../../src/data/hajjSteps';

const WHITE = '#FFFFFF';
const WHITE50 = 'rgba(255,255,255,0.5)';
const GOLD = '#C9A030';
const GOLD70 = 'rgba(232,168,48,0.7)';
const DUA_BG = 'rgba(44,24,16,0.09)';
const DUA_BORDER = 'rgba(201,168,76,0.2)';

const HERO_GRAD: [string, string, string] = ['#0E3D28', '#1A6B4A', '#0E3020'];
const UMRA_GRAD: [string, string] = ['#0E3D28', '#1A6B4A'];
const HAJJ_GRAD: [string, string] = ['#C9922A', '#E8B84A'];
const DUA_GRAD: [string, string] = ['#2E4A7A', '#3A60A0'];
const AI_GRAD: [string, string] = ['#5A3A7A', '#7A4A9A'];
const MASJID_GRAD: [string, string] = ['#0E3D28', '#1A6B4A'];
const CONV_GRAD: [string, string] = ['#C9922A', '#E8B84A'];
const ZIY_GRAD: [string, string] = ['#5A3A7A', '#7A4A9A'];

const QUICK_DUAS = ['При входе', 'Вид Каабы', 'Зам-зам', 'Таваф', 'На Сафа'];

interface Tile {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  href: string;
  grad: [string, string];
  badge?: string;
}

const TILES: Tile[] = [
  { icon: 'book-outline', label: 'Умра', sub: 'Малое паломничество', href: '/(tabs)/guide', grad: UMRA_GRAD, badge: '4 шага' },
  { icon: 'moon-outline', label: 'Хадж', sub: 'Великое паломничество', href: '/(tabs)/guide', grad: HAJJ_GRAD, badge: '7 шагов' },
  { icon: 'heart-outline', label: 'Дуа', sub: '100+ молитв', href: '/(tabs)/dua', grad: DUA_GRAD },
  { icon: 'sparkles-outline', label: 'Bakka AI', sub: 'Помощник 24/7', href: '/(tabs)/ai', grad: AI_GRAD },
  { icon: 'business-outline', label: 'Масджид', sub: 'Навигация Харам', href: '/(tabs)/masjid', grad: MASJID_GRAD },
  { icon: 'swap-horizontal-outline', label: 'Конвертер', sub: 'SAR → рубли', href: '/(tabs)/converter', grad: CONV_GRAD },
  { icon: 'map-outline', label: 'Зиярат', sub: 'Священные места', href: '/(tabs)/ziyarat', grad: ZIY_GRAD },
];

export default function HomeScreen() {
  const router = useRouter();
  const { tripType, tripDate } = useProfileStore();
  const { umrahCompleted, hajjCompleted } = useProgressStore();

  const countdown = formatCountdown(tripDate);
  const isHajj = tripType === 'hajj';

  const totalSteps = isHajj ? HAJJ_STEPS.length : UMRAH_STEPS.length;
  const completedCount = isHajj ? hajjCompleted.length : umrahCompleted.length;
  const progress = totalSteps > 0 ? completedCount / totalSteps : 0;
  const progressLabel = isHajj ? 'Прогресс Хаджа' : 'Прогресс Умры';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        {/* Hero header */}
        <LinearGradient
          colors={HERO_GRAD}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.salam}>السَّلَامُ عَلَيْكُمْ</Text>
          <Text style={styles.heroTitle}>Добро пожаловать</Text>
          {countdown ? (
            <Text style={styles.heroSub}>До поездки: {countdown}</Text>
          ) : (
            <Text style={styles.heroSub}>Ваш проводник к священному</Text>
          )}

          {/* Dua of the day card */}
          <View style={styles.duaCard}>
            <Text style={styles.duaLabel}>ДУА ДНЯ</Text>
            <Text style={styles.duaAr}>رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً</Text>
            <Text style={styles.duaTr}>Rabbana atina fid-dunya hasanatan</Text>
            <Text style={styles.duaRu}>Господь наш, даруй нам благо в этом мире</Text>
          </View>
        </LinearGradient>

        {/* Prayer widget */}
        <View style={styles.section}>
          <PrayerWidget />
        </View>

        {/* Progress card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHdr}>
            <Text style={styles.progressTitle}>{progressLabel}</Text>
            <Text style={styles.progressCount}>{completedCount} / {totalSteps}</Text>
          </View>
          <View style={styles.progressBars}>
            {Array.from({ length: totalSteps }).map((_, i) => {
              const done = isHajj ? hajjCompleted.includes(i + 1) : umrahCompleted.includes(i + 1);
              const isNext = !done && i === completedCount;
              return (
                <View
                  key={i}
                  style={[
                    styles.pb,
                    done && styles.pbDone,
                    isNext && !done && styles.pbActive,
                  ]}
                />
              );
            })}
          </View>
          <View style={styles.progressLbls}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <Text key={i} style={styles.progressStepLbl}>
                {isHajj ? HAJJ_STEPS[i]?.name?.slice(0, 5) : UMRAH_STEPS[i]?.name?.slice(0, 5)}
              </Text>
            ))}
          </View>
        </View>

        {/* Section label */}
        <View style={styles.sectionHdr}>
          <Text style={styles.sectionHdrT}>РАЗДЕЛЫ</Text>
        </View>

        {/* Cards grid */}
        <View style={styles.grid}>
          {TILES.map((tile) => (
            <TouchableOpacity
              key={tile.label}
              style={styles.cardWrap}
              onPress={() => router.push(tile.href as Parameters<typeof router.push>[0])}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={tile.grad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                {tile.badge && <View style={styles.badge}><Text style={styles.badgeText}>{tile.badge}</Text></View>}
                <Ionicons name={tile.icon} size={30} color={WHITE} style={styles.cardIcon} />
                <Text style={styles.cardName}>{tile.label}</Text>
                <Text style={styles.cardSub}>{tile.sub}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* SOS wide card */}
        <TouchableOpacity
          style={styles.sosCard}
          onPress={() => router.push('/sos')}
          activeOpacity={0.8}
        >
          <View style={styles.sosIconWrap}>
            <Ionicons name="warning-outline" size={26} color="#e53e3e" />
          </View>
          <View style={styles.sosText}>
            <Text style={styles.sosTitle}>Экстренная помощь</Text>
            <Text style={styles.sosSub}>Номера КСА, посольства, арабские фразы</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#7D6B5A" />
        </TouchableOpacity>

        {/* Quick duas */}
        <View style={styles.sectionHdr}>
          <Text style={styles.sectionHdrT}>БЫСТРЫЕ ДУА</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/dua')}>
            <Text style={styles.sectionMore}>Все →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
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

        <View style={{ height: spacing['4xl'] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF8F3' },

  // Hero
  hero: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
  },
  salam: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 20,
    color: GOLD70,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 6,
  },
  heroTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 30,
    color: WHITE,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  heroSub: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: WHITE50,
    marginBottom: 16,
  },
  duaCard: {
    backgroundColor: DUA_BG,
    borderWidth: 1,
    borderColor: DUA_BORDER,
    borderLeftWidth: 3,
    borderLeftColor: GOLD,
    borderRadius: 18,
    padding: 16,
  },
  duaLabel: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: GOLD,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  duaAr: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 20,
    color: WHITE,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 36,
    marginBottom: 6,
  },
  duaTr: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 4,
  },
  duaRu: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.85)',
  },

  // Prayer widget
  section: { paddingHorizontal: 16, paddingTop: 18 },

  // Progress
  progressCard: {
    marginHorizontal: 16,
    marginTop: 18,
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  progressHdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    color: '#2C1810',
    letterSpacing: -0.2,
  },
  progressCount: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: '#7D6B5A',
  },
  progressBars: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  pb: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(44,24,16,0.09)',
  },
  pbDone: { backgroundColor: GOLD },
  pbActive: { backgroundColor: '#F4A261' },
  progressLbls: { flexDirection: 'row', justifyContent: 'space-between' },
  progressStepLbl: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 10,
    color: '#7D6B5A',
    textAlign: 'center',
  },

  // Section header
  sectionHdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 8,
  },
  sectionHdrT: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: '#7D6B5A',
    letterSpacing: 1.4,
  },
  sectionMore: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: GOLD,
  },

  // Cards grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  cardWrap: {
    width: '47%',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    minHeight: 120,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: WHITE,
  },
  cardIcon: { marginBottom: 10 },
  cardName: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: WHITE,
    marginBottom: 3,
  },
  cardSub: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: WHITE50,
  },

  // SOS card
  sosCard: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#FFF5F5',
    borderWidth: 1.5,
    borderColor: 'rgba(201,168,76,0.12)',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sosIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(229,62,62,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosText: { flex: 1 },
  sosTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.base,
    color: '#2C1810',
    marginBottom: 3,
  },
  sosSub: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: '#7D6B5A',
  },

  // Dua chips
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    backgroundColor: WHITE,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F5EFE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  chipText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: '#7D6B5A',
  },
});
