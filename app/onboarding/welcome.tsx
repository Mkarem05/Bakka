import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const GOLD = '#C9A030';
const WHITE = '#FFFFFF';
const WHITE55 = 'rgba(255,255,255,0.55)';
const WHITE60 = 'rgba(255,255,255,0.6)';
const WHITE85 = 'rgba(255,255,255,0.85)';
const GLASS_BG = 'rgba(255,255,255,0.1)';
const GLASS_BORDER = 'rgba(255,255,255,0.18)';
const ICON_BG = 'rgba(255,255,255,0.15)';

const GRADIENT_COLORS: [string, string, string] = ['#1A3A2A', '#1A6B4A', '#1A2E22'];
const GRADIENT_LOCATIONS: [number, number, number] = [0, 0.5, 1];

// ─── Slide 1 ─────────────────────────────────────────────────────────────────

function Slide1() {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 1750, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1750, useNativeDriver: true }),
      ])
    ).start();
  }, [floatAnim]);

  return (
    <View style={s1.container}>
      {/* Background Arabic text */}
      <Text style={s1.bgArabic} pointerEvents="none">
        {'بَكَّةَ مُبَارَكًا'}
      </Text>

      {/* Floating logo */}
      <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
        <Image
          source={require('../../assets/icon.png')}
          style={s1.logo}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Bismillah */}
      <Text style={s1.bismillah}>{'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم'}</Text>

      {/* Tag line */}
      <Text style={s1.tag}>{'Гид паломника'.toUpperCase()}</Text>
    </View>
  );
}

const s1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgArabic: {
    position: 'absolute',
    fontFamily: 'Amiri_400Regular',
    fontSize: 72,
    color: 'rgba(26,107,74,0.06)',
    textAlign: 'center',
    zIndex: 0,
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 16,
    zIndex: 1,
  },
  bismillah: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 28,
    color: WHITE85,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 0,
    writingDirection: 'rtl',
    zIndex: 1,
  },
  tag: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 12,
    color: WHITE60,
    letterSpacing: 2,
    marginTop: 8,
    zIndex: 1,
  },
});

// ─── Slide 2 ─────────────────────────────────────────────────────────────────

const SLIDE2_CARDS = [
  {
    emoji: '📿',
    title: '100+ дуа с арабским',
    sub: 'Транслитерация и перевод',
  },
  {
    emoji: '🕋',
    title: 'Все обряды пошагово',
    sub: 'Умра и Хадж с дуа',
  },
  {
    emoji: '🆘',
    title: 'SOS и экстренные номера',
    sub: 'Протокол «потерялся» одним касанием',
  },
];

