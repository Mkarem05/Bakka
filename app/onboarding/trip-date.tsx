import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';
import { useProfileStore, Country } from '../../src/store/profileStore';

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const COUNTRIES: { value: Country; label: string }[] = [
  { value: 'russia', label: 'Россия' },
  { value: 'kazakhstan', label: 'Казахстан' },
  { value: 'uzbekistan', label: 'Узбекистан' },
  { value: 'tajikistan', label: 'Таджикистан' },
  { value: 'kyrgyzstan', label: 'Кыргызстан' },
  { value: 'other', label: 'Другая страна' },
];

const THIS_YEAR = new Date().getFullYear();
const YEARS = [THIS_YEAR, THIS_YEAR + 1, THIS_YEAR + 2];

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Когда ваша поездка?</Text>
        <Text style={styles.subtitle}>Укажите примерные сроки</Text>

        {/* Month selector */}
        <Text style={styles.sectionLabel}>Месяц</Text>
        <View style={styles.monthGrid}>
          {MONTHS.map((m, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.monthBtn, month === i && styles.monthBtnSelected]}
              onPress={() => setMonth(i)}
            >
              <Text style={[styles.monthText, month === i && styles.monthTextSelected]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Year selector */}
        <Text style={styles.sectionLabel}>Год</Text>
        <View style={styles.yearRow}>
          {YEARS.map((y) => (
            <TouchableOpacity
              key={y}
              style={[styles.yearBtn, year === y && styles.yearBtnSelected]}
              onPress={() => setYear(y)}
            >
              <Text style={[styles.yearText, year === y && styles.yearTextSelected]}>
                {y}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Country */}
        <Text style={styles.sectionLabel}>Ваша страна</Text>
        <View style={styles.countryList}>
          {COUNTRIES.map((c) => (
            <TouchableOpacity
              key={c.value}
              style={[styles.countryItem, selectedCountry === c.value && styles.countryItemSelected]}
              onPress={() => setSelectedCountry(c.value)}
              activeOpacity={0.7}
            >
              <Text style={[styles.countryText, selectedCountry === c.value && styles.countryTextSelected]}>
                {c.label}
              </Text>
              {selectedCountry === c.value && (
                <Ionicons name="checkmark" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Готово" onPress={handleDone} style={styles.btn} />
        <Button
          title="Укажу позже"
          onPress={handleSkip}
          variant="ghost"
          style={styles.btn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  content: {
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing['4xl'],
    paddingBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSize['2xl'],
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing['3xl'],
  },
  sectionLabel: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  monthBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 90,
    alignItems: 'center',
  },
  monthBtnSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  monthText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  monthTextSelected: {
    color: colors.white,
  },
  yearRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  yearBtn: {
    flex: 1,
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearBtnSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  yearText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  yearTextSelected: {
    color: colors.primary,
  },
  countryList: {
    gap: spacing.sm,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 52,
  },
  countryItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  countryText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  countryTextSelected: {
    color: colors.primary,
  },
  footer: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['2xl'],
    gap: spacing.sm,
  },
  btn: {
    width: '100%',
  },
});
