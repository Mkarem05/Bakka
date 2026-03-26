import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';
import { useProfileStore, TripType } from '../../src/store/profileStore';

interface TripOption {
  value: TripType;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

const OPTIONS: TripOption[] = [
  {
    value: 'umrah',
    icon: 'home-outline',
    title: 'Умра',
    subtitle: 'Малое паломничество',
  },
  {
    value: 'hajj',
    icon: 'moon-outline',
    title: 'Хадж',
    subtitle: 'Великое паломничество',
  },
  {
    value: 'undecided',
    icon: 'help-circle-outline',
    title: 'Ещё не решил',
    subtitle: 'Можно изменить позже',
  },
];

export default function TripTypeScreen() {
  const router = useRouter();
  const { setTripType } = useProfileStore();
  const [selected, setSelected] = useState<TripType | null>(null);

  const handleNext = () => {
    if (!selected) return;
    setTripType(selected);
    router.push('/onboarding/trip-date');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Куда вы направляетесь?</Text>
        <Text style={styles.subtitle}>Выберите тип паломничества</Text>

        <View style={styles.options}>
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelected(opt.value)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
                  <Ionicons
                    name={opt.icon}
                    size={28}
                    color={isSelected ? colors.white : colors.primary}
                  />
                </View>
                <View style={styles.cardText}>
                  <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                    {opt.title}
                  </Text>
                  <Text style={styles.cardSubtitle}>{opt.subtitle}</Text>
                </View>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Далее"
          onPress={handleNext}
          disabled={!selected}
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
  options: {
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  iconWrapSelected: {
    backgroundColor: colors.primary,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  cardTitleSelected: {
    color: colors.primary,
  },
  cardSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['2xl'],
  },
  btn: {
    width: '100%',
  },
});
