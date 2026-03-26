import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontSize } from '../../src/theme/typography';
import { useProfileStore, Country } from '../../src/store/profileStore';

const GOLD = '#C9A030';
const WHITE = '#FFFFFF';
const WHITE60 = 'rgba(255,255,255,0.6)';
const GLASS_BG = 'rgba(255,255,255,0.08)';
const GLASS_BORDER = 'rgba(255,255,255,0.15)';
const BACK_BTN_BG = 'rgba(255,255,255,0.1)';

const GRADIENT_COLORS: [string, string, string] = ['#1A3A2A', '#1A6B4A', '#1A2E22'];
const GRADIENT_LOCATIONS: [number, number, number] = [0, 0.5, 1];

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const COUNTRIES: { value: Country; label: string; flag: string }[] = [
  { value: 'russia', label: 'Россия', flag: '🇷🇺' },
  { value: 'kazakhstan', label: 'Казахстан', flag: '🇰🇿' },
  { value: 'uzbekistan', label: 'Узбекистан', flag: '🇺🇿' },
  { value: 'tajikistan', label: 'Таджикистан', flag: '🇹🇯' },
  { value: 'kyrgyzstan', label: 'Кыргызстан', flag: '🇰🇬' },
  { value: 'other', label: 'Другая', flag: '🌍' },
];

const THIS_YEAR = new Date().getFullYear();

export default function TripDateScreen() {
  const router = useRouter();
  const { setTripDate, setCountry, setOnboardingComplete } = useProfileStore();

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(THIS_YEAR);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleDone = () => {
    const date = new Date(year, month, 1).toISOString();
    setTripDate(date);
    if (selectedCountry) setCountry(selectedCountry);
    setOnboardingComplete(true);
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    setOnboardingComplete(true);
    router.replace('/(tabs)');
  };

  const decrementYear = () => {
    if (year > THIS_YEAR) setYear(year - 1);
  };

  const incrementYear = () => {
    if (year < THIS_YEAR + 3) setYear(year + 1);
  };

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      locations={GRADIENT_LOCATIONS}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={WHITE} />
          </TouchableOpacity>

          <Text style={styles.title}>Когда ваша поездка?</Text>
          <Text style={styles.subtitle}>Укажите примерные сроки</Text>

          {/* Month selector */}
          <Text style={styles.sectionLabel}>Месяц</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
          >
            {MONTHS.map((m, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.chip, month === i && styles.chipSelected]}
                onPress={() => setMonth(i)}
                activeOpacity={0.75}
              >
                <Text style={[styles.chipText, month === i && styles.chipTextSelected]}>
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Year selector */}
          <Text style={styles.sectionLabel}>Год</Text>
          <View style={styles.yearRow}>
            <TouchableOpacity
              style={[styles.yearArrow, year <= THIS_YEAR && styles.yearArrowDisabled]}
              onPress={decrementYear}
              activeOpacity={0.7}
            >
              <Ionicons
                name="remove"
                size={22}
                color={year <= THIS_YEAR ? 'rgba(255,255,255,0.25)' : WHITE}
              />
            </TouchableOpacity>
            <View style={styles.yearDisplay}>
              <Text style={styles.yearText}>{year}</Text>
            </View>
            <TouchableOpacity
              style={[styles.yearArrow, year >= THIS_YEAR + 3 && styles.yearArrowDisabled]}
              onPress={incrementYear}
              activeOpacity={0.7}
            >
              <Ionicons
                name="add"
                size={22}
                color={year >= THIS_YEAR + 3 ? 'rgba(255,255,255,0.25)' : WHITE}
              />
            </TouchableOpacity>
          </View>

          {/* Country selector */}
          <Text style={styles.sectionLabel}>Ваша страна</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
          >
            {COUNTRIES.map((c) => (
              <TouchableOpacity
                key={c.value}
                style={[styles.chip, selectedCountry === c.value && styles.chipSelected]}
                onPress={() => setSelectedCountry(c.value)}
                activeOpacity={0.75}
              >
                <Text style={styles.chipFlag}>{c.flag}</Text>
                <Text style={[styles.chipText, selectedCountry === c.value && styles.chipTextSelected]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>

        {/* Footer buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Пропустить</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            activeOpacity={0.85}
          >
            <Text style={styles.doneText}>Готово</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BACK_BTN_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: fonts.extraBold,
    fontSize: 26,
    color: WHITE,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: WHITE60,
    marginBottom: 28,
  },
  sectionLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: WHITE60,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 20,
  },

  // Chips (months + countries)
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 24,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 50,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    gap: 5,
  },
  chipSelected: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: WHITE,
  },
  chipTextSelected: {
    color: WHITE,
    fontFamily: fonts.semiBold,
  },
  chipFlag: {
    fontSize: 14,
  },

  // Year selector
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  yearArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearArrowDisabled: {
    opacity: 0.4,
  },
  yearDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 14,
    height: 54,
  },
  yearText: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: WHITE,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    minHeight: 54,
    justifyContent: 'center',
  },
  skipText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: WHITE60,
  },
  doneButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GOLD,
    borderRadius: 50,
    minHeight: 54,
    paddingVertical: 15,
  },
  doneText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: WHITE,
  },
});
