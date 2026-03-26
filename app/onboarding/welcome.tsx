import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontSize } from '../../src/theme/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GOLD = '#C9A030';
const WHITE = '#FFFFFF';
const WHITE60 = 'rgba(255,255,255,0.6)';
const WHITE30 = 'rgba(255,255,255,0.3)';
const GLASS_BG = 'rgba(255,255,255,0.08)';
const GLASS_BORDER = 'rgba(255,255,255,0.15)';

const GRADIENT_COLORS: [string, string, string] = ['#0E3D28', '#1A6B4A', '#0E3020'];
const GRADIENT_LOCATIONS: [number, number, number] = [0, 0.5, 1];

interface FeatureCard {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  subtitle: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: 'book-outline',
    iconColor: GOLD,
    title: 'Пошаговый гид',
    subtitle: '4 шага Умры и 7 шагов Хаджа с дуа',
  },
  {
    icon: 'sparkles-outline',
    iconColor: GOLD,
    title: 'AI Помощник',
    subtitle: 'Ответы на любые вопросы об обрядах',
  },
  {
    icon: 'warning-outline',
    iconColor: '#e53e3e',
    title: 'SOS Помощь',
    subtitle: 'Экстренные контакты и арабские фразы',
  },
];

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: '4 шага', label: 'Умра' },
  { value: '7 шагов', label: 'Хадж' },
  { value: '100+', label: 'Дуа' },
];

function Slide1() {
  return (
    <View style={styles.slideContent}>
      <View style={styles.logoCircle}>
        <Text style={styles.kaabaEmoji}>🕋</Text>
      </View>
      <Text style={styles.arabicTitle}>بكة</Text>
      <Text style={styles.appTitle}>BAKKA</Text>
      <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</Text>
      <Text style={styles.slideSubtitle}>Ваш проводник к священному</Text>
      <Text style={styles.slideSubSubtitle}>Гид по обрядам, дуа, AI-помощник</Text>
    </View>
  );
}

function Slide2() {
  return (
    <View style={styles.slideContent}>
      <Text style={styles.featuresTitle}>Всё что нужно{'\n'}для паломничества</Text>
      <View style={styles.featureCards}>
        {FEATURES.map((f, i) => (
          <View key={i} style={styles.featureCard}>
            <Ionicons name={f.icon} size={28} color={f.iconColor} />
            <View style={styles.featureCardText}>
              <Text style={styles.featureCardTitle}>{f.title}</Text>
              <Text style={styles.featureCardSubtitle}>{f.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function Slide3() {
  return (
    <View style={styles.slideContent}>
      <Ionicons name="checkmark-circle" size={80} color={GOLD} />
      <Text style={styles.readyTitle}>Готовы начать?</Text>
      <Text style={styles.readySubtitle}>
        Выберите тип поездки и мы подготовим{'\n'}ваш персональный гид
      </Text>
      <View style={styles.statsRow}>
        {STATS.map((s, i) => (
          <View key={i} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const SLIDES = [Slide1, Slide2, Slide3];
const TOTAL = SLIDES.length;

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateToSlide = (nextIndex: number) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
    setCurrentSlide(nextIndex);
  };

  const handleNext = () => {
    if (currentSlide < TOTAL - 1) {
      animateToSlide(currentSlide + 1);
    } else {
      router.push('/onboarding/trip-type');
    }
  };

  const handleSkip = () => {
    router.push('/onboarding/trip-type');
  };

  const SlideComponent = SLIDES[currentSlide];
  const isLast = currentSlide === TOTAL - 1;

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      locations={GRADIENT_LOCATIONS}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Star dots decoration */}
        <View style={styles.starsContainer} pointerEvents="none">
          {[...Array(18)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.star,
                {
                  top: `${Math.sin(i * 37.3) * 40 + 45}%` as unknown as number,
                  left: `${Math.cos(i * 23.7) * 40 + 45}%` as unknown as number,
                  opacity: 0.06 + (i % 4) * 0.03,
                  width: 2 + (i % 3),
                  height: 2 + (i % 3),
                },
              ]}
            />
          ))}
        </View>

        {/* Slide area */}
        <Animated.View style={[styles.slideArea, { opacity: fadeAnim }]}>
          <SlideComponent />
        </Animated.View>

        {/* Dots indicator */}
        <View style={styles.dotsRow}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => animateToSlide(i)}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
            >
              <View
                style={[
                  styles.dot,
                  i === currentSlide ? styles.dotActive : styles.dotInactive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom navigation */}
        <View style={[styles.bottomNav, isLast && styles.bottomNavCenter]}>
          {!isLast && (
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton} activeOpacity={0.7}>
              <Text style={styles.skipText}>Пропустить</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.nextButton, isLast && styles.nextButtonFull]}
            activeOpacity={0.85}
          >
            <Text style={styles.nextText}>{isLast ? 'Начать' : 'Далее'}</Text>
            {!isLast && (
              <Ionicons name="arrow-forward" size={18} color={WHITE} style={{ marginLeft: 6 }} />
            )}
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
  starsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    borderRadius: 99,
    backgroundColor: WHITE,
  },
  slideArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  slideContent: {
    width: '100%',
    alignItems: 'center',
  },

  // Slide 1
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  kaabaEmoji: {
    fontSize: 48,
  },
  arabicTitle: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 52,
    color: GOLD,
    marginBottom: 4,
  },
  appTitle: {
    fontFamily: fonts.extraBold,
    fontSize: 36,
    color: WHITE,
    letterSpacing: 6,
    marginBottom: 16,
  },
  bismillah: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 20,
    color: GOLD,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 24,
  },
  slideSubtitle: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: WHITE,
    textAlign: 'center',
    marginBottom: 8,
  },
  slideSubSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: WHITE60,
    textAlign: 'center',
  },

  // Slide 2
  featuresTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: WHITE,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
  },
  featureCards: {
    width: '100%',
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  featureCardText: {
    flex: 1,
  },
  featureCardTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: WHITE,
    marginBottom: 2,
  },
  featureCardSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: WHITE60,
  },

  // Slide 3
  readyTitle: {
    fontFamily: fonts.extraBold,
    fontSize: 28,
    color: WHITE,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  readySubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: WHITE60,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: GOLD,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: WHITE60,
  },

  // Dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 16,
  },
  dot: {
    borderRadius: 99,
    height: 8,
  },
  dotActive: {
    width: 24,
    backgroundColor: GOLD,
  },
  dotInactive: {
    width: 8,
    backgroundColor: WHITE30,
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  bottomNavCenter: {
    justifyContent: 'center',
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  skipText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: WHITE60,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GOLD,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 32,
    minHeight: 54,
  },
  nextButtonFull: {
    flex: 1,
    paddingHorizontal: 0,
  },
  nextText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: WHITE,
  },
});
