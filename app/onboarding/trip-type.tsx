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
import { useProfileStore, TripType } from '../../src/store/profileStore';

const GOLD = '#C9A030';
const WHITE = '#FFFFFF';
const WHITE60 = 'rgba(255,255,255,0.6)';
const GLASS_BG = 'rgba(255,255,255,0.06)';
const GLASS_BORDER = 'rgba(255,255,255,0.15)';
const SELECTED_BG = 'rgba(201,160,48,0.15)';
const BACK_BTN_BG = 'rgba(255,255,255,0.1)';

const GRADIENT_COLORS: [string, string, string] = ['#0E3D28', '#1A6B4A', '#0E3020'];
const GRADIENT_LOCATIONS: [number, number, number] = [0, 0.5, 1];

interface TripOption {
  value: TripType;
  emoji: string;
  title: string;
  subtitle: string;
}

const OPTIONS: TripOption[] = [
  {
    value: 'umrah',
    emoji: '🕋',
    title: 'Умра',
    subtitle: 'Малое паломничество — 4 обряда',
  },
  {
    value: 'hajj',
    emoji: '🌙',
    title: 'Хадж',
    subtitle: 'Великое паломничество — 7 дней',
  },
  {
    value: 'undecided',
    emoji: '🤲',
    title: 'Ещё не решил',
    subtitle: 'Выберу позже',
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

          <Text style={styles.title}>Куда вы{'\n'}направляетесь?</Text>
          <Text style={styles.subtitle}>Выберите тип паломничества</Text>

          <View style={styles.options}>
            {OPTIONS.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.card,
                    isSelected ? styles.cardSelected : styles.cardUnselected,
                  ]}
                  onPress={() => setSelected(opt.value)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.cardEmoji}>{opt.emoji}</Text>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{opt.title}</Text>
                    <Text style={styles.cardSubtitle}>{opt.subtitle}</Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color={GOLD} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
            onPress={handleNext}
            activeOpacity={selected ? 0.85 : 1}
          >
            <Text style={[styles.nextText, !selected && styles.nextTextDisabled]}>
              Далее
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={selected ? WHITE : 'rgba(255,255,255,0.4)'}
              style={{ marginLeft: 6 }}
            />
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
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: WHITE60,
    marginBottom: 32,
  },
  options: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    minHeight: 80,
  },
  cardUnselected: {
    backgroundColor: GLASS_BG,
    borderColor: GLASS_BORDER,
  },
  cardSelected: {
    backgroundColor: SELECTED_BG,
    borderColor: GOLD,
  },
  cardEmoji: {
    fontSize: 32,
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: WHITE,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: WHITE60,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GOLD,
    borderRadius: 50,
    minHeight: 54,
    paddingVertical: 15,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(201,160,48,0.35)',
  },
  nextText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: WHITE,
  },
  nextTextDisabled: {
    color: 'rgba(255,255,255,0.5)',
  },
});