function Slide2() {
  return (
    <View style={s2.container}>
      <Text style={s2.robotEmoji}>{'🤖'}</Text>
      <Text style={s2.title}>{'AI знает ответ\nна любой вопрос'}</Text>
      <Text style={s2.sub}>{'Спросите на русском — отвечу сразу'}</Text>
      <View style={s2.cards}>
        {SLIDE2_CARDS.map((card, i) => (
          <View key={i} style={s2.card}>
            <View style={s2.iconBox}>
              <Text style={s2.cardEmoji}>{card.emoji}</Text>
            </View>
            <View style={s2.cardText}>
              <Text style={s2.cardTitle}>{card.title}</Text>
              <Text style={s2.cardSub}>{card.sub}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const s2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 56,
    paddingHorizontal: 24,
  },
  robotEmoji: {
    fontSize: 44,
    marginBottom: 14,
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 30,
    color: WHITE,
    lineHeight: 36,
    marginBottom: 8,
  },
  sub: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 15,
    color: WHITE55,
  },
  cards: {
    width: '100%',
    marginTop: 16,
    gap: 10,
  },
  card: {
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 16,
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBox: {
    width: 46,
    height: 46,
    minWidth: 46,
    backgroundColor: ICON_BG,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: {
    fontSize: 22,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 15,
    color: WHITE,
    marginBottom: 2,
  },
  cardSub: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 13,
    color: WHITE60,
  },
});

// ─── Slide 3 ─────────────────────────────────────────────────────────────────

const GRID_CELLS = [
  { emoji: '🕋', value: '4', label: 'шага Умры' },
  { emoji: '🌙', value: '7', label: 'шагов Хаджа' },
  { emoji: '📿', value: '100+', label: 'дуа в базе' },
  { emoji: '🤖', value: '24/7', label: 'AI помощник' },
];

function Slide3() {
  return (
    <View style={s3.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={s3.logo}
        resizeMode="cover"
      />
      <Text style={s3.title}>{'Всё для вашего\nпаломничества'}</Text>
      <Text style={s3.sub}>{'Бесплатно · На русском · Всегда рядом'}</Text>
      <View style={s3.grid}>
        {GRID_CELLS.map((cell, i) => (
          <View key={i} style={s3.cell}>
            <Text style={s3.cellEmoji}>{cell.emoji}</Text>
            <Text style={s3.cellValue}>{cell.value}</Text>
            <Text style={s3.cellLabel}>{cell.label.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s3 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 28,
    color: WHITE,
    textAlign: 'center',
    lineHeight: 34,
    marginTop: 16,
    marginBottom: 10,
  },
  sub: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 15,
    color: WHITE55,
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: 300,
    maxWidth: 300,
  },
  cell: {
    flex: 1,
    minWidth: 130,
    backgroundColor: 'rgba(44,24,16,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(26,107,74,0.3)',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  cellEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  cellValue: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 48,
    color: GOLD,
    lineHeight: 52,
  },
  cellLabel: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 11,
    color: '#7D6B5A',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 2,
  },
});

// ─── Main component ───────────────────────────────────────────────────────────

const TOTAL_SLIDES = 3;

export default function WelcomeScreen() {
  const router = useRouter();
  const [slide, setSlide] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const goToSlide = (next: number) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      setSlide(next);
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    });
  };

  const handleNext = () => {
    if (slide < TOTAL_SLIDES) {
      goToSlide(slide + 1);
    } else {
      router.push('/onboarding/trip-type');
    }
  };

  const handleSkip = () => {
    router.push('/onboarding/trip-type');
  };

  const isLast = slide === TOTAL_SLIDES;

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      locations={GRADIENT_LOCATIONS}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Slide area */}
        <Animated.View style={[styles.slideArea, { opacity: fadeAnim }]}>
          {slide === 1 && <Slide1 />}
          {slide === 2 && <Slide2 />}
          {slide === 3 && <Slide3 />}
        </Animated.View>

        {/* Bottom panel */}
        <View style={styles.bottomPanel}>
          {/* Title + sub text for slide 1 */}
          {slide === 1 && (
            <View style={styles.textBlock}>
              <Text style={styles.panelTitle}>{'Ваш проводник\nк Каабе'}</Text>
              <Text style={styles.panelSub}>
                {'Умра и Хадж пошагово · дуа на арабском\nAI-помощник 24/7'}
              </Text>
            </View>
          )}

          {/* Dots */}
          <View style={styles.dotsRow}>
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => goToSlide(i + 1)}
                hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.dot,
                    i + 1 === slide ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Navigation row */}
          <View style={[styles.navRow, isLast && styles.navRowFull]}>
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
              <Text style={styles.nextText}>
                {isLast ? 'Начать 🕋' : 'Далее →'}
              </Text>
            </TouchableOpacity>
          </View>
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
  slideArea: {
    flex: 1,
  },

  // Bottom panel
  bottomPanel: {
    backgroundColor: 'rgba(20,40,28,0.75)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 24,
    paddingBottom: 44,
    paddingTop: 20,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 22,
  },
  panelTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 28,
    color: WHITE,
    lineHeight: 34,
    textAlign: 'center',
    marginBottom: 10,
  },
  panelSub: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 15,
    color: WHITE55,
    lineHeight: 26,
    textAlign: 'center',
  },

  // Dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginBottom: 20,
  },
  dot: {
    height: 3,
    borderRadius: 2,
  },
  dotActive: {
    width: 24,
    backgroundColor: GOLD,
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(44,24,16,0.09)',
  },

  // Navigation row
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navRowFull: {
    justifyContent: 'center',
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  skipText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 15,
    color: WHITE60,
  },
  nextButton: {
    backgroundColor: GOLD,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 32,
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(26,107,74,0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  nextButtonFull: {
    width: '100%',
    paddingHorizontal: 0,
  },
  nextText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: WHITE,
  },
});
