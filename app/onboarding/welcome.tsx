import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBlock}>
          <Text style={styles.logoText}>BAKKA</Text>
          <Text style={styles.logoArabic}>بكة</Text>
          <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>Ваш проводник к священному</Text>
          <Text style={styles.subtitle}>
            Гид по обрядам, дуа, AI-помощник и SOS — всё работает офлайн
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Начать"
          onPress={() => router.push('/onboarding/trip-type')}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  logoBlock: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  logoText: {
    fontFamily: fonts.extraBold,
    fontSize: 48,
    color: colors.primary,
    letterSpacing: 4,
  },
  logoArabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 32,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  bismillah: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 22,
    color: colors.accent,
    textAlign: 'center',
    marginTop: spacing.lg,
    writingDirection: 'rtl',
  },
  textBlock: {
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['2xl'],
  },
  btn: {
    width: '100%',
  },
});
